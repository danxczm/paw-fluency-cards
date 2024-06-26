import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

import {
  MailCheck,
  UserPlus,
  KeyRound,
} from 'lucide-react';

type AuthAlertProps = {
  type: 'registration' | 'emailLink' | 'forgotPassword';
  title: string;
  description: string;
};

const icon: { [key: string]: React.ReactNode } = {
  registration: <UserPlus className='h-4 w-4' />,
  emailLink: <MailCheck className='h-4 w-4' />,
  forgotPassword: <KeyRound className='h-4 w-4' />,
};

export const AuthAlert = ({
  type,
  title,
  description,
}: AuthAlertProps) => {
  const iconComponent = icon[type];

  return (
    <Alert>
      {iconComponent}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className='mt-2'>
        {description}
      </AlertDescription>
      {type === 'forgotPassword' && (
        <p className='mt-2 text-xs text-gray-500'>
          We will redirect you to sign in.
        </p>
      )}
    </Alert>
  );
};
