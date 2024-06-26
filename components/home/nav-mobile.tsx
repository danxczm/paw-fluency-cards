'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { FEATURES_LIST } from './content/navbar-features-list';

const navItems = [
  {
    name: 'Home',
    slug: '/',
  },
  //   {
  //     name: 'Class Room',
  //     slug: 'content',
  //   },
];

export default function NavMobile({ userSession }: any) {
  const [open, setOpen] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);
  // prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed left-3 top-3 z-40 rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 focus:outline-none active:bg-gray-300 lg:hidden',
          open && 'hover:bg-gray-100 active:bg-gray-200'
        )}
      >
        {open ? (
          <X className='h-5 w-5 text-gray-600' />
        ) : (
          <Menu className='h-5 w-5 text-gray-600' />
        )}
      </button>
      <nav
        className={cn(
          'fixed inset-0 z-20 hidden w-full bg-white px-5 py-16 lg:hidden',
          open && 'block'
        )}
      >
        <ul className='grid divide-y divide-gray-200'>
          <li className='py-3'>
            <button
              className='flex w-full justify-between'
              onClick={() => setOpenFeatures(!openFeatures)}
            >
              <p className='font-semibold'>Features</p>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-gray-500 transition-all',
                  openFeatures && 'rotate-180'
                )}
              />
            </button>
            {openFeatures && (
              <div className='grid gap-4 overflow-hidden py-4'>
                {FEATURES_LIST.map(
                  ({ slug, icon: Icon, shortTitle }) => (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      onClick={() => setOpen(false)}
                      className='flex w-full space-x-2'
                    >
                      <Icon className='h-5 w-5 text-gray-500' />
                      <span className='text-sm'>
                        {shortTitle}
                      </span>
                    </Link>
                  )
                )}
              </div>
            )}
          </li>
          {navItems.map(({ name, slug }) => (
            <li key={slug} className='py-3'>
              <Link
                href={`/${slug}`}
                onClick={() => setOpen(false)}
                className='flex w-full font-semibold capitalize'
              >
                {name}
              </Link>
            </li>
          ))}

          {userSession?.user ? (
            <li className='py-3'>
              <Link
                href='/content'
                className='flex w-full font-semibold capitalize'
              >
                Class Room
              </Link>
            </li>
          ) : (
            <>
              <li className='py-3'>
                <Link
                  href='auth/login'
                  className='flex w-full font-semibold capitalize'
                >
                  Log in
                </Link>
              </li>

              <li className='py-3'>
                <Link
                  href='auth/register'
                  className='flex w-full font-semibold capitalize'
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
