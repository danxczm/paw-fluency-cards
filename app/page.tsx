import HomePageNav from '@/components/home/home-page-nav';
import NavMobile from '@/components/home/nav-mobile';
import readUserSession from '@/lib/supabase/actions';
import { redirect } from 'next/navigation';
import { Logout } from './auth/actions';
import { MaxWidthWrapper } from '@/components/ui/max-with-wrapper';

import { PawPrint } from 'lucide-react';

export default async function Home() {
  const { data: userSession } = await readUserSession();

  const logOutUser = async () => {
    'use server';
    await Logout();
    redirect('/');
  };

  return (
    <main>
      <HomePageNav
        userSession={userSession}
        logout={logOutUser}
      />
      <NavMobile userSession={userSession} />
      <MaxWidthWrapper>
        <section className='h-screen'>
          <div className='mt-24 flex flex-col items-center justify-center p-2 text-[#184363] '>
            <PawPrint
              className='h-12 w-12 translate-y-6'
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
            <p className='translate-y-2 text-6xl font-extrabold'>
              Paw
            </p>
            <p className=' py-2 text-6xl font-extrabold'>
              Fluency
            </p>
            <p className='-translate-y-2 text-3xl font-extrabold'>
              cards
            </p>
            <p className='-translate-y-4  bg-clip-text text-xs'>
              education
            </p>
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
