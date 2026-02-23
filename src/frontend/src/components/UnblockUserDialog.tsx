import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useUnblockUser } from '../hooks/useQueries';
import { toast } from 'sonner';
import { TRANSLATIONS } from '../constants/translations';
import type { Principal } from '@icp-sdk/core/principal';
import { Loader2 } from 'lucide-react';

interface UnblockUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: { principal: Principal; name: string } | null;
}

export default function UnblockUserDialog({ open, onOpenChange, user }: UnblockUserDialogProps) {
  const unblockUserMutation = useUnblockUser();

  const handleUnblock = async () => {
    if (!user) return;

    try {
      await unblockUserMutation.mutateAsync({
        user: user.principal,
        userName: user.name,
      });
      toast.success(TRANSLATIONS.admin.users.unblockSuccess);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || TRANSLATIONS.errors.generic);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TRANSLATIONS.admin.users.unblockDialog.title}</DialogTitle>
          <DialogDescription>
            {TRANSLATIONS.admin.users.unblockDialog.description.replace('{name}', user?.name || '')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={unblockUserMutation.isPending}
          >
            {TRANSLATIONS.buttons.close}
          </Button>
          <Button
            onClick={handleUnblock}
            disabled={unblockUserMutation.isPending}
          >
            {unblockUserMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {TRANSLATIONS.admin.users.unblockDialog.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
