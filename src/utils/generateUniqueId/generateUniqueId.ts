/**
 * Generates a universally unique identifier (UUID) using the Web Cryptography API's crypto.randomUUID().
 * Provides a fallback for environments that do not support crypto.randomUUID()
 * (e.g., older browsers or Node.js versions before v14).
 *
 * This function is used throughout the EPG application to generate unique identifiers
 * for programs, channels, and other entities that require unique IDs.
 *
 * @returns A unique ID string in UUID format (e.g., "550e8400-e29b-41d4-a716-446655440000")
 *
 * @example
 * ```typescript
 * // Generate unique ID for a program
 * const programId = generateUniqueId();
 * // Returns: "550e8400-e29b-41d4-a716-446655440000"
 *
 * // Use in program creation
 * const newProgram = {
 *   id: generateUniqueId(),
 *   title: "Evening News",
 *   start: Date.now(),
 *   end: Date.now() + 3600000
 * };
 * ```
 */
export const generateUniqueId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    // Fallback for environments that don't support crypto.randomUUID()
    // This method is less cryptographically secure but widely compatible.

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
};
