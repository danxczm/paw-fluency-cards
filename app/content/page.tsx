import readUserSession from '@/lib/supabase/actions';
import { redirect } from 'next/navigation';
import React from 'react';

const Content = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    return redirect('/auth/login');
  }
  return (
    <section>
      <h1>User data</h1>
    </section>
  );
};

export default Content;
