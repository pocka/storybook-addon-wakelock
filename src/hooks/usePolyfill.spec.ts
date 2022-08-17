import { renderHook } from "@testing-library/react";
import type NoSleep from "nosleep.js";
import { describe, expect, it } from "vitest";

import type { PolyfillState } from "../types/PolyfillState";
import type { State } from "../types/State";
import { usePolyfill } from "./usePolyfill";

// Helper function
function polyfill(state: PolyfillState): State {
  return {
    type: "polyfill_available",
    state,
  };
}

function mockedNoSleep(override: Partial<NoSleep> = {}): NoSleep {
  return {
    _addSourceToVideo() {},
    isEnabled: false,
    async enable() {},
    disable() {},
    ...override,
  };
}

describe("usePolyfill", () => {
  it("Should returns failure state if module loading is failed", async () => {
    const error = new Error("Test Error");
    const promise = Promise.reject(error);
    const { result, rerender, unmount } = renderHook(() => usePolyfill(() => promise));

    expect(result.current.state).toEqual(polyfill({
      type: "loading_module",
    }));

    await promise.catch(() => {});
    rerender();

    expect(result.current.state).toEqual(polyfill({
      type: "failed_to_load_module",
      reason: error,
    }));

    result.current.onClick();
    rerender();

    expect(result.current.state).toEqual(polyfill({
      type: "loading_module",
    }));

    await promise.catch(() => {});
    rerender();

    expect(result.current.state).toEqual(polyfill({
      type: "failed_to_load_module",
      reason: error,
    }));

    unmount();
  });

  it("Happy-path test", async () => {
    const enable = Promise.resolve();
    const nosleep = mockedNoSleep({
      enable() {
        return enable;
      },
    });
    const promise = Promise.resolve(nosleep);
    const { result, rerender, unmount } = renderHook(() => usePolyfill(() => promise));

    await promise;
    rerender();

    expect(result.current.state).toEqual(polyfill({
      type: "idle",
      nosleep,
    }));

    result.current.onClick();
    await enable;
    rerender();

    expect(result.current.state).toEqual(polyfill({
      type: "locking",
      nosleep,
    }));

    result.current.onClick();
    rerender();

    expect(result.current.state).toEqual(polyfill({
      type: "idle",
      nosleep,
    }));

    unmount();
  });

  it("Should returns failure state if calls to `enable` failed", async () => {
    const error = new Error("Sample Error");
    const enable = Promise.reject(error);
    const nosleep = mockedNoSleep({
      enable() {
        return enable;
      },
    });
    const promise = Promise.resolve(nosleep);
    const { result, rerender, unmount } = renderHook(() => usePolyfill(() => promise));

    await promise;
    rerender();

    result.current.onClick();
    await enable.catch(() => {});
    rerender();

    expect(result.current.state).toEqual(polyfill({
      type: "failed_to_lock",
      nosleep,
      reason: error,
    }));

    unmount();
  });
});
