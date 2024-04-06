'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function EmailPasswordRegistration(data: {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}) {
  const origin = headers().get('origin');
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
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

export const Logout = async () => {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
};

export const ResetPasswordForEmail = async (data: {
  email: string;
}) => {
  const origin = headers().get('origin');

  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.resetPasswordForEmail(
    data.email,
    { redirectTo: `${origin}/auth/reset-password` }
  );

  return JSON.stringify(result);
};
