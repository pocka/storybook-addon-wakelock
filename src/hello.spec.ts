import { describe, expect, it } from "vitest";

import hello from "./hello";

describe("Sample Test", () => {
  it("Should pass", () => {
    expect(hello).toBe("BAR!");
  });
});
