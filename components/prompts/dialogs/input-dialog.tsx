"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface InputDialogProps {
  title: string;
  defaultValue?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export function InputDialog({
  title,
  defaultValue = "",
  isOpen,
  onClose,
  onSubmit,
}: InputDialogProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter name..."
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(value)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 