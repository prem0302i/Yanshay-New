'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { updateUserPassword } from '@/services/user.service';

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangePasswordModal = ({ open, onOpenChange }: ChangePasswordModalProps) => {
  const [isPasswordSaving, setIsPasswordSaving] = React.useState(false);

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handlePasswordChange = async (data: PasswordFormData) => {
    setIsPasswordSaving(true);
    try {
      await updateUserPassword(data.newPassword);
      passwordForm.reset();
      onOpenChange(false);
      toast.success('Password changed successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsPasswordSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter a new password below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" {...passwordForm.register('newPassword')} />
            {passwordForm.formState.errors.newPassword && <p className="text-red-500 text-sm">{passwordForm.formState.errors.newPassword.message}</p>}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" {...passwordForm.register('confirmPassword')} />
            {passwordForm.formState.errors.confirmPassword && <p className="text-red-500 text-sm">{passwordForm.formState.errors.confirmPassword.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPasswordSaving}>
              {isPasswordSaving ? 'Changing...' : 'Change Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
