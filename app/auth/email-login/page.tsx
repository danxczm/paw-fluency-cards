import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';

import EmailLoginForm from '@/components/auth/email-login-form';

const EmailLogin = async () => {
  const { data: userSession } = await readUserSession();
  if (userSession?.user) {
    return redirect('/content');
  }
  return <EmailLoginForm />;
};

export default EmailLogin;
