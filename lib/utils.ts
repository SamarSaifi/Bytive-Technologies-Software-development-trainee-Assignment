import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single string.
 * Handles conditional and conflicting class names effectively.
 *
 * @param inputs - Class values to merge (can include strings, arrays, objects, etc.)
 * @returns A single string with merged and deduplicated class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
