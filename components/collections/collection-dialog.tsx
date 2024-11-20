"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import { Collection } from "@/types"

interface CollectionDialogProps {
  onSave: (collection: Omit<Collection, "id">) => void
  method: string
  url: string
  headers: Array<{ key: string; value: string }>
  body?: string
}

export function CollectionDialog({ onSave, method, url, headers, body }: CollectionDialogProps) {
  const [name, setName] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleSave = () => {
    if (!name.trim()) return

    onSave({
      name: name.trim(),
      method,
      url,
      headers,
      body,
    })
    setOpen(false)
    setName("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save to Collection</DialogTitle>
          <DialogDescription>
            Save this request to your collection for future use.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Collection name"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 