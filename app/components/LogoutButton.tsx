'use client';

import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setuser] = useState<User | null>(null);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return data.user;
  };

  useEffect(() => {
    getUser().then((user) => setuser(user));
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <div className='flex flex-row gap-4 items-center divide-x-2'>
      <p className='text-gray-600'>
        Logged in as{' '}
        <span className='text-slate-800 font-semibold'>
          {user ? user.email : '...'}
        </span>
      </p>
      <button
        onClick={logout}
        className='bg-red-700 hover:bg-red-600 text-white font-bold rounded-md px-4 py-2'
      >
        Logout
      </button>
    </div>
  );
}
