'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoaderCircle } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import { createFlashCard } from '@/app/content/actions';

const FormSchema = z.object({
  word: z.string().min(1, {
    message: 'Word is required.',
  }),
  translation: z.string().min(1, {
    message: 'Translation is required.',
  }),
});

const ContentForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      word: '',
      translation: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await createFlashCard(data.word, data.translation);
      const { error, data: flashCard } = JSON.parse(result);

      if (error?.message) {
        toast({
          variant: 'destructive',
          title: 'Fail to create a flash card',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: 'You successfully have created a flash card.',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>{data.word} is created</code>
            </pre>
          ),
        });
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-48 space-y-6'>
        <FormField
          control={form.control}
          name='word'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>word</FormLabel>
              <FormControl>
                <Input {...field} placeholder='word' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='translation'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>translation</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='translation'
                  //   onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='flex w-full gap-2'>
          Create
          <LoaderCircle
            className={cn(' animate-spin', { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
};

export default ContentForm;
