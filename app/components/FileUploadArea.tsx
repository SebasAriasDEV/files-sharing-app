'use client';

import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { DragEventHandler, useState } from 'react';

type Props = {
  userId: string;
};

export default function FileUploadArea({ userId }: Props) {
  const supabase = createClientComponentClient();
  const [over, setOver] = useState(false);

  const onDrop: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const [file] = e.dataTransfer.files;

    if (!file) return;
    const date = new Date().toLocaleString().replace(/[:, /]/g, '-');
    const { data, error } = await supabase.storage
      .from('files')
      .upload(`${userId}/${file.name}-${date}`, file);
    if (error) {
      console.log(error);
    }

    setOver(false);
  };

  return (
    <div
      className={cn(
        'border rounded mb-3 p-3 flex flex-col items-center h-20 justify-center text-slate-400',
        over
          ? 'bg-blue-300 border-blue-700 border-dotted text-slate-100'
          : 'bg-white'
      )}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={(_) => {
        setOver(true);
      }}
      onDragLeave={(e) => {
        setOver(false);
      }}
    >
      Drop files here...
    </div>
  );
}
