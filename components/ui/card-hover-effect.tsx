'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Dialog } from '@/components/ui/dialog';

import { Button } from './button';
import { Settings2 } from 'lucide-react';
import { deleteFlashCard } from '@/app/content/actions';
import FlashCardEditForm from '../content/flash-card-edit-form';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    word: string;
    translation: string;
    phonetic: string;
    audio: string;
    partOfSpeech: string;
    definition: string;
    picture: string;
    id: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<
    number | null
  >(null);

  return (
    <div
      className={cn(
        'grid place-items-center sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {items.map((item, idx) => {
        return (
          <div
            key={item?.word}
            className='group relative block h-full w-full p-2'
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className='absolute inset-0 block h-full w-full rounded-3xl bg-sky-500/60  dark:bg-blue-400/[0.8]'
                  layoutId='hoverBackground'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.15,
                      delay: 0.2,
                    },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <div className='absolute right-5 top-5 z-50'>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type='button'
                        className='flex h-6 w-6 items-center justify-center rounded-full border bg-white'
                      >
                        <Settings2 size={15} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align='end'
                      className='flex gap-2 p-2'
                    >
                      <FlashCardEditForm item={item} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant='ghost'>
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                              This will permanently delete
                              flash card from your
                              collection.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteFlashCard(item.id)
                              }
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <DropdownMenuItem asChild>
                        <Button variant='ghost'>
                          <Link
                            rel='noreferrer'
                            target='_blank'
                            href={`https://dictionary.cambridge.org/dictionary/english/${item.word}`}
                          >
                            Cambridge
                          </Link>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Button variant='ghost'>
                          <Link
                            rel='noreferrer'
                            target='_blank'
                            href={`https://www.google.com.ua/search?q=${item.word}`}
                          >
                            Google
                          </Link>
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Dialog>
              </div>
              <Image
                alt={item.word}
                src={item.picture}
                loading='lazy'
                width={500}
                height={500}
                className='aspect-video rounded-2xl object-cover'
              />
              <p className='mt-1 text-center text-xl font-bold tracking-wide text-gray-700 underline'>
                {item.word}
              </p>
              <p className='text-center text-xs font-bold tracking-wide text-gray-500'>
                {item.partOfSpeech}
              </p>
              <p className='text-center text-xs font-bold tracking-wide text-gray-500'>
                {item.phonetic}
              </p>
              <p className='mt-1 border-b-2 border-t-2 border-gray-400 text-center text-xl font-bold tracking-wide text-gray-700'>
                {item.translation}
              </p>
              <p className='mt-2 text-center text-sm tracking-wide text-gray-500'>
                {item.definition}
              </p>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'relative z-20 h-full w-full overflow-hidden rounded-2xl border-4 border-transparent bg-sky-200 group-hover:border-cyan-400 dark:border-white/[0.2] dark:group-hover:border-blue-100',
        className
      )}
    >
      <div className='relative z-50'>
        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};
