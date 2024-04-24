import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';

import ResetPasswordForm from '@/components/auth/reset-password-form';

const ResetPassword = async () => {
  const { data: userSession } = await readUserSession();
  if (userSession?.user) {
    return redirect('/content');
  }
  return <ResetPasswordForm />;
};

export default ResetPassword;
