import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Feature flag to control whether the app should write cookies.
// Set to `false` to disable cookie writes (useful for privacy/testing).
export const ENABLE_COOKIES = false
