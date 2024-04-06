import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';

import ForgotPasswordForm from '@/components/auth/forgot-password';

const ForgotPassword = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/content');
  }
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
