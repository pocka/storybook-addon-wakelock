import type { Meta, Story } from "@storybook/react";
import type NoSleep from "nosleep.js";

import type { PolyfillState } from "../types/PolyfillState";
import type { State } from "../types/State";

import { WakeLockButton } from "./WakeLockButton";

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
} as Meta<Args>;

const Template: Story<Args> = ({ state }) => <WakeLockButton state={state} />;

export const LoadingModule = Template.bind({});
LoadingModule.args = {
  state: polyfill({ type: "loading_module" }),
};

export const FailedToLoadModule = Template.bind({});
FailedToLoadModule.args = {
  state: polyfill({
    type: "failed_to_load_module",
    reason: new Error("Sample Error"),
  }),
};

export const Idle = Template.bind({});
Idle.args = {
  state: polyfill({
    type: "idle",
    nosleep,
  }),
};

export const FailedToLock = Template.bind({});
FailedToLock.args = {
  state: polyfill({
    type: "failed_to_lock",
    nosleep,
    reason: new Error("Sample Error"),
  }),
};

export const Locking = Template.bind({});
Locking.args = {
  state: polyfill({
    type: "locking",
    nosleep,
  }),
};
