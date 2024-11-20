"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings as SettingsType } from "@/types"

interface SettingsDialogProps {
  settings: SettingsType
  onSettingsChange: (settings: SettingsType) => void
}

export function SettingsDialog({ settings, onSettingsChange }: SettingsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-format">Auto-format JSON</Label>
            <Switch
              id="auto-format"
              checked={settings.autoFormat}
              onCheckedChange={(checked: boolean) =>
                onSettingsChange({ ...settings, autoFormat: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="save-history">Save Request History</Label>
            <Switch
              id="save-history"
              checked={settings.saveHistory}
              onCheckedChange={(checked: boolean) =>
                onSettingsChange({ ...settings, saveHistory: checked })
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 