import React from 'react';
import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';
import { readFlashCard } from './actions';

import ContentForm from '@/components/content/flash-card-form';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import DeleteButton from '@/components/ui/delete-button';

const Content = async () => {
  const { data, error } = await readUserSession();

  if (error || !data?.user) redirect('/auth/login');

  const { data: flashCards }: any = await readFlashCard();

  return (
    <section className='mx-auto max-w-7xl p-8'>
      <div className='flex space-x-4'>
        <ContentForm />
        <DeleteButton items={flashCards} />
      </div>
      <HoverEffect items={flashCards} className='mt-4' />
    </section>
  );
};

export default Content;
