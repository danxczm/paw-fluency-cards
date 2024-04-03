import React from 'react';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { updateFlashCard } from '@/app/content/actions';

type FlashCardEditFormProps = {
  item: {
    word: string;
    translation: string;
    phonetic: string;
    audio: string;
    partOfSpeech: string;
    definition: string;
    picture: string;
    id: string;
  };
};

const FlashCardEditForm = ({ item }: { item: FlashCardEditFormProps['item'] }) => {
  const [formData, setFormData] = React.useState(item);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateFlashCard(formData.id, formData);
    } catch (error) {
      console.error('handleSubmit', error);
    }
  };

  return (
    <>
      <DialogTrigger asChild>
        <Button variant='ghost'>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Edit flashcard</DialogTitle>
          <DialogDescription>Make changes and click save when you`re done.</DialogDescription>
        </DialogHeader>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='word' className='text-right'>
              Word
            </Label>
            <Input
              name='word'
              value={formData.word}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='translation' className='text-right'>
              Translation
            </Label>
            <Input
              name='translation'
              value={formData.translation}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='partOfSpeech' className='text-right'>
              Part of speech
            </Label>
            <Input
              name='partOfSpeech'
              value={formData.partOfSpeech}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='partOfSpeech' className='text-right'>
              Phonetic
            </Label>
            <Input
              name='phonetic'
              value={formData.phonetic}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='partOfSpeech' className='text-right'>
              Definition
            </Label>
            <Textarea
              name='definition'
              value={formData.definition}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='partOfSpeech' className='text-right'>
              Picture
              <p className='mt-1 text-[10px] text-muted-foreground'>Paste image url here.</p>
            </Label>
            <Input
              name='picture'
              value={formData.picture}
              onChange={handleInputChange}
              className='col-span-3'
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='destructive'>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type='submit'>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
};

export default FlashCardEditForm;
