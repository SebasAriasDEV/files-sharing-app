'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ChangeEventHandler, useState } from 'react';

type Props = {
  userId: string;
};

export default function UploadFile({ userId }: Props) {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setFile(e.target.files.length === 0 ? null : e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    setIsLoading(true);

    if (!file) return;
    const date = new Date().toLocaleString().replace(/[:, /]/g, '-');
    const { data, error } = await supabase.storage
      .from('files')
      .upload(`${userId}/${file.name}-${date}`, file);
    if (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className='flex flex-row items-center border p-4 gap-2'>
      <span>{file?.name}</span>
      <input type='file' className='flex-1' onChange={selectFile} />
      <button
        onClick={uploadFile}
        className='bg-slate-800 text-white hover:bg-slate-700 py-2 px-3 rounded-md disabled:bg-slate-400'
        disabled={file === null || isLoading}
      >
        Upload file
      </button>
    </div>
  );
}
