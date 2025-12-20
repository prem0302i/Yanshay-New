'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPopup = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid grid-cols-2 gap-8 p-0">
        <div className="relative h-full">
          <Image src="/login-banner.png" alt="Login Banner" layout="fill" objectFit="cover" />
        </div>
        <div className="p-8">
          <DialogHeader>
            <DialogTitle>Login / Signup</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Label htmlFor="mobile">Enter Mobile Number</Label>
            <Input id="mobile" />
            <Button className="w-full mt-4">Continue</Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">OR</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Facebook</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              By creating an account or logging in, you agree with Yanshay's T&C and Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
