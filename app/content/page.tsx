import React from 'react';
import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';
import { deleteFlashCard, readFlashCard, updateFlashCard } from './actions';

import ContentForm from '@/components/content/flash-card-form';
import { Button } from '@/components/ui/button';

const Content = async () => {
  const { data: userSession } = await readUserSession();
  if (!userSession.session) {
    return redirect('/auth/login');
  }

  const { data: flashCards } = await readFlashCard();

  return (
    <section className='w-full'>
      <div className='mt-12'>
        <ContentForm />
        {flashCards?.map((flashCard, index) => {
          const deleteFlashCardById = deleteFlashCard.bind(null, flashCard.id);
          const updateFlashCardById = updateFlashCard.bind(null, flashCard.id, 'new string');
          return (
            <div key={index} className='flex items-center justify-center gap-6'>
              <h1>{flashCard.word}</h1>

              <form action={deleteFlashCardById}>
                <Button>delete</Button>
              </form>
              <form action={updateFlashCardById}>
                <Button>update</Button>
              </form>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Content;
