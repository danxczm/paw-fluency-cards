'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

export async function EmailPasswordRegistration(data: {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: location.origin + '/auth/callback',
    },
  });

  return JSON.stringify(result);
}

export async function EmailPasswordLogin(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}
