import type { Meta, Story } from "@storybook/react";
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
} as Meta<Args>;

const Template: Story<Args> = ({ state }) => <WakeLockButton state={state} />;

export const Idle = Template.bind({});
Idle.args = {
  state: wakelock({
    type: "idle",
  }),
};

export const Requesting = Template.bind({});
Requesting.args = {
  state: wakelock({
    type: "requesting",
  }),
};

export const FailedToRequest = Template.bind({});
FailedToRequest.args = {
  state: wakelock({
    type: "failed_to_request",
    reason: new Error("Sample Error"),
  }),
};

export const Locking = Template.bind({});
Locking.args = {
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
};
