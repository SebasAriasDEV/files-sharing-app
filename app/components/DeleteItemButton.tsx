'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { DeleteIcon } from './icons/DeleteIcon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

type Props = {
  path: string;
};

export default function DeleteItemButton({ path }: Props) {
  const supabase = createClientComponentClient();

  const deleteFile = () => {
    supabase.storage
      .from('files')
      .remove([path])
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
      });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className='px-1 invisible group-hover:visible hover:text-red-800'>
          <DeleteIcon />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your file
            and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' variant='destructive' onClick={deleteFile}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
