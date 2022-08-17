import type NoSleep from "nosleep.js";
import { useCallback, useEffect, useState } from "react";

import type { WakeLockButtonProps } from "../components/WakeLockButton";
import type { State } from "../types/State";

interface PolyfillModuleLoader {
  (): Promise<NoSleep>;
}

export function usePolyfill(loader: PolyfillModuleLoader): Required<Pick<WakeLockButtonProps, "state" | "onClick">> {
  const [moduleLoadingRetry, setModuleLoadingRetry] = useState(0);
  const [state, setState] = useState<State>(() => ({ type: "polyfill_available", state: { type: "loading_module" } }));

  useEffect(() => {
    let cancelled = false;

    setState({
      type: "polyfill_available",
      state: { type: "loading_module" },
    });

    loader().then(nosleep => {
      if (cancelled) {
        return;
      }

      setState({
        type: "polyfill_available",
        state: {
          type: "idle",
          nosleep,
        },
      });
    }).catch(err => {
      if (cancelled) {
        return;
      }

      setState({
        type: "polyfill_available",
        state: {
          type: "failed_to_load_module",
          // @ts-expect-error: TS4.7 ships with wrong type definition for Error class and constructor
          reason: err instanceof Error ? err : new Error(String(err), { cause: err }),
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [moduleLoadingRetry]);

  const onClick = useCallback(async () => {
    if (state.type !== "polyfill_available") {
      return;
    }

    switch (state.state.type) {
      case "failed_to_load_module": {
        setModuleLoadingRetry(Date.now());
        return;
      }
      case "failed_to_lock":
      case "idle": {
        try {
          await state.state.nosleep.enable();

          setState({
            type: "polyfill_available",
            state: {
              type: "locking",
              nosleep: state.state.nosleep,
            },
          });
        } catch (err) {
          setState({
            type: "polyfill_available",
            state: {
              type: "failed_to_lock",
              nosleep: state.state.nosleep,
              // @ts-expect-error: TS4.7 ships with wrong type definition for Error class and constructor
              reason: err instanceof Error ? err : new Error(String(err), { cause: err }),
            },
          });
        }
        return;
      }
      case "locking": {
        try {
          state.state.nosleep.disable();
        } finally {
          setState({
            type: "polyfill_available",
            state: {
              type: "idle",
              nosleep: state.state.nosleep,
            },
          });
        }
        return;
      }
      case "loading_module": {
        // Do nothing
        return;
      }
    }
  }, [state]);

  return { state, onClick };
}
