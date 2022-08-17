import { IconButton, Icons } from "@storybook/components";
import type { IconKey } from "@storybook/components";
import type { FC } from "react";

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

    case "polyfill_available": {
      switch (state.state.type) {
        case "locking":
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
    case "polyfill_available": {
      switch (state.state.type) {
        case "loading_module":
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
    case "polyfill_available": {
      switch (state.state.type) {
        case "failed_to_load_module":
          return `Failed to load polyfill module (Press again to retry): ${state.state.reason.message}`;
        case "failed_to_lock":
          return `Failed to lock the screen (Press again to retry): ${state.state.reason.message}`;
        case "idle":
          return "Lock screen using a polyfill module";
        case "loading_module":
          return "Loading WakeLock API polyfill module";
        case "locking":
          return "Release screen lock";
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
    case "polyfill_available": {
      return state.state.type === "locking";
    }
  }
}

export interface WakeLockButtonProps {
  state: State;

  buttonKey?: string;

  onClick?(): void;
}

export const WakeLockButton: FC<WakeLockButtonProps> = ({ buttonKey, state, onClick }) => {
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
