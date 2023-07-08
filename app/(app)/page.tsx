import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import UploadFile from '../components/UploadFile';
import FileList from '../components/FileList';

//Revalidate
export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  return (
    <main className='p-6'>
      <UploadFile userId={data.user.id} />
      <FileList userId={data.user.id} />
    </main>
  );
}
