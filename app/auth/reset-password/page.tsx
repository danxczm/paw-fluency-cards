import { redirect } from 'next/navigation';

import readUserSession from '@/lib/supabase/actions';

import ResetPasswordForm from '@/components/auth/reset-password-form';

const ResetPassword = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/content');
  }
  return <ResetPasswordForm />;
};

export default ResetPassword;
