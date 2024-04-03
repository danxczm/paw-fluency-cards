import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
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
  //   const { word, translation, phonetic, audio, partOfSpeech, definition, picture, id } = item;
  const [formData, setFormData] = React.useState(item);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <DialogContent className='sm:max-w-[425px]'>
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
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
};

export default FlashCardEditForm;
