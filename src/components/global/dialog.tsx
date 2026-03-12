"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ConfirmDialog } from "../dialog/ConfirmDialog"
import { LoadingDialog } from "../dialog/LoadingDialog"
import { useDialogContext } from "@/app/__provider/dialog-provider"
import { ScrollArea } from "@/components/ui/scroll-area"

export function GlobalDialog() {
  const { dialogs, close } = useDialogContext()

  const dialog = dialogs[dialogs.length - 1]

  if (!dialog) return null

  const Component = dialog.component

  return (
    <Dialog open onOpenChange={() => close(false)}>
      <DialogContent className="max-h-[90vh] p-0">
        {dialog.type === "confirm" && (
          <>
            {dialog.props?.title && (
              <DialogHeader className="p-6 pb-2">
                <DialogTitle>{dialog.props.title}</DialogTitle>
                {dialog.props.description && (
                  <DialogDescription>{dialog.props.description}</DialogDescription>
                )}
              </DialogHeader>
            )}
            <ScrollArea className="max-h-[calc(90vh-8rem)] px-6">
              <ConfirmDialog {...dialog.props} />
            </ScrollArea>
            {dialog.props?.footer && (
              <DialogFooter className="p-6 pt-2">
                {dialog.props.footer}
              </DialogFooter>
            )}
          </>
        )}

        {dialog.type === "loading" && (
          <div className="p-6">
            <LoadingDialog {...dialog.props} />
          </div>
        )}

        {dialog.type === "custom" && Component && (
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6">
              <Component {...dialog.props} />
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}