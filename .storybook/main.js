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
};
