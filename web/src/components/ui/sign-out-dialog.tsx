"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  userName?: string;
  role?: "customer" | "vendor";
}

export function SignOutConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  userName,
  role = "customer",
}: SignOutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 rounded-3xl bg-[#FAF7F2] border-2 border-[#C5A46D]/40 shadow-2xl">
        <DialogHeader className="space-y-3 sm:text-left">
          {/* Brand Themed Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-[#762B46]/10 text-[#762B46] border border-[#762B46]/25 flex items-center justify-center shadow-xs mb-1">
            <LogOut className="w-6 h-6 text-[#762B46]" />
          </div>

          <DialogTitle className="text-xl font-heading font-bold text-[#542034]">
            Sign Out of {role === "vendor" ? "Vendor Portal" : "Customer Portal"}?
          </DialogTitle>

          <DialogDescription className="text-xs text-[#57534E] leading-relaxed">
            {userName ? (
              <span>
                You are currently signed in as <strong className="text-[#542034] font-bold">{userName}</strong>.
              </span>
            ) : (
              "Are you sure you want to sign out?"
            )}{" "}
            You will need to verify your phone number via OTP to sign back in.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 mt-4 pt-3 border-t border-[#E7DECF]">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto text-xs font-semibold border-[#C5A46D]/50 hover:bg-[#F4EDE3] text-[#57534E] cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto bg-[#762B46] hover:bg-[#542034] text-white text-xs font-bold gap-1.5 shadow-md shadow-pink-950/15 border border-[#C5A46D]/40 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Confirm Sign Out</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

