'use client';

import { type FileObject } from '@supabase/storage-js';
import FileItem from './FileItem';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { split } from 'postcss/lib/list';

type Props = {
  files: FileObject[];
  userId: string;
};

export default function FileList({ files, userId }: Props) {
  const supabase = createClientComponentClient();
  const [fileList, setFileList] = useState(files);

  const deleteFile = async (path: string) => {
    const { data, error } = await supabase.storage.from('files').remove([path]);
    if (error) {
      console.log(error);
    }
  };

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

  return (
    <div className='mt-4'>
      {fileList.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          onDelete={() => deleteFile(`${userId}/${file.name}`)}
          onDownload={() => downloadFile(`${userId}/${file.name}`)}
        />
      ))}
    </div>
  );
}
