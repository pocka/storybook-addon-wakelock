import type { PolyfillState } from "./PolyfillState";
import type { WakeLockState } from "./WakeLockState";

/**
 * The platform (browser) does not support WakeLock API or WakeLock API is
 * unavailable at the site (Storybook).
 */
interface Unavailable {
  type: "unavailable";
}

/**
 * The platform (browser) supports WakeLock API and it's available.
 */
interface WakeLockAvailable {
  type: "wakelock_available";

  state: WakeLockState;
}

/**
 * The platform (browser) does not support WakeLock API but polyfill is
 * available.
 */
interface PolyfillAvailable {
  type: "polyfill_available";

  state: PolyfillState;
}

export type State =
  | Unavailable
  | WakeLockAvailable
  | PolyfillAvailable;
