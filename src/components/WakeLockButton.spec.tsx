import { convert, ThemeProvider, themes } from "@storybook/theming";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import type { State } from "../types/State";

import { WakeLockButton } from "./WakeLockButton";

function renderButton(state: State) {
  return render(
    <ThemeProvider theme={convert(themes.light)}>
      <WakeLockButton state={state} />
    </ThemeProvider>,
  );
}

afterEach(() => {
  cleanup();
});

describe("Unavailable", () => {
  it("Should disable the button", () => {
    const { getByRole } = renderButton({ type: "unavailable" });

    expect(getByRole("button").hasAttribute("disabled")).toBe(true);
  });
});

describe("WakeLockAvailable", () => {
  describe("Requesting", () => {
    it("Should disabled the button", () => {
      const { getByRole } = renderButton({ type: "wakelock_available", state: { type: "requesting" } });

      expect(getByRole("button").hasAttribute("disabled")).toBe(true);
    });
  });

  describe("FailedToRequest", () => {
    it("Should not disable the button", () => {
      const { getByRole } = renderButton({
        type: "wakelock_available",
        state: { type: "failed_to_request", reason: new Error("Test Error") },
      });

      expect(getByRole("button").hasAttribute("disabled")).toBe(false);
    });

    it("Should include error message in a title attribute", () => {
      const error = new Error("Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch");

      const { getByRole } = renderButton({
        type: "wakelock_available",
        state: { type: "failed_to_request", reason: error },
      });

      expect(getByRole("button").getAttribute("title")).toContain(error.message);
    });
  });
});

describe("PolyfillAvailable", () => {
  describe("LoadingModule", () => {
    it("Should disable the button", () => {
      const { getByRole } = renderButton({ type: "polyfill_available", state: { type: "loading_module" } });

      expect(getByRole("button").hasAttribute("disabled")).toBe(true);
    });
  });
});
