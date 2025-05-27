// Adapted from shadcn/ui toast component
// This file is used to create a toast notification system using React context

import * as React from "react";
// Add relative imports to fix module resolution issues
import { Toast } from "../components/ui/toast";
import {
  useToast as useShadcnToast,
  type ToastProps,
  type ToastActionElement,
  type ToastState
} from "../components/ui/use-toast";

export type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: "default" | "destructive";
};

// Use the shadcn toast hook but with a simpler interface
export function useToast() {
  const shadcnUseToast = useShadcnToast();

  // Wrapper function to simplify the toast API
  function toast({
    title,
    description,
    action,
    variant,
  }: ToastOptions) {
    return shadcnUseToast.toast({
      title,
      description,
      action,
      variant,
    });
  }

  return {
    toast,
    // Forward any dismiss functionality
    dismiss: shadcnUseToast.dismiss,
  };
}