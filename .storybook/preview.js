import { convert, ThemeProvider, themes } from "@storybook/theming";

export const decorators = [
  Story => (
    <ThemeProvider theme={convert(themes.light)}>
      <Story />
    </ThemeProvider>
  ),
];
