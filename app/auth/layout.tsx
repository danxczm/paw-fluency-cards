import React from 'react';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-full'>
      <div className='mt-12 flex items-center justify-center'>{children}</div>
    </section>
  );
};

export default AuthLayout;
