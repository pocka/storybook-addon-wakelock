# storybook-addon-wakelock

Storybook Addon that adds a toolbar button to activate/deactivate WakeLock (screen lock).

## Install

This addon is compatible with Storybook v6.5.x.

```sh
$ npm i -D storybook-addon-wakelock
```

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

### Usage with polyfill

For browsers not supporting WakeLock API, you can enable polyfill mode powered by [NoSleep.js](https://github.com/richtr/NoSleep.js).
In order to enable this, you need to install the package and tell the addon to use the package.

```sh
$ npm i -D nosleep.js
```

Once you installed the package to your project, set `polyfill` option to `true` in your `.storybook/main.js`.

```diff
  // .storybook/main.js
  module.exports = {
    // ...
    addons: [
      // ...
-     "storybook-addon-wakelock",
+     {
+       name: "storybook-addon-wakelock",
+       options: {
+         polyfill: true,
+       }
+     },
      // ...
    ]
  }
```

Then you can lock screen on browsers without WakeLock API support.

Beaware that that package archives screen lock by hacky technique, so the functionality may be broken in future browser updates.
Also, due to the package locks screen by playing blank video file with audio enabled, you may suffer an audio glitch or decreased playback quality depends on your system.
