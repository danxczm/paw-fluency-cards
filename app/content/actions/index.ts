'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export async function createFlashCard(data: object) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase
    .from('test')
    .insert({ ...data })
    .single();

  revalidatePath('/content');

  return JSON.stringify(result);
}
export async function readFlashCard() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from('test').select('*');
}
export async function deleteFlashCard(id: string) {
  const supabase = await createSupabaseServerClient();

  await supabase.from('test').delete().eq('id', id);
  revalidatePath('/content');
}
export async function updateFlashCard(id: string, data: object) {
  const supabase = await createSupabaseServerClient();

  await supabase
    .from('test')
    .update({ ...data })
    .eq('id', id);
  revalidatePath('/content');
}
