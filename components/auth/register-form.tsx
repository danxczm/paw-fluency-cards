'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStatus } from 'react-dom';

import CardWrapper from '@/components/auth/card-wrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegistrationSchema } from '@/schema';
import { Button } from '@/components/ui/button';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

  const form = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: { email: '', name: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: z.infer<typeof RegistrationSchema>) => {
    setLoading(true);
    // send data to db
    console.log(data);
    setLoading(false);
  };

  return (
    <CardWrapper
      label='Create an account'
      title='Registration'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account? Login here.'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type='email' placeholder='your@email.com' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type='name' placeholder='What can I call you?' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='******' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='******' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full' disabled={pending}>
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
