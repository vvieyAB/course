import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import React from "react"

export function Toaster() {
  // Get toasts from our updated hook
  const { toasts } = useToast();
  
  // Always render the container even if no toasts
  // This prevents layout shifts when toasts appear
  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {Array.isArray(toasts) && toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id || Math.random().toString()} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
    </div>
  )
}
