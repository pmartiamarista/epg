/**
 * Generates a universally unique identifier (UUID) using the Web Cryptography API's crypto.randomUUID().
 * Provides a fallback for environments that do not support crypto.randomUUID()
 * (e.g., older browsers or Node.js versions before v14).
 *
 * @returns {string} A unique ID string.
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
