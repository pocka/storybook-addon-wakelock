/**
 * Either WakeLock API is available, but a user does not activated WakeLock yet.
 */
interface Idle {
  type: "idle";
}

/**
 * A user pressed the addon button and the addon is requesting WakeLock.
 */
interface Requesting {
  type: "requesting";
}

/**
 * An attempt to request WakeLock was failed due to an error.
 */
interface FailedToRequest {
  type: "failed_to_request";

  /**
   * An error object caused this state.
   */
  reason: Error;
}

/**
 * Successfully requested a WakeLock and the system is locking the screen.
 */
interface Locking {
  type: "locking";

  sentinel: WakeLockSentinel;
}

export type WakeLockState =
  | Idle
  | Requesting
  | FailedToRequest
  | Locking;
