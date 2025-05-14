
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// User preferences utilities
export const getUserPreferences = () => {
  const savedPrefs = localStorage.getItem('user-preferences');
  if (!savedPrefs) return {
    emailNotifications: true,
    language: "English",
  };
  
  try {
    return JSON.parse(savedPrefs);
  } catch (error) {
    console.error("Failed to parse user preferences:", error);
    return {
      emailNotifications: true,
      language: "English",
    };
  }
};

export const saveUserPreferences = (preferences: any) => {
  localStorage.setItem('user-preferences', JSON.stringify(preferences));
};
