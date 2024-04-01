import React from 'react';
import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';
import { deleteFlashCard, readFlashCard, updateFlashCard } from './actions';

import ContentForm from '@/components/content/flash-card-form';
import { Button } from '@/components/ui/button';
import { HoverEffect } from '@/components/ui/card-hover-effect';

const Content = async () => {
  const { data: userSession } = await readUserSession();
  if (!userSession.session) {
    return redirect('/auth/login');
  }

  const { data: flashCards } = await readFlashCard();

  const projects = [
    {
      title: 'Stripe',
      description: 'A technology company that builds economic infrastructure for the internet.',
      link: 'https://stripe.com',
    },
    {
      title: 'Netflix',
      description:
        'A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
      link: 'https://netflix.com',
    },
    {
      title: 'Google',
      description:
        'A multinational technology company that specializes in Internet-related services and products.',
      link: 'https://google.com',
    },
    {
      title: 'Meta',
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: 'https://meta.com',
    },
    {
      title: 'Amazon',
      description:
        'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
      link: 'https://amazon.com',
    },
    {
      title: 'Microsoft',
      description:
        'A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
      link: 'https://microsoft.com',
    },
  ];

  return (
    <section className='mx-auto max-w-7xl p-8'>
      <div className='flex'>
        <ContentForm />
      </div>
      <HoverEffect items={projects} className='mt-4' />
      {/* {flashCards?.map((flashCard, index) => {
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
      })} */}
    </section>
  );
};

export default Content;
