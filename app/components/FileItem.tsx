import { type FileObject } from '@supabase/storage-js';
import DownloadIcon from './icons/DownloadIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import ShareFileButton from './ShareFileButton';
import DeleteItemButton from './DeleteItemButton';

type Props = {
  onDownload: () => void;
  file: FileObject;
  path: string;
};

export default function FileItem({ file, onDownload, path }: Props) {
  return (
    <div
      className={
        'flex flex-row items-center p-2 border-2 border-b-0 last:border-b-2 last:rounded-b-md first:rounded-t-md ' +
        'font-mono hover:bg-stone-100 cursor-pointer group text-stone-400'
      }
    >
      <div className='text-slate-900'>{file.name}</div>
      <div className='flex-1'></div>
      <ShareFileButton
        path={path}
        file={file}
        className='invisible group-hover:visible'
      />
      <div
        className='px-2 invisible group-hover:visible hover:text-blue-800'
        onClick={onDownload}
      >
        <DownloadIcon />
      </div>
      <DeleteItemButton path={path} />
    </div>
  );
}
