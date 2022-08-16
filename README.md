# storybook-addon-wakelock

Storybook Addon that adds a toolbar button to activate/deactivate WakeLock (screen lock).

## Install

WIP.

## Usage

Add this addon to `addons` array in your `.storybook/main.js`.

```js
// .storybook/main.js
module.exports = {
  // ...
  addons: ["storybook-addon-wakelock", "@storybook/addon-essentials"],
};
```

You then have a button with lock icon on your Storybook toolbar.
