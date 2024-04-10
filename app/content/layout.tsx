import Link from 'next/link';
import { ReactNode, Suspense } from 'react';

import { MaxWidthWrapper } from '@/components/ui/max-with-wrapper';
import Divider from '@/components/ui/divider';
import { PawPrint } from 'lucide-react';
import readUserSession from '@/lib/supabase/actions';
import UserDropdown from '@/components/ui/user-dropdown';
import { Logout } from '../auth/actions';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: userSession } = await readUserSession();

  const logOutUser = async () => {
    'use server';
    await Logout();
    redirect('/');
  };
  return (
    <div className='min-h-screen w-full bg-gray-50'>
      <div className='sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white'>
        <MaxWidthWrapper>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <Link href='/' className='hidden sm:block'>
                <PawPrint className='h-10 w-10' />
              </Link>
              <Divider className='hidden h-8 w-8 text-gray-200 sm:ml-3 sm:block' />
            </div>
            <div className='flex items-center space-x-6'>
              <UserDropdown
                session={userSession}
                logout={logOutUser}
              />
            </div>
          </div>
          <Suspense
            fallback={<div className='h-12 w-full' />}
          ></Suspense>
        </MaxWidthWrapper>
      </div>
      {children}
    </div>
  );
}
