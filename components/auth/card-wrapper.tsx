'use client';

import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import AuthHeader from './auth-header';
import BackButton from './back-button';
import { PawPrint } from 'lucide-react';

interface CardWrapperProps {
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children?: React.ReactNode;
}

const CardWrapper = ({
  children,
  label,
  title,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className='shadow-lg md:w-1/2 xl:w-1/4'>
      <CardHeader>
        <Link
          href='/'
          className='flex items-center justify-center'
        >
          <PawPrint className='h-10 w-10' />
        </Link>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonHref && backButtonHref ? (
        <CardFooter>
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          />
        </CardFooter>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default CardWrapper;
