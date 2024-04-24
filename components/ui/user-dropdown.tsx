'use client';

import {
  HelpCircle,
  LogOut,
  Settings,
  CircleUserRound,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Popover } from './dubPopover';
import { IconMenu } from './dubIconMenu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from './avatar';
import Divider from '@/components/ui/divider';

export default function UserDropdown({
  session,
  logout,
}: any) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className='relative flex items-center'>
      <p className='truncate text-sm text-gray-700'>
        {session?.user?.user_metadata?.full_name
          ? session?.user?.user_metadata?.full_name
          : session?.user?.email}
      </p>
      <Divider className='mx-2 h-8 w-8 text-gray-300' />
      <Popover
        content={
          <div className='flex w-full flex-col space-y-px rounded-md bg-white p-3 '>
            <Link
              href='/'
              className='p-2'
              onClick={() => setOpenPopover(false)}
            >
              <p className='truncate text-sm font-medium text-gray-900'>
                {session?.user?.user_metadata?.name
                  ? session?.user?.user_metadata?.name
                  : session?.user?.email}
              </p>
              <p className='truncate text-xs text-gray-500'>
                {session?.user?.email}
              </p>
            </Link>
            {/* <Link
              href='https://dub.co/help'
              onClick={() => setOpenPopover(false)}
              target='_blank'
              className='w-full p-2 text-sm transition-all duration-75 rounded-md hover:bg-gray-100 active:bg-gray-200'
            >
              <IconMenu
                text='Help Center'
                icon={<HelpCircle className='w-4 h-4' />}
              />
            </Link>

            <Link
              href='/settings'
              onClick={() => setOpenPopover(false)}
              className='block w-full p-2 text-sm transition-all duration-75 rounded-md hover:bg-gray-100 active:bg-gray-200'
            >
              <IconMenu
                text='Settings'
                icon={<Settings className='w-4 h-4' />}
              />
            </Link> */}

            <form action={logout}>
              <button className='w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200'>
                <IconMenu
                  text='Logout'
                  icon={<LogOut className='h-4 w-4' />}
                />
              </button>
            </form>
          </div>
        }
        align='end'
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className='group relative'
        >
          {session?.user ? (
            <Avatar>
              <AvatarImage
                src={
                  session?.user?.user_metadata?.avatar_url
                }
                alt='Avatar'
              />
              <AvatarFallback>
                <CircleUserRound />
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className='flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 sm:h-10 sm:w-10'>
              <CircleUserRound />
            </div>
          )}
        </button>
      </Popover>
    </div>
  );
}
