'use client';

import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Drawer } from 'vaul';
import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import useMediaQuery from '@/hooks/useMediaQuery';

export function Popover({
  children,
  content,
  align = 'center',
  openPopover,
  setOpenPopover,
  mobileOnly,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: 'center' | 'start' | 'end';
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  mobileOnly?: boolean;
}) {
  const { isMobile } = useMediaQuery();

  if (mobileOnly || isMobile) {
    return (
      <Drawer.Root
        open={openPopover}
        onOpenChange={setOpenPopover}
      >
        <Drawer.Trigger className='sm:hidden' asChild>
          {children}
        </Drawer.Trigger>
        <Drawer.Overlay className='fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur' />
        <Drawer.Portal>
          <Drawer.Content className='fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white'>
            <div className='sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit'>
              <div className='my-3 h-1 w-12 rounded-full bg-gray-300' />
            </div>
            <div className='flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-white pb-8 align-middle shadow-xl'>
              {content}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <PopoverRoot
      open={openPopover}
      onOpenChange={setOpenPopover}
    >
      <PopoverTrigger className='sm:inline-flex' asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        align={align}
        className='animate-slide-up-fade z-50 items-center rounded-md border border-gray-200 bg-white drop-shadow-lg sm:block'
      >
        {content}
      </PopoverContent>
    </PopoverRoot>
  );
}
