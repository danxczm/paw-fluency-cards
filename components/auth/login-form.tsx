'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { EmailPasswordLogin } from '@/app/auth/actions';
import { supabaseBrowserClient } from '@/lib/supabase/browser';

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
import { LogInSchema } from '@/schema';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const LoginForm = () => {
  //   const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LogInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: z.infer<typeof LogInSchema>) => {
    // setLoading(true);
    startTransition(async () => {
      const result = await EmailPasswordLogin(data);

      const { error } = JSON.parse(result);

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
      } else {
        toast({
          title: 'Congratulations!',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>
                You successfully logged in.
              </code>
            </pre>
          ),
        });
      }
    });

    // setLoading(false);
  };

  const handleLoginWithOAuth = () => {
    const supabase = supabaseBrowserClient();

    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: location.origin + '/auth/callback',
      },
    });
  };

  return (
    <CardWrapper
      label='Login to your account.'
      title='Login'
      backButtonHref='/auth/register'
      backButtonLabel='Don`t have an account? Register here.'
    >
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
          </div>

          <Button
            disabled={isPending}
            type='submit'
            className='w-full'
          >
            {isPending && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            {isPending ? 'Please wait' : 'Login'}
          </Button>
        </form>
      </Form>
      <Button
        onClick={() => handleLoginWithOAuth()}
        variant='outline'
        className='mt-3 w-full'
      >
        Login with Google
      </Button>
    </CardWrapper>
  );
};

export default LoginForm;
