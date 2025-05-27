import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Feedback helper functions
export const showSuccessToast = (message: string) => {
  toast({
    title: "Success!",
    description: message,
    variant: "default",
    duration: 3000,
  });
};

export const showErrorToast = (message: string) => {
  toast({
    title: "Oops!",
    description: message,
    variant: "destructive",
    duration: 5000,
  });
};

export const showProgressToast = (message: string) => {
  toast({
    title: "Making Progress!",
    description: message,
    variant: "default",
    duration: 3000,
  });
};
