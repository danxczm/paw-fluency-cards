'use client';

import { RegistrationSchema } from '@/schema';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { EmailPasswordRegistration } from '@/app/auth/actions';

import CardWrapper from '@/components/auth/card-wrapper';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { AuthAlert } from './auth-alert';
import Link from 'next/link';

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const [registrationEmailSent, setRegistrationEmailSent] =
    useState(false);

  const form = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (
    data: z.infer<typeof RegistrationSchema>
  ) => {
    startTransition(async () => {
      const result = await EmailPasswordRegistration(data);

      const { error, user } = JSON.parse(result);
      console.log(`user: `, user);

      //   if (!user?.identities?.length) {
      //     toast({
      //       variant: 'destructive',
      //       title: 'This email is already registered.',
      //       description: (
      //         <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
      //           <code className='text-white'>
      //             <Button
      //               variant='ghost'
      //               className='w-full font-normal'
      //               size='sm'
      //               asChild
      //             >
      //               <Link href='/auth/login'>
      //                 Login here.
      //               </Link>
      //             </Button>
      //           </code>
      //         </pre>
      //       ),
      //     });
      //   } else
      if (error?.message) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>
                {error.message}
              </code>
            </pre>
          ),
        });
      } else if (
        // user?.identities?.length &&
        !error?.message
      ) {
        setRegistrationEmailSent(true);
      }
    });
  };

  return (
    <CardWrapper
      label='Create an account'
      title='Register'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account? Login here.'
    >
      {registrationEmailSent ? (
        <AuthAlert
          type='registration'
          title={'You are almost there!'}
          description={`Check "${form.getValues('email')}" to finish registration.`}
        />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='your@email.com'
                      />
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
                      <Input
                        {...field}
                        type='name'
                        placeholder='What can I call you?'
                      />
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
                      <Input
                        {...field}
                        type='password'
                        placeholder='******'
                      />
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
                      <Input
                        {...field}
                        type='password'
                        placeholder='******'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isPending}
              type='submit'
              className='w-full'
            >
              {isPending && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isPending ? 'Please wait' : 'Register'}
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};

export default RegisterForm;
