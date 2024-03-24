import Link from 'next/link';

import readUserSession from '@/lib/supabase/actions';

import { Button, buttonVariants } from '@/components/ui/button';
import createSupabaseServerClient from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const Navbar = async () => {
  const { data } = await readUserSession();

  const logOut = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();

    redirect('/');
  };

  return (
    <header>
      <nav className='border-gray-200 bg-white px-4 py-4'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between'>
          <div className='ml-auto flex items-center'>
            {data.session ? (
              <form action={logOut}>
                <Button variant='outline'>Log out</Button>
              </form>
            ) : (
              <Button variant='outline' asChild>
                <Link
                  href='/auth/login'
                  className={buttonVariants({ variant: 'link' })}
                >
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
