'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const logout = () => {
    supabase.auth.signOut();
    router.replace('/login');
  };
  return (
    <button
      onClick={logout}
      className='bg-red-700 hover:bg-red-600 text-white font-bold rounded-md px-4 py-2'
    >
      Logout
    </button>
  );
}
