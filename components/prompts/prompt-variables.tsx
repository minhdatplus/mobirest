"use client";

import { usePromptEditor } from "@/lib/hooks/use-prompt-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Variable } from "@/lib/db/schema";

export function PromptVariables() {
  const { activePrompt, variables, addVariable, updateVariable, deleteVariable } = usePromptEditor();

  if (!activePrompt) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Variables</h3>
        <Button size="sm" onClick={() => addVariable()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Variable
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default Value</TableHead>
            <TableHead>Required</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables?.map((variable) => (
            <TableRow key={variable.id}>
              <TableCell>
                <Input
                  value={variable.name}
                  onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                  className="h-8"
                />
              </TableCell>
              <TableCell>
                <Select
                  value={variable.type}
                  onValueChange={(value) => updateVariable(variable.id, { type: value })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  value={variable.defaultValue || ''}
                  onChange={(e) => updateVariable(variable.id, { defaultValue: e.target.value })}
                  className="h-8"
                />
              </TableCell>
              <TableCell>
                <Select
                  value={variable.isRequired ? "yes" : "no"}
                  onValueChange={(value) => updateVariable(variable.id, { isRequired: value === "yes" })}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteVariable(variable.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 