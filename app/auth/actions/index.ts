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

export const ForgotPasswordEmail = async (data: {
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

export const ResetPassword = async (data: {
  password: string;
}) => {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.updateUser({
    password: data.password,
  });

  return JSON.stringify(result);
};

export const LoginWithMagicLink = async (data: {
  email: string;
}) => {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      shouldCreateUser: false,
    },
  });

  return JSON.stringify(result);
};

export const ExchangeCodeForSession = async (
  code: string
) => {
  const supabase = await createSupabaseServerClient();
  const result =
    await supabase.auth.exchangeCodeForSession(code);

  return JSON.stringify(result);
};
