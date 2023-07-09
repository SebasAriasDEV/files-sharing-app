import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import UploadFile from '../components/UploadFile';
import RootFolder from '../components/RootFolder';
import FileUploadArea from '../components/FileUploadArea';

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
      <FileUploadArea userId={data.user.id} />
      <UploadFile userId={data.user.id} />
      <RootFolder userId={data.user.id} />
    </main>
  );
}
