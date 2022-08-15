import type { VFC } from "react";

import { TOOL_ID } from "../constants";
import { WakeLockButton } from "./WakeLockButton";

export const ToolbarButton: VFC = () => {
  // TODO: Implement a state hook
  return <WakeLockButton state={{ type: "unavailable" }} buttonKey={TOOL_ID} />;
};
