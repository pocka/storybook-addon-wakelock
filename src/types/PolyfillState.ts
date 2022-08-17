import type NoSleep from "nosleep.js";

/**
 * Loading polyfill module (NoSleep.js).
 */
interface LoadingModule {
  type: "loading_module";
}

/**
 * Failed to load or initialize the module.
 */
interface FailedToLoadModule {
  type: "failed_to_load_module";

  reason: Error;
}

/**
 * The module is ready and a user can request a lock.
 */
interface Idle {
  type: "idle";

  nosleep: NoSleep;
}

/**
 * The call of `enable` method failed for some reason.
 */
interface FailedToLock {
  type: "failed_to_lock";

  nosleep: NoSleep;

  reason: Error;
}

/**
 * The module is locking the screen.
 */
interface Locking {
  type: "locking";

  nosleep: NoSleep;
}

export type PolyfillState =
  | LoadingModule
  | FailedToLoadModule
  | Idle
  | FailedToLock
  | Locking;
