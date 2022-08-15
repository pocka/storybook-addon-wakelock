import { addons, types } from "@storybook/addons";

import { ToolbarButton } from "./components/ToolbarButton";
import { ADDON_ID, TOOL_ID } from "./constants";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "WakeLock",
    match({ viewMode }) {
      return /^(story|docs)$/.test(viewMode || "");
    },
    render() {
      return <ToolbarButton />;
    },
  });
});
