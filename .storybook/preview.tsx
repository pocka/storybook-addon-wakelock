import type { Decorator } from "@storybook/react";
import { convert, ThemeProvider, themes } from "@storybook/theming";
import * as React from "react";

export const decorators: readonly Decorator[] = [
  Story => (
    <ThemeProvider theme={convert(themes.light)}>
      <Story />
    </ThemeProvider>
  ),
];
