import { afterEach, describe, expect, it, vi } from "vitest";

import { generateUniqueId } from "./generateUniqueId";

describe("generateUniqueId", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should use crypto.randomUUID if available", () => {
    const mockUUID = "123e4567-e89b-12d3-a456-426614174000";

    const spy = vi
      .spyOn(globalThis.crypto, "randomUUID")
      .mockReturnValue(mockUUID);

    const id = generateUniqueId();
    expect(id).toBe(mockUUID);
    expect(spy).toHaveBeenCalled();
  });

  it("should fallback when crypto.randomUUID is not available", () => {
    const originalCrypto = globalThis.crypto;
    // Remove randomUUID only, keep the rest
    Object.defineProperty(globalThis, "crypto", {
      value: {
        ...originalCrypto,
        randomUUID: undefined,
      },
      writable: true,
      configurable: true,
    });

    const id = generateUniqueId();
    expect(typeof id).toBe("string");
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });

  it("should generate different IDs on fallback", () => {
    const originalCrypto = globalThis.crypto;
    Object.defineProperty(globalThis, "crypto", {
      value: {
        ...originalCrypto,
        randomUUID: undefined,
      },
      writable: true,
      configurable: true,
    });

    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(id1).not.toBe(id2);
  });
});
