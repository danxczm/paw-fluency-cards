'use client';

import CardWrapper from '@/components/auth/card-wrapper';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const RegisterForm = () => {
  return (
    <CardWrapper
      label='Create an account'
      title='Registration'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account? Login here.'
    ></CardWrapper>
  );
};

export default RegisterForm;
