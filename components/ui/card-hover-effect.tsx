'use client';

import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'grid place-items-center rounded-3xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`https://dictionary.cambridge.org/dictionary/english/${item.word}`}
          key={item?.word}
          rel='noreferrer'
          target='_blank'
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
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <Image
              alt={item.word}
              src={item.picture}
              loading='lazy'
              width={500}
              height={500}
              className='aspect-video rounded-2xl object-cover'
            />
            <p className='text-center text-xl font-bold tracking-wide text-gray-700 underline'>
              {item.word}
            </p>
            <p className='text-center text-xs font-bold tracking-wide text-gray-500'>
              {item.partOfSpeech}
            </p>
            <p className='text-center text-xs font-bold tracking-wide text-gray-500'>
              {item.phonetic}
            </p>
            <p className='mt-2 text-center text-xl font-bold tracking-wide text-gray-700'>
              {item.translation}
            </p>
            <p className='mt-2 text-center text-xs tracking-wide text-gray-500'>
              {item.definition}
            </p>
          </Card>
        </Link>
      ))}
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
