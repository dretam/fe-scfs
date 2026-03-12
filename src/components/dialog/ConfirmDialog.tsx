"use client"

import { Button } from "@/components/ui/button"
import { useDialog } from "@/hooks/ui/use-dialog"

export function ConfirmDialog({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  const dialog = useDialog()

  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">{title}</h2>

      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}

      <div className="flex justify-end gap-2">

        <Button
          variant="outline"
          onClick={() => dialog.close(false)}
        >
          Cancel
        </Button>

        <Button
          onClick={() => dialog.close(true)}
        >
          Confirm
        </Button>

      </div>

    </div>
  )
}