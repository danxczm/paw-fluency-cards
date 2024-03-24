import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';

import LoginForm from '@/components/auth/login-form';

const LoginPage = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/content');
  }
  return <LoginForm />;
};

export default LoginPage;
