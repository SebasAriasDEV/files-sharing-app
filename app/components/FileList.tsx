import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

type Props = {
  userId: string;
};

export default async function FileList({ userId }: Props) {
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

  return (
    <div>
      {files.map((file) => (
        <div>{file.name}</div>
      ))}
    </div>
  );
}
