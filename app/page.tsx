import HomePageNav from '@/components/home/home-page-nav';
import NavMobile from '@/components/home/nav-mobile';
import readUserSession from '@/lib/supabase/actions';
import { redirect } from 'next/navigation';
import { Logout } from './auth/actions';
import { MaxWidthWrapper } from '@/components/ui/max-with-wrapper';

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
          <div className='mt-24 flex flex-col items-center justify-center p-2'>
            <p className='translate-y-2 bg-gradient-to-r from-sky-900 to-cyan-400 bg-clip-text text-5xl font-extrabold text-transparent'>
              Paw
            </p>
            <p className='bg-gradient-to-r from-cyan-500 to-sky-700 bg-clip-text py-2 text-5xl font-extrabold text-transparent'>
              Fluency
            </p>
            <p className='-translate-y-2 bg-gradient-to-r from-sky-600  to-sky-500 bg-clip-text text-3xl font-extrabold text-transparent'>
              cards
            </p>
            <p className='-translate-y-4 bg-gradient-to-r from-sky-600  to-sky-500 bg-clip-text text-xs text-transparent'>
              education
            </p>
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
