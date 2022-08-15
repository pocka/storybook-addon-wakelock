import { convert, ThemeProvider, themes } from "@storybook/theming";
import { create } from "react-test-renderer";
import { describe, expect, it } from "vitest";

import type { State } from "../types/State";

import { WakeLockButton } from "./WakeLockButton";

function render(state: State) {
  return create(
    <ThemeProvider theme={convert(themes.light)}>
      <WakeLockButton state={state} />
    </ThemeProvider>,
  );
}

describe("Unavailable", () => {
  it("Should disable the button", () => {
    const { root } = render({ type: "unavailable" });

    expect(root.findByType("button").props.disabled).toBe(true);
  });
});

describe("WakeLockAvailable", () => {
  describe("Requesting", () => {
    it("Should disabled the button", () => {
      const { root } = render({ type: "wakelock_available", state: { type: "requesting" } });

      expect(root.findByType("button").props.disabled).toBe(true);
    });
  });

  describe("FailedToRequest", () => {
    it("Should not disable the button", () => {
      const { root } = render({
        type: "wakelock_available",
        state: { type: "failed_to_request", reason: new Error("Test Error") },
      });

      expect(root.findByType("button").props.disabled).not.toBe(true);
    });

    it("Should include error message in a title attribute", () => {
      const error = new Error("Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch");

      const { root } = render({ type: "wakelock_available", state: { type: "failed_to_request", reason: error } });

      expect(root.findByType("button").props.title).toContain(error.message);
    });
  });
});
