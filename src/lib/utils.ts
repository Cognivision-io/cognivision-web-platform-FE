import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string) =>
  text?.charAt(0)?.toUpperCase() + text?.slice(1);

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const isValidEmail = (email: string) => emailRegex.test(email.trim());
