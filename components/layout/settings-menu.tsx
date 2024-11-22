"use client";

import { Button } from "@/components/ui/button";
import { Settings, Database, Sun, Moon, Laptop, HelpCircle, User, Sliders } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { useTheme } from "next-themes";
import Link from "next/link";

export function SettingsMenu() {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { reset: resetStore } = usePromptStore();
  const { theme, setTheme } = useTheme();

  const handleReset = async () => {
    try {
      setIsResetting(true);
      await initDatabase(true);
      resetStore();
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
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          
          {/* Appearance Settings */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 h-4 w-4" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Laptop className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Database Management */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Database className="mr-2 h-4 w-4" />
              <span>Database</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => setIsResetDialogOpen(true)}
              >
                <Database className="mr-2 h-4 w-4" />
                Reset Database
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                Import Data
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          {/* Main Settings Link */}
          <Link href="/settings" passHref>
            <DropdownMenuItem asChild>
              <span>
                <Sliders className="mr-2 h-4 w-4" />
                All Settings
              </span>
            </DropdownMenuItem>
          </Link>

          {/* Help & Support */}
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </DropdownMenuItem>
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