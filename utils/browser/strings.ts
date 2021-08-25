/**
 * Utility file for helper functions related to strings.
 */

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
