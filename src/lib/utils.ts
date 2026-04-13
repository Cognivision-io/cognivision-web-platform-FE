import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string) =>
  text?.charAt(0)?.toUpperCase() + text?.slice(1);

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const isValidEmail = (email: string) => emailRegex.test(email.trim());

/** Two-letter initials from a full name (e.g. "Sameer" → "SA", "Ada Lovelace" → "AL"). */
export function initialsFromFullName(name: string | null | undefined): string {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return "U";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    const w = parts[0];
    if (w.length === 1) return w.toUpperCase();
    return `${w.charAt(0)}${w.charAt(w.length - 1)}`.toUpperCase();
  }
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}