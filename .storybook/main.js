const ResolveTypescriptPlugin = require("resolve-typescript-plugin");

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
  webpackFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          ...(config.resolve.plugins || []),
          new ResolveTypescriptPlugin(),
        ],
      },
    };
  },
};
