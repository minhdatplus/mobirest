'use client'

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { toast } from "sonner"

export function GeneralSettings() {
  const [settings, setSettings] = useState({
    saveHistory: true,
    maxHistoryItems: 50,
    autoFormat: true,
    defaultTimeout: 30000,
  })

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
    toast.success('Settings saved successfully')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure general application behavior
        </p>
      </div>
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="save-history">Save Request History</Label>
          <Switch
            id="save-history"
            checked={settings.saveHistory}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, saveHistory: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-format">Auto-format JSON</Label>
          <Switch
            id="auto-format"
            checked={settings.autoFormat}
            onCheckedChange={(checked) =>
              setSettings(prev => ({ ...prev, autoFormat: checked }))
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="max-history">Maximum History Items</Label>
          <Input
            id="max-history"
            type="number"
            value={settings.maxHistoryItems}
            onChange={(e) =>
              setSettings(prev => ({ 
                ...prev, 
                maxHistoryItems: parseInt(e.target.value) 
              }))
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="timeout">Request Timeout (ms)</Label>
          <Input
            id="timeout"
            type="number"
            value={settings.defaultTimeout}
            onChange={(e) =>
              setSettings(prev => ({ 
                ...prev, 
                defaultTimeout: parseInt(e.target.value) 
              }))
            }
          />
        </div>
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
} 