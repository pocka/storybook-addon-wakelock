import type { Meta, Story } from "@storybook/react";
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
} as Meta<Args>;

const Template: Story<Args> = ({ state }) => <WakeLockButton state={state} />;

export const Unavailable = Template.bind({});
Unavailable.args = {
  state: {
    type: "unavailable",
  },
};
