import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge/es5";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}
