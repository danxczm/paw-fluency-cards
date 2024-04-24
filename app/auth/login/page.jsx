import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';

import LoginForm from '@/components/auth/login-form';

const LoginPage = async () => {
  const { data: userSession } = await readUserSession();

  if (userSession?.user) {
    return redirect('/content');
  }
  return <LoginForm />;
};

export default LoginPage;
