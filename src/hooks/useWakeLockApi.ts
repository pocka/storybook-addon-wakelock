import { useCallback, useEffect, useState } from "react";

import type { WakeLockButtonProps } from "../components/WakeLockButton";
import type { State } from "../types/State";

export function useWakeLockApi(wakeLock: WakeLock): Required<Pick<WakeLockButtonProps, "state" | "onClick">> {
  const [state, setState] = useState<State>(() =>
    !wakeLock || typeof wakeLock.request !== "function"
      ? { type: "unavailable" }
      : { type: "wakelock_available", state: { type: "idle" } }
  );

  useEffect(() => {
    if (state.type !== "wakelock_available" || state.state.type !== "locking") {
      return;
    }

    const { sentinel } = state.state;

    const onVisibilityChange = async () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      await sentinel.release();

      setState({
        type: "wakelock_available",
        state: {
          type: "idle",
        },
      });
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [state]);

  const onClick = useCallback(async () => {
    if (state.type === "unavailable") {
      return;
    }

    switch (state.state.type) {
      case "idle":
      case "failed_to_request": {
        setState({
          type: "wakelock_available",
          state: { type: "requesting" },
        });

        try {
          const sentinel = await wakeLock.request("screen");

          setState({
            type: "wakelock_available",
            state: {
              type: "locking",
              sentinel,
            },
          });
        } catch (err) {
          setState({
            type: "wakelock_available",
            state: {
              type: "failed_to_request",
              // @ts-expect-error: TS4.7 ships with wrong type definition for Error class and constructor
              reason: err instanceof Error ? err : new Error(String(err), { cause: err }),
            },
          });
        }
        return;
      }
      case "locking": {
        // Ignoring an error because it's hard to describe the "failed to release" state
        await state.state.sentinel.release();

        setState({
          type: "wakelock_available",
          state: { type: "idle" },
        });
        return;
      }
      case "requesting": {
        // Do nothing
        return;
      }
    }
  }, [wakeLock, state]);

  return { state, onClick };
}
