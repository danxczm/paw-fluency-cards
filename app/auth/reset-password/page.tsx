'use client';

import { useTransition } from 'react';
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
import { ResetPasswordSchema } from '@/schema';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = (
    data: z.infer<typeof ResetPasswordSchema>
  ) => {
    // startTransition(async () => {
    //   const result = await EmailPasswordLogin(data);
    //   const { error } = JSON.parse(result);
    //   if (error?.message) {
    //     toast({
    //       variant: 'destructive',
    //       title: 'Uh oh! Something went wrong.',
    //       description: (
    //         <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //           <code className='text-white'>
    //             {error.message}
    //           </code>
    //         </pre>
    //       ),
    //     });
    //   } else {
    //     toast({
    //       title: 'Congratulations!',
    //       description: (
    //         <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //           <code className='text-white'>
    //             You successfully logged in.
    //           </code>
    //         </pre>
    //       ),
    //     });
    //   }
    // });
  };

  return (
    <CardWrapper
      label='Create new password.'
      title='New password'
      backButtonHref=''
      backButtonLabel=''
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>New password</FormLabel>
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
                  <FormLabel>
                    Confirm new password
                  </FormLabel>
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
            {isPending ? 'Please wait' : 'Reset password'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
