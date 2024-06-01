'use client';

import React from 'react';
import { Button } from './button';
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
} from './alert-dialog';
import { Trash2 } from 'lucide-react';
import { deleteAllFlashCards } from '@/app/content/actions';

type Item = {
  word: string;
  translation: string;
  phonetic: string;
  audio: string;
  partOfSpeech: string;
  definition: string;
  picture: string;
  id: string;
};

type ItemsProps = { items: Item[] };

const DeleteButton: React.FC<ItemsProps> = ({ items }) => {
  const allItemsIdsToDelete: string[] = items.map(
    item => item.id
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='w-12'>
          <Trash2 size={17} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will
            permanently delete all your flash cards on this
            screen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteAllFlashCards(allItemsIdsToDelete)
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
