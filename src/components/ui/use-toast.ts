
import { useToast as useToastHook, toast as toastHook } from "@/hooks/use-toast";

// Re-export with enhanced visibility options
export const useToast = () => {
  const toast = useToastHook();
  
  return {
    ...toast,
    toast: (props) => {
      return toast.toast({
        ...props,
        duration: 5000, // Increase duration for better visibility
      });
    }
  };
};

// Enhanced toast function with better defaults
export const toast = (props) => {
  return toastHook({
    ...props,
    duration: 5000, // Increase duration for better visibility
  });
};
