'use client';

import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import {
  useParams,
  useSelectedLayoutSegment,
} from 'next/navigation';
import { MaxWidthWrapper } from '../ui/max-with-wrapper';
import useScroll from '@/hooks/useScroll';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import { FEATURES_LIST } from './content/navbar-features-list';
import UserDropdown from '../ui/user-dropdown';

const navItems = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'Class Room',
    slug: 'content',
  },
];

const HomePageNav = ({ userSession, logout }: any) => {
  const scrolled = useScroll(80);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg':
            scrolled,
        }
      )}
    >
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link
              href={'/'}
              className='ml-12 flex items-center gap-2 text-lg font-semibold md:text-base lg:ml-0'
            >
              <PawPrint className='h-6 w-6' />
              <span>PawFluency</span>
            </Link>
            <NavigationMenu
              delayDuration={0}
              className='relative hidden lg:block'
            >
              <NavigationMenuList className='flex flex-row space-x-2 p-4'>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <p className='text-gray-500 hover:text-black hover:dark:text-gray-100 '>
                      Features
                    </p>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className='grid w-[32rem] grid-cols-2 gap-1 p-3'>
                      {FEATURES_LIST.map(
                        (
                          {
                            slug,
                            icon: Icon,
                            title,
                            shortTitle,
                          },
                          index
                        ) => (
                          <Link
                            key={index}
                            href='/'
                            className='rounded-lg p-3 transition-colors hover:bg-gray-100 active:bg-gray-300 dark:hover:bg-gray-200'
                          >
                            <div className='flex items-center space-x-2'>
                              <Icon className='h-4 w-4 text-gray-700' />
                              <p className='text-sm font-medium text-gray-700'>
                                {shortTitle}
                              </p>
                            </div>
                            <p className='mt-1 line-clamp-1 text-sm text-gray-500'>
                              {title}
                            </p>
                          </Link>
                        )
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {navItems.map(({ name, slug }, index) => (
                  <NavigationMenuItem key={index} asChild>
                    <Link
                      id={`nav-${slug}`}
                      key={slug}
                      href={`${slug}`}
                      className={cn(
                        'rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:bg-accent hover:text-accent-foreground hover:text-black dark:hover:text-gray-100',
                        {
                          'bg-gray-100 text-gray-600':
                            selectedLayout === slug,
                        }
                      )}
                    >
                      {name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {userSession.user ? (
            <UserDropdown
              session={userSession}
              logout={logout}
            />
          ) : (
            <div className='hidden lg:block'>
              <div className='flex items-center space-x-4'>
                <Link
                  href='/auth/login'
                  className='animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black'
                >
                  Log in
                </Link>
                <Link
                  href='/auth/register'
                  className='animate-fade-in rounded-full border border-primary bg-primary px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-primary'
                >
                  Sigh up
                </Link>
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HomePageNav;
