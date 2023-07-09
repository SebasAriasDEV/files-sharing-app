'use client';

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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type FileObject } from '@supabase/storage-js';
import path from 'path';
import { useState } from 'react';

type Props = {
  file: FileObject;
  className: string;
  path: string;
};
export default function ShareFileButton({ file, className, path }: Props) {
  const supabase = createClientComponentClient();
  const [url, setUrl] = useState('');
  const [expire, setExpire] = useState('');

  const getUrl = async () => {
    const { data, error } = await supabase.storage
      .from('files')
      .createSignedUrl(path, Number(expire) * 60);

    if (data) {
      setUrl(data.signedUrl);
    }
  };

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
          <div className='py-3 flex flex-col gap-3'>
            <Select onValueChange={setExpire}>
              <SelectTrigger>
                <SelectValue placeholder='Select expiration time' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1 minute</SelectItem>
                <SelectItem value='10'>10 minutes</SelectItem>
                <SelectItem value='60'>1 hour</SelectItem>
                <SelectItem value='600'>10 hours</SelectItem>
                <SelectItem value='14900'>10 days</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type='text'
              value={url}
              placeholder='Shareable URL...'
              readOnly={true}
            />
          </div>
          <DialogFooter>
            <Button onClick={getUrl}>Get URL</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
