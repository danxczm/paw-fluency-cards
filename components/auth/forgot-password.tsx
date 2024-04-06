'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { ResetPasswordForEmail } from '@/app/auth/actions';

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
import { ForgotPasswordSchema } from '@/schema';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (
    data: z.infer<typeof ForgotPasswordSchema>
  ) => {
    startTransition(async () => {
      const result = await ResetPasswordForEmail(data);
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
                Check your email to reset the password.
              </code>
            </pre>
          ),
        });
      }
    });
  };

  return (
    <CardWrapper
      label='Enter registered email address.'
      title='Reset Password'
      backButtonHref='/auth/login'
      backButtonLabel='Login here.'
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
            {isPending ? 'Please wait' : 'Confirm'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
