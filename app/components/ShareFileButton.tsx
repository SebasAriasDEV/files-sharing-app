import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { type FileObject } from '@supabase/storage-js';

type Props = {
  file: FileObject;
  className: string;
};
export default function ShareFileButton({ file, className }: Props) {
  return (
    <Dialog>
      <DialogTrigger className={className}>share</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to share this file?</DialogTitle>
          <DialogDescription>
            Share file "<code>{file.name}</code>" by choosing expire time below
            and generating a URL.
          </DialogDescription>
          <div>
            hola
            hola hola
          </div>
          <DialogFooter>
            <Button>Get URL</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
