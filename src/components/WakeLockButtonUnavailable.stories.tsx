import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import type { State } from "../types/State";

import { WakeLockButton } from "./WakeLockButton.js";

interface Args {
  state: State;
}

export default {
  title: "Components/WakeLockButton",
  argTypes: {
    state: { control: false },
  },
  render({ state }) {
    return <WakeLockButton state={state} />;
  },
} as Meta<Args>;

type Story = StoryObj<Args>;

export const Unavailable: Story = {
  args: {
    state: {
      type: "unavailable",
    },
  },
};
