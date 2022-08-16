import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { State } from "../types/State";
import { useWakeLockApi } from "./useWakeLockApi";

function mockedWakeLockSentinel(override: Partial<WakeLockSentinel> = {}): WakeLockSentinel {
  return {
    async release() {
      return undefined;
    },
    released: false,
    type: "screen",
    onrelease() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
    ...override,
  };
}

describe("useWakeLockApi", () => {
  it("Should returns unavailable state if wakeLock object is undefined", () => {
    // @ts-ignore
    const { result, rerender, unmount } = renderHook(() => useWakeLockApi(undefined));

    expect(result.current.state.type).toBe("unavailable");

    result.current.onClick();
    rerender();

    expect(result.current.state.type).toBe("unavailable");
    unmount();
  });

  it("Should returns idle state if WakeLock API is available", () => {
    const { result, unmount } = renderHook(() =>
      useWakeLockApi({
        async request() {
          return mockedWakeLockSentinel();
        },
      })
    );

    expect(result.current.state).toEqual<State>({
      type: "wakelock_available",
      state: { type: "idle" },
    });
    unmount();
  });

  it("Should returns 'requesting' state while requesting WakeLock", () => {
    const { result, rerender, unmount } = renderHook(() =>
      useWakeLockApi({
        request() {
          return new Promise(() => {});
        },
      })
    );

    result.current.onClick();
    rerender();

    expect(result.current.state).toEqual<State>({
      type: "wakelock_available",
      state: { type: "requesting" },
    });

    unmount();
  });

  it("Should returns locked state when recieved WakeLockSentinel", async () => {
    const releasePromise = Promise.resolve(undefined);
    const sentinel = mockedWakeLockSentinel({
      release() {
        return releasePromise;
      },
    });
    const promise = Promise.resolve(sentinel);

    const { result, rerender, unmount } = renderHook(() =>
      useWakeLockApi({
        request() {
          return promise;
        },
      })
    );

    result.current.onClick();
    await promise;
    rerender();

    expect(result.current.state).toEqual<State>({
      type: "wakelock_available",
      state: {
        type: "locking",
        sentinel,
      },
    });

    result.current.onClick();
    await releasePromise;
    rerender();

    expect(result.current.state).toEqual<State>({
      type: "wakelock_available",
      state: { type: "idle" },
    });

    unmount();
  });

  it("Should returns error state when calls to `request` failed", async () => {
    const error = new Error("Test Error");
    const promise = Promise.reject(error);

    const { result, rerender, unmount } = renderHook(() =>
      useWakeLockApi({
        request() {
          return promise;
        },
      })
    );

    result.current.onClick();
    await promise.catch(err => {});
    rerender();

    expect(result.current.state).toEqual<State>({
      type: "wakelock_available",
      state: {
        type: "failed_to_request",
        reason: error,
      },
    });

    result.current.onClick();
    rerender();

    // Retry
    expect(result.current.state).toEqual<State>({
      type: "wakelock_available",
      state: { type: "requesting" },
    });

    unmount();
  });

  it("Should release on visibilitychange event occurs", async () => {
    const releasePromise = Promise.resolve(undefined);

    const sentinel = mockedWakeLockSentinel({
      release() {
        return releasePromise;
      },
    });
    const promise = Promise.resolve(sentinel);

    const { result, rerender, unmount } = renderHook(() =>
      useWakeLockApi({
        request() {
          return promise;
        },
      })
    );

    result.current.onClick();
    await promise;
    rerender();

    act(() => {
      // @ts-ignore
      document.visibilityState = "visible";
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await releasePromise;
    rerender();

    expect(result.current.state).toEqual<State>({
      type: "wakelock_available",
      state: { type: "idle" },
    });

    unmount();
  });
});
