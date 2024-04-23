import { redirect } from 'next/navigation';

import readUserSession from '@/utils/supabase/actions';

import ForgotPasswordForm from '@/components/auth/forgot-password-form';

const ForgotPassword = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/content');
  }
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
