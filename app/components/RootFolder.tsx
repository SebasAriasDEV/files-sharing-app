import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import FileItem from './FileItem';
import FileList from './FileList';
import { data } from 'autoprefixer';

type Props = {
  userId: string;
};

export default async function RootFolder({ userId }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: files, error } = await supabase.storage
    .from('files')
    .list(userId);

  if (!files) {
    return <div>Error: ${error.toString()}</div>;
  }

  if (files.length === 0) {
    return <div>No files</div>;
  }

  return <FileList files={files} userId={userId} />;
}
