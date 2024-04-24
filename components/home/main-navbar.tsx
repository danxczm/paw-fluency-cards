import Link from 'next/link';
import { CircleUser, Menu, PawPrint } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import readUserSession from '@/lib/supabase/actions';
import { redirect } from 'next/navigation';
import { ModeToggle } from '../theme/theme-switcher';
import { Logout } from '@/app/auth/actions';

const MainNavbar = async () => {
  const { data: userSession } = await readUserSession();

  const logOutUser = async () => {
    'use server';
    await Logout();
    redirect('/');
  };

  return (
    <div className='w-full flex-col'>
      <header className='flex h-14 items-center gap-4 border-b bg-background px-6 md:px-14'>
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Link
            href='/'
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <PawPrint className='h-6 w-6' />
            <span>PawFluency</span>
          </Link>
          <Link
            href='/'
            className='text-foreground transition-colors hover:text-foreground'
          >
            Home
          </Link>
          {userSession?.user && (
            <Link
              href='/content'
              className='text-foreground transition-colors hover:text-foreground'
            >
              Content
            </Link>
          )}
          {/* <Link
            href='#'
            className='transition-colors text-muted-foreground hover:text-foreground'
          >
            Orders
          </Link>
          <Link
            href='#'
            className='transition-colors text-muted-foreground hover:text-foreground'
          >
            Products
          </Link>
          <Link
            href='#'
            className='transition-colors text-muted-foreground hover:text-foreground'
          >
            Customers
          </Link>
          <Link
            href='#'
            className='transition-colors text-muted-foreground hover:text-foreground'
          >
            Analytics
          </Link> */}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0 md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>
                Toggle navigation menu
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link
                href='#'
                className='flex items-center gap-2 text-lg font-semibold'
              >
                <PawPrint className='h-6 w-6' />
                <span className='sr-only'>Acme Inc</span>
              </Link>
              {/* <Link href='#' className='hover:text-foreground'>
                Dashboard
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                Orders
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                Products
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                Customers
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                Analytics
              </Link> */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className='flex w-full items-center gap-4 md:gap-2 lg:gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='secondary'
                size='icon'
                className='ml-auto rounded-full'
              >
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>
                  Toggle user menu
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center'>
              <DropdownMenuLabel>
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <ModeToggle />
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                {userSession ? (
                  <form action={logOutUser}>
                    <Button variant='ghost'>Log out</Button>
                  </form>
                ) : (
                  <Link href='/auth/login'>Login</Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default MainNavbar;
