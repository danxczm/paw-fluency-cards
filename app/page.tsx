import HomePageNav from '@/components/home/home-page-nav';
import NavMobile from '@/components/home/nav-mobile';
import readUserSession from '@/lib/supabase/actions';
import { redirect } from 'next/navigation';
import { Logout } from './auth/actions';

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
      <h1>This is where we start...</h1>
    </main>
  );
}
