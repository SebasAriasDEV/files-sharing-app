'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Props = {
  userId: string;
};

export default function UploadFile({ userId }: Props) {
  const supabase = createClientComponentClient();

  const uploadFile = async () => {
    const date = new Date().toLocaleString().replace(/[:, /]/g, '-');
    const { data, error } = await supabase.storage
      .from('files')
      .upload(`${userId}/hola${date}.txt`, 'hola hola hola hola');
    if (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={uploadFile}
      className='bg-slate-800 text-white hover:bg-slate-700 py-2 px-3 rounded-md'
    >
      Upload file
    </button>
  );
}
