import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomId: string;
}

export default function InviteDialog({
  open,
  onOpenChange,
  roomId,
}: InviteDialogProps) {
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.origin}/chat/join/${roomId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>
            Share this link with people you want to invite to the chat room.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2">
            <Input readOnly value={inviteLink} className="flex-1" />
            <Button
              variant={copied ? "outline" : "default"}
              size="icon"
              onClick={handleCopy}
            >
              {copied ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </motion.div>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            This invite link will never expire. You can create a new one at any
            time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
