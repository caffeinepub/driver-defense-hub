import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useBlockUser } from '../hooks/useQueries';
import { toast } from 'sonner';
import { TRANSLATIONS } from '../constants/translations';
import type { Principal } from '@icp-sdk/core/principal';
import { Loader2 } from 'lucide-react';

interface BlockUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: { principal: Principal; name: string } | null;
}

export default function BlockUserDialog({ open, onOpenChange, user }: BlockUserDialogProps) {
  const [reason, setReason] = useState('');
  const blockUserMutation = useBlockUser();

  const handleBlock = async () => {
    if (!user) return;

    try {
      await blockUserMutation.mutateAsync({
        user: user.principal,
        userName: user.name,
      });
      toast.success(TRANSLATIONS.admin.users.blockSuccess);
      onOpenChange(false);
      setReason('');
    } catch (error: any) {
      toast.error(error.message || TRANSLATIONS.errors.generic);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TRANSLATIONS.admin.users.blockDialog.title}</DialogTitle>
          <DialogDescription>
            {TRANSLATIONS.admin.users.blockDialog.description.replace('{name}', user?.name || '')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">{TRANSLATIONS.admin.users.blockDialog.reasonLabel}</Label>
            <Textarea
              id="reason"
              placeholder={TRANSLATIONS.admin.users.blockDialog.reasonPlaceholder}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={blockUserMutation.isPending}
          >
            {TRANSLATIONS.buttons.close}
          </Button>
          <Button
            variant="destructive"
            onClick={handleBlock}
            disabled={blockUserMutation.isPending}
          >
            {blockUserMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {TRANSLATIONS.admin.users.blockDialog.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
