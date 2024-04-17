import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

import { Mail } from 'lucide-react';

type AuthAlertProps = {
  type: 'registration' | 'emailLink' | 'forgotPassword';
  title: string;
  desctiption: string;
};

export const AuthAlert = ({
  title,
  desctiption,
}: AuthAlertProps) => {
  return (
    <Alert>
      <Mail className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{desctiption}</AlertDescription>
    </Alert>
  );
};
