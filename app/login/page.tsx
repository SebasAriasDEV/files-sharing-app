'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Page() {
  const supabase = createClientComponentClient();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      setErrorMessage(error.message);
    } else {
      router.replace('/');
    }
  };

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn();
  };

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold mb-3'>Login Page</h1>
      <form className='flex flex-col border p-4 rounded' onSubmit={formSubmit}>
        <label className='flex flex-col gap-2 mb-2'>
          <span>Email:</span>
          <input
            className='bg-slate-100 rounded p-3'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className='flex flex-col gap-2 mb-2'>
          <span>Password:</span>
          <input
            className='bg-slate-100 rounded p-3'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
      <button
        className='mt-3 bg-slate-700 text-white rounded py-1 px-3'
        onClick={signIn}
      >
        Sign In
      </button>
      {errorMessage && (
        <div className='text-red-600 font-bold'>{errorMessage}</div>
      )}
    </main>
  );
}
