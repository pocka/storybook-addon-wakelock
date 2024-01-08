import type { Meta, StoryObj } from "@storybook/react";
import type NoSleep from "nosleep.js";
import * as React from "react";

import type { PolyfillState } from "../types/PolyfillState";
import type { State } from "../types/State";

import { WakeLockButton } from "./WakeLockButton.js";

// Helper function
function polyfill(state: PolyfillState): State {
  return {
    type: "polyfill_available",
    state,
  };
}

const nosleep: NoSleep = {
  async enable() {},
  disable() {},
  isEnabled: false,
  _addSourceToVideo() {},
};

interface Args {
  state: State;
}

export default {
  title: "Components/WakeLockButton/Polyfill",
  argTypes: {
    state: { control: false },
  },
  render({ state }) {
    return <WakeLockButton state={state} />;
  },
} as Meta<Args>;

type Story = StoryObj<Args>;

export const LoadingModule: Story = {
  args: {
    state: polyfill({ type: "loading_module" }),
  },
};

export const FailedToLoadModule: Story = {
  args: {
    state: polyfill({
      type: "failed_to_load_module",
      reason: new Error("Sample Error"),
    }),
  },
};

export const Idle: Story = {
  args: {
    state: polyfill({
      type: "idle",
      nosleep,
    }),
  },
};

export const FailedToLock: Story = {
  args: {
    state: polyfill({
      type: "failed_to_lock",
      nosleep,
      reason: new Error("Sample Error"),
    }),
  },
};

export const Locking: Story = {
  args: {
    state: polyfill({
      type: "locking",
      nosleep,
    }),
  },
};
