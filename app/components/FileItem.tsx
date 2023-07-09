import { type FileObject } from '@supabase/storage-js';
import DownloadIcon from './icons/DownloadIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import ShareFileButton from './ShareFileButton';

type Props = {
  onDownload: () => void;
  onDelete: () => void;
  file: FileObject;
};

export default function FileItem({ file, onDelete, onDownload }: Props) {
  return (
    <div
      className={
        'flex flex-row items-center p-2 border-2 border-b-0 last:border-b-2 last:rounded-b-md first:rounded-t-md ' +
        'font-mono hover:bg-stone-100 cursor-pointer group text-stone-400'
      }
    >
      <div className='text-slate-900'>{file.name}</div>
      <div className='flex-1'></div>
      <ShareFileButton file={file} className='invisible group-hover:visible'/>
      <div
        className='px-2 invisible group-hover:visible hover:text-blue-800'
        onClick={onDownload}
      >
        <DownloadIcon />
      </div>
      <div
        className='px-1 invisible group-hover:visible hover:text-red-800'
        onClick={onDelete}
      >
        <DeleteIcon />
      </div>
    </div>
  );
}
