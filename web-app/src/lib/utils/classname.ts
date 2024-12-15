import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge and normalize classnames.
 * Neccesary part of shadcn-svelte: 
 * https://next.shadcn-svelte.com/docs/migration/svelte-5
 * @param inputs - Class values to merge.
 * @returns A normalized class string.
 */

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
