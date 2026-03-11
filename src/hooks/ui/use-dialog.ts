"use client"

import { useDialogContext } from "@/app/__provider/dialog-provider"


export function useDialog() {
  return useDialogContext()
}