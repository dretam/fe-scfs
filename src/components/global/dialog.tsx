"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ConfirmDialog } from "../dialog/ConfirmDialog"
import { LoadingDialog } from "../dialog/LoadingDialog"
import { useDialogContext } from "@/app/__provider/dialog-provider"

export function GlobalDialog() {
  const { dialogs, close } = useDialogContext()

  const dialog = dialogs[dialogs.length - 1]

  if (!dialog) return null

  const Component = dialog.component

  return (
    <Dialog open onOpenChange={() => close(false)}>
      <DialogContent>

        {dialog.type === "confirm" && (
          <ConfirmDialog {...dialog.props} />
        )}

        {dialog.type === "loading" && (
          <LoadingDialog {...dialog.props} />
        )}

        {dialog.type === "custom" && Component && (
          <Component {...dialog.props} />
        )}

      </DialogContent>
    </Dialog>
  )
}