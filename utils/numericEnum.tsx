/**
 * Utility file with helper functions for working with Typescript Enums with numeric members.
 *
 * References:
 * - https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums
 * - https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
 *
 * Typescript Enums with numeric members look like this:
 * enum TestEnum {
 *   FOO,
 *   BAR
 * }
 * They have integer values starting with 0 and incrementing by 1: TestEnum.FOO == 0
 * They have built-in reverse mappings: TestEnum[0] == "FOO"
 */

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
