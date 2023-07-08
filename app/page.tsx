import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import LogoutButton from './components/LogoutButton';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  return (
    <main>
      <div className='bg-gray-50 px-10 py-6 flex flex-row border-b-2 justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-800'>Files Space</h1>
        <div className='flex flex-row gap-4 items-center'>
          <p className='text-gray-800'>
            Logged in as{' '}
            <span className='text-slate-800 font-semibold'>
              Sebastian Arias
            </span>
          </p>
          <p className='text-gray-400'>|</p>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
