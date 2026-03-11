"use client";

import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/ui/use-dialog";

export function ConfirmDialog({
  title,
  description,
  onConfirm,
}: {
  title: string;
  description?: string;
  onConfirm: () => void;
}) {
  const dialog = useDialog();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>

      {description && <p className="text-muted-foreground">{description}</p>}

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={dialog.close}>
          Cancel
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            onConfirm();
            dialog.close();
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
