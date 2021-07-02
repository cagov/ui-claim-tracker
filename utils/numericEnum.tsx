type NumericEnum = { [key: number]: string }

/**
 * Get the number of elements in a numeric enum.
 *
 * Numeric enums have twice the number of elements because they provide
 * reverse lookups.
 */
export function getNumericEnumLength(enumme: NumericEnum): number {
  return Object.keys(enumme).length / 2
}

/**
 * Generate an array of incrementing numbers.
 */
export function getNumericEnumKeys(enumme: NumericEnum): number[] {
  return Array.from(Array(getNumericEnumLength(enumme)).keys())
}
