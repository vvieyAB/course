import React from 'react';

// Simplified mock toast hook
export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

// Create a client-side-only function for toast
const clientToast = (props: ToastProps) => {
  console.log('Toast:', props.title, props.description);
  // In a real app, this would show a toast notification
  // For now, we'll just log to console
  
  // You could also use browser's built-in notification system
  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      // Request permission if needed
      if (Notification.permission === 'granted') {
        new Notification(props.title || 'Notification', {
          body: props.description,
        });
      }
    } catch (e) {
      console.error('Notification error:', e);
    }
  }
};

export function useToast() {
  return {
    toast: clientToast,
    // Mock empty array for toasts
    toasts: [] as ToastProps[],
    dismiss: (id: string) => console.log('Dismissed toast:', id),
  };
}