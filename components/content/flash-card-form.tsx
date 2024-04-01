'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoaderCircle, Plus } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useEffect, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { createFlashCard } from '@/app/content/actions';
import { fetchMultipleData } from '@/app/content/actions/api';

const FormSchema = z.object({
  word: z.string().min(1, {
    message: 'Word is required.',
  }),
});

const ContentForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      word: '',
    },
  });

  const { handleSubmit, control, setFocus, resetField } = form;

  useEffect(() => {
    setFocus('word');
  }, [isPending]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await createFlashCard(data.word);

      const api = await fetchMultipleData(data.word, 'uk');

      const { error } = JSON.parse(result);

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
        resetField('word');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='ml-auto'>
        <div className='flex gap-4'>
          <FormField
            control={control}
            name='word'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    className='w-64'
                    placeholder='Enter the text to be translated'
                  />
                </FormControl>
                <div className='absolute left-1/2 right-0 top-3/4 flex -translate-x-1/2 -translate-y-1/2 transform justify-center'>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type='submit' className='w-24' disabled={isPending}>
            {isPending ? (
              <LoaderCircle className={cn(' animate-spin', { hidden: !isPending })} />
            ) : (
              <p className='flex items-center justify-center gap-1'>
                Create
                <Plus size={17} />
              </p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContentForm;
