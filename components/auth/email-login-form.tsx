'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { LoginWithMagicLink } from '@/app/auth/actions';
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
import { EmailLoginSchema } from '@/schema';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

const EmailLoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(EmailLoginSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (
    data: z.infer<typeof EmailLoginSchema>
  ) => {
    startTransition(async () => {
      const result = await LoginWithMagicLink(data);

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
                Check your email to login.
              </code>
            </pre>
          ),
        });
      }
    });
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
      <Button asChild variant='link'>
        <Link
          href='/auth/login'
          className='w-full text-xs '
        >
          Login with email and password.
        </Link>
      </Button>
      <Button asChild variant='link'>
        <Link
          href='/auth/forgot-password'
          className='w-full text-xs '
        >
          Forgot your password?
        </Link>
      </Button>
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

export default EmailLoginForm;
