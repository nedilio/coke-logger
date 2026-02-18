"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteLogDialog } from "@/components/delete-log-dialog";
import { toggleCokeLogPrivacyAction } from "@/server/coke-logs";
import { toast } from "sonner";
import type { CokeLog } from "@/db/schemas";

interface CokeLogsTableProps {
  logs: CokeLog[];
}

export function CokeLogsTable({ logs }: CokeLogsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  function handleDeleteClick(logId: string) {
    setSelectedLogId(logId);
    setDeleteDialogOpen(true);
  }

  async function handleTogglePrivacy(logId: string) {
    setTogglingId(logId);
    try {
      await toggleCokeLogPrivacyAction(logId);
      toast.success("Privacy updated");
    } catch (error) {
      console.error("Toggle privacy error:", error);
      toast.error("Failed to update privacy");
    } finally {
      setTogglingId(null);
    }
  }

  if (logs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>Your latest Coke log entries</CardDescription>
        </CardHeader>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">
            No entries yet. Add your first Coke!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>
            Showing {logs.length} most recent {logs.length === 1 ? "entry" : "entries"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Consumed</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium capitalize">
                    {log.cokeType}
                  </TableCell>
                  <TableCell className="capitalize">{log.format}</TableCell>
                  <TableCell>{log.sizeML}ml</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(log.consumedAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePrivacy(log.id)}
                      disabled={togglingId === log.id}
                      className="h-8 w-8 p-0"
                    >
                      {log.isPublic ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {log.isPublic ? "Make private" : "Make public"}
                      </span>
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          toast.info("Edit feature coming soon!");
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(log.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedLogId && (
        <DeleteLogDialog
          logId={selectedLogId}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </>
  );
}
