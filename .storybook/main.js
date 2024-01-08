module.exports = {
  stories: [
    "../src/**/*.stories.tsx",
  ],

  addons: [{
    name: "../preset.js",
    options: {
      polyfill: true,
    },
  }, "@storybook/addon-essentials"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: false,
  },

  core: {
    disableTelemetry: true,
  },
};
