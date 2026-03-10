"use client";

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import { useDocumentList } from "../../api";
import * as React from "react";
import { documentListColumns } from "@/features/document/components/list/column-table";
import { DocumentResponse } from "../../types";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  deleteDocumentAction,
  destroyDocumentAction,
} from "@/features/document/api/document";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import PageDocumentListFilterTable from "@/features/document/components/list/filter-table";

export function PageDocumentListTable({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();

  const request = React.useMemo(
    () => ({
      page: Number(searchParams.get("page") ?? 1),
      perPage: Number(searchParams.get("perPage") ?? 10),
      filter: searchParams.get("filter"),
    }),
    [searchParams],
  );

  const { data: response, isLoading, isError } = useDocumentList(request);

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
  const [selectedDocument, setSelectedDocument] =
    React.useState<DocumentResponse | null>(null);
  const [isHardDelete, setIsHardDelete] = React.useState(false);

  const handleView = (document: DocumentResponse) => {
    setSelectedDocument(document);
    setIsDetailsDialogOpen(true);
  };

  const handleDelete = (document: DocumentResponse) => {
    setSelectedDocument(document);
    setIsHardDelete(false);
    setIsDeleteDialogOpen(true);
  };

  const handleHardDelete = (document: DocumentResponse) => {
    setSelectedDocument(document);
    setIsHardDelete(true);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDocument) return;

    if (isHardDelete) {
      const result = await destroyDocumentAction(selectedDocument.id);
      if (result.success) {
        toast.success("Document permanently deleted");
      } else {
        toast.error("Failed to delete document");
      }
    } else {
      const result = await deleteDocumentAction(selectedDocument.id);
      if (result.success) {
        toast.success("Document soft deleted");
      } else {
        toast.error("Failed to delete document");
      }
    }

    setIsDeleteDialogOpen(false);
    setSelectedDocument(null);
    // Refetch the list
    window.location.reload();
  };

  const columns = React.useMemo(
    () => documentListColumns({ onView: handleView, onDelete: handleDelete }),
    [],
  );

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${bytes} B`;
  };

  return (
    <div className={className} {...props}>
      <div className="flex justify-between items-center mb-4">
        <PageDocumentListFilterTable className="my-0" />
        <Button
          onClick={() => toast.info("Upload document - use the form above")}
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}

      {isError && <div>Something went wrong.</div>}

      {!isLoading && response?.success && (
        <>
          <DataTable
            data={response.data}
            columns={columns}
            pagination={response.pagination}
          />

          {/* Details Dialog */}
          <Dialog
            open={isDetailsDialogOpen}
            onOpenChange={setIsDetailsDialogOpen}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Document Details</DialogTitle>
              </DialogHeader>
              {selectedDocument && (
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-12 w-12" />
                    <div>
                      <p className="font-semibold">
                        {selectedDocument.originalName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedDocument.filename}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">File Size</p>
                      <p className="font-medium">
                        {formatFileSize(selectedDocument.fileSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">MIME Type</p>
                      <p className="font-medium">{selectedDocument.mimeType}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">File Path</p>
                    <p className="font-mono text-sm">
                      {selectedDocument.filePath}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Uploaded By
                      </p>
                      <p className="font-medium">
                        User ID: {selectedDocument.uploadedBy}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">User ID</p>
                      <p className="font-medium">{selectedDocument.userId}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Created At
                      </p>
                      <p className="font-medium">
                        {new Date(
                          selectedDocument.createdAt ?? "",
                        ).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Updated At
                      </p>
                      <p className="font-medium">
                        {selectedDocument.updatedAt
                          ? new Date(selectedDocument.updatedAt).toLocaleString(
                              "id-ID",
                            )
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {selectedDocument.deletedAt && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Deleted At
                      </p>
                      <p className="font-medium text-red-500">
                        {new Date(selectedDocument.deletedAt).toLocaleString(
                          "id-ID",
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isHardDelete
                    ? "Permanently Delete Document?"
                    : "Soft Delete Document?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isHardDelete
                    ? "This action cannot be undone. This will permanently delete the document from the database."
                    : "This will soft delete the document. The document will be marked as deleted but can be recovered."}
                  {selectedDocument && (
                    <span className="mt-2 font-medium">
                      Document: {selectedDocument.originalName}
                    </span>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer bg-red-500"
                  onClick={confirmDelete}
                >
                  {isHardDelete ? "Permanently Delete" : "Soft Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
