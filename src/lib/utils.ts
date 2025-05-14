
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Theme related utilities
export const getThemePreference = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme-preference');
  return (savedTheme === 'dark') ? 'dark' : 'light';
};

export const setThemePreference = (theme: 'light' | 'dark'): void => {
  localStorage.setItem('theme-preference', theme);
  applyTheme(theme);
};

export const applyTheme = (theme: 'light' | 'dark'): void => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// User preferences utilities
export const getUserPreferences = () => {
  const savedPrefs = localStorage.getItem('user-preferences');
  if (!savedPrefs) return {
    emailNotifications: true,
    darkMode: getThemePreference() === 'dark',
    language: "English",
    twoFactorAuth: false,
  };
  
  try {
    return JSON.parse(savedPrefs);
  } catch (error) {
    console.error("Failed to parse user preferences:", error);
    return {
      emailNotifications: true,
      darkMode: getThemePreference() === 'dark',
      language: "English",
      twoFactorAuth: false,
    };
  }
};

export const saveUserPreferences = (preferences: any) => {
  localStorage.setItem('user-preferences', JSON.stringify(preferences));
};
