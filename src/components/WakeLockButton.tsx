import { IconButton, Icons } from "@storybook/components";
import type { IconKey } from "@storybook/components";
import type { VFC } from "react";

import type { State } from "../types/State";

function getIconName(state: State): IconKey {
  switch (state.type) {
    case "unavailable":
      return "unlock";

    case "wakelock_available": {
      switch (state.state.type) {
        case "locking":
        case "requesting":
          return "lock";
        default:
          return "unlock";
      }
    }
  }
}

function shouldDisableButton(state: State): boolean {
  switch (state.type) {
    case "unavailable":
      return true;
    case "wakelock_available": {
      switch (state.state.type) {
        case "requesting":
          return true;
        default:
          return false;
      }
    }
  }
}

function getButtonTitle(state: State): string {
  switch (state.type) {
    case "unavailable":
      return "WakeLock API is not available on this platform";
    case "wakelock_available": {
      switch (state.state.type) {
        case "failed_to_request":
          return `Failed to request a WakeLock (Press again to retry): ${state.state.reason.message}`;
        case "idle":
          return "Lock screen using WakeLock API";
        case "locking":
          return "Release screen lock";
        case "requesting":
          return "Requesting screen lock using WakeLock API";
      }
    }
  }
}

function shouldActivateButton(state: State): boolean {
  switch (state.type) {
    case "unavailable":
      return false;
    case "wakelock_available": {
      switch (state.state.type) {
        case "locking":
          return true;
        default:
          return false;
      }
    }
  }
}

export interface WakeLockButtonProps {
  state: State;

  buttonKey?: string;

  onClick?(): void;
}

export const WakeLockButton: VFC<WakeLockButtonProps> = ({ buttonKey, state, onClick }) => {
  return (
    <IconButton
      key={buttonKey}
      title={getButtonTitle(state)}
      active={shouldActivateButton(state)}
      disabled={shouldDisableButton(state)}
      onClick={onClick}
    >
      <Icons icon={getIconName(state)} />
    </IconButton>
  );
};
