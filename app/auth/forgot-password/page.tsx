import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';

import ForgotPasswordForm from '@/components/auth/forgot-password-form';

const ForgotPassword = async () => {
  const { data: userSession } = await readUserSession();
  if (userSession?.user) {
    return redirect('/content');
  }
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
