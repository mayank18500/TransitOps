/**
 * Utility to merge CSS class names.
 * Filter out falsy values and join classes with spaces.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
