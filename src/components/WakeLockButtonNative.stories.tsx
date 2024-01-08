import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import type { State } from "../types/State";
import type { WakeLockState } from "../types/WakeLockState";

import { WakeLockButton } from "./WakeLockButton.js";

// Helper function
function wakelock(state: WakeLockState): State {
  return {
    type: "wakelock_available",
    state,
  };
}

interface Args {
  state: State;
}

export default {
  title: "Components/WakeLockButton/WakeLock API",
  argTypes: {
    state: { control: false },
  },
  render({ state }) {
    return <WakeLockButton state={state} />;
  },
} as Meta<Args>;

type Story = StoryObj<Args>;

export const Idle: Story = {
  args: {
    state: wakelock({
      type: "idle",
    }),
  },
};

export const Requesting: Story = {
  args: {
    state: wakelock({
      type: "requesting",
    }),
  },
};

export const FailedToRequest: Story = {
  args: {
    state: wakelock({
      type: "failed_to_request",
      reason: new Error("Sample Error"),
    }),
  },
};

export const Locking: Story = {
  args: {
    state: wakelock({
      type: "locking",
      sentinel: {
        released: false,
        type: "screen",
        async release() {
          return undefined;
        },
        onrelease() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      },
    }),
  },
};
