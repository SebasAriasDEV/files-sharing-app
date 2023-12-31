'use client';

import { type FileObject } from '@supabase/storage-js';
import FileItem from './FileItem';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { split } from 'postcss/lib/list';

type Props = {
  files: FileObject[];
  userId: string;
};

export default function FileList({ files, userId }: Props) {
  const supabase = createClientComponentClient();
  const [fileList, setFileList] = useState(files);

  const downloadFile = async (path: string) => {
    const { data, error } = await supabase.storage.from('files').download(path);
    if (error) {
      console.log(error);
      return;
    }
    const a = document.createElement('a');
    const url = URL.createObjectURL(data);
    a.href = url;
    a.download = path.split('/').slice(-1)[0];
    a.click();
  };

  const realoadFiles = async () => {
    const { data, error } = await supabase.storage.from('files').list(userId);
    if (data) {
      setFileList(data);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel('channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'storage', table: 'objects' },
        (payload) => {
          console.log(payload);
          realoadFiles();
        }
      )
      .subscribe();

    return () => {
      console.log('Unsibscribed!!');

      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <div className='mt-4'>
      {fileList.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          onDownload={() => downloadFile(`${userId}/${file.name}`)}
          path={`${userId}/${file.name}`}
        />
      ))}
    </div>
  );
}
