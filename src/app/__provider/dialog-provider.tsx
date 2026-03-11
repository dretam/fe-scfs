"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType,
} from "react"

type DialogType = "confirm" | "custom" | "loading"

interface DialogItem {
  id: number
  type: DialogType
  component?: ComponentType<any>
  props?: any
  resolve?: (value: any) => void
}

interface DialogContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>
  form: <T = any>(
    component: ComponentType<any>,
    props?: any
  ) => Promise<T | undefined>
  loading: (message?: string) => void
  close: (value?: any) => void
  dialogs: DialogItem[]
}

interface ConfirmOptions {
  title: string
  description?: string
}

const DialogContext = createContext<DialogContextType | null>(null)

let dialogId = 0

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialogs, setDialogs] = useState<DialogItem[]>([])

  const push = (dialog: DialogItem) => {
    setDialogs((prev) => [...prev, dialog])
  }

  const close = (value?: any) => {
    setDialogs((prev) => {
      const last = prev[prev.length - 1]

      if (last?.resolve) {
        last.resolve(value)
      }

      return prev.slice(0, -1)
    })
  }

  const confirm = (options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      push({
        id: ++dialogId,
        type: "confirm",
        props: options,
        resolve,
      })
    })
  }

  const form = <T = any>(
    component: ComponentType<any>,
    props?: any
  ) => {
    return new Promise<T | undefined>((resolve) => {
      push({
        id: ++dialogId,
        type: "custom",
        component,
        props,
        resolve,
      })
    })
  }

  const loading = (message?: string) => {
    push({
      id: ++dialogId,
      type: "loading",
      props: { message },
    })
  }

  return (
    <DialogContext.Provider
      value={{
        confirm,
        form,
        loading,
        close,
        dialogs,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export function useDialogContext() {
  const ctx = useContext(DialogContext)

  if (!ctx) {
    throw new Error("useDialog must be used inside DialogProvider")
  }

  return ctx
}