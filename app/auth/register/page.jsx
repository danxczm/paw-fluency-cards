import RegisterForm from '@/components/auth/register-form';
import readUserSession from '@/lib/supabase/actions';
import { redirect } from 'next/navigation';

const RegistrationPage = async () => {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect('/content');
  }
  return <RegisterForm />;
};

export default RegistrationPage;
