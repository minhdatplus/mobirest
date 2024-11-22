"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { initDatabase } from "@/lib/db";
import { toast } from "sonner";
import { usePromptStore } from "@/lib/stores/prompt-store";
import { events } from "@/lib/events";

export function SettingsMenu() {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { reset: resetStore } = usePromptStore();

  const handleReset = async () => {
    try {
      setIsResetting(true);
      
      // Reset database
      await initDatabase(true);
      
      // Reset store state
      resetStore();
      
      // Emit event để thông báo database đã được reset
      events.emit('database.reset');
      
      toast.success("Database reset successfully");
      setIsResetDialogOpen(false);
    } catch (error) {
      console.error("Failed to reset database:", error);
      toast.error("Failed to reset database");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setIsResetDialogOpen(true)}
          >
            Reset Database
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Database</DialogTitle>
            <DialogDescription>
              This will permanently delete all your groups and prompts. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResetDialogOpen(false)}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={isResetting}
            >
              {isResetting ? "Resetting..." : "Reset Database"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 