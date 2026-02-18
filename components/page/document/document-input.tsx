"use client";

import { uploadDocumentAction } from "@/actions/document";
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { FileIcon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PageDocumentDataTable({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.ms-excel": [".xls"],
      },
      maxSize: 100 * 1024 * 1024,
      maxFiles: 10,
    },
  });

  const handleSubmit = () => {
    if (dropzone.fileStatuses.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    startTransition(async () => {
      for (const fileStatus of dropzone.fileStatuses) {
        const file = fileStatus.file;

        const toastId = toast.loading(`Uploading ${file.name}...`);

        try {
          const formData = new FormData();
          formData.append("file", file);

          const result = await uploadDocumentAction(formData);

          if (!result.isSuccess) {
            toast.error(`Failed: ${file.name}`, { id: toastId });
            continue;
          }

          toast.success(`Uploaded: ${file.name}`, { id: toastId });
        } catch {
          toast.error(`Unexpected error: ${file.name}`, { id: toastId });
        }
      }
    });
  };

  return (
    <div className="not-prose flex flex-col gap-4 p-5">
      <Dropzone {...dropzone}>
        <div>
          <div className="flex justify-between">
            <DropzoneDescription>
              Please select up to 10 documents (PDF, Excel, DOCX)
            </DropzoneDescription>
            <DropzoneMessage />
          </div>

          <DropZoneArea>
            <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
              <FileIcon className="size-8" />
              <div>
                <p className="font-semibold">Upload documents</p>
                <p className="text-sm text-muted-foreground">
                  Click here or drag and drop to upload
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </div>

        <DropzoneFileList className="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-md bg-secondary p-4 shadow-sm"
              key={file.id}
              file={file}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <FileIcon className="size-6 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm">{file.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <DropzoneRemoveFile
                  variant="ghost"
                  className="shrink-0 hover:outline"
                >
                  <Trash2Icon className="size-4" />
                </DropzoneRemoveFile>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>

      {/* ✅ Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isPending || dropzone.fileStatuses.length === 0}
        className="w-fit"
      >
        {isPending ? "Uploading..." : "Submit"}
      </Button>
    </div>
  );
}
