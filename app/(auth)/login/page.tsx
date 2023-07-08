'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Page() {
  const supabase = createClientComponentClient();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    // Start loading
    setIsLoading(true);
    setErrorMessage('');

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

    //Stops loading
    setIsLoading(false);
  };

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn();
  };

  return (
    <main className='bg-gray-50 w-screen h-screen flex items-center justify-center'>
      <div className='w-4/5 md:w-6/12 flex flex-col gap-6'>
        <h1 className='block text-2xl font-bold text-center text-gray-800'>
          Login Page
        </h1>
        <form
          className='flex flex-col border p-10 rounded-md bg-white'
          onSubmit={formSubmit}
          autoComplete='on'
        >
          <label className='flex flex-col gap-2 mb-2'>
            <span>Email:</span>
            <input
              className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='on'
            />
          </label>
          <label className='flex flex-col gap-2 mb-2'>
            <span>Password:</span>
            <input
              className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </form>
        <button
          className='disabled:bg-slate-300 w-full py-3 px-4 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600'
          onClick={signIn}
          disabled={isLoading}
        >
          Sign In
        </button>
        {errorMessage && (
          <div className='text-red-600 font-bold text-center'>
            {errorMessage}
          </div>
        )}
      </div>
    </main>
  );
}
