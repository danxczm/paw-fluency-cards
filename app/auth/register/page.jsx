import RegisterForm from '@/components/auth/register-form';
import readUserSession from '@/lib/supabase/actions';
import { redirect } from 'next/navigation';

const RegistrationPage = async () => {
  const { data: userSession } = await readUserSession();
  if (userSession?.user) {
    return redirect('/content');
  }
  return <RegisterForm />;
};

export default RegistrationPage;
