import type { VFC } from "react";

import { TOOL_ID } from "../constants";
import { useWakeLockApi } from "../hooks/useWakeLockApi";
import { WakeLockButton } from "./WakeLockButton";

export const ToolbarButton: VFC = () => {
  const bind = useWakeLockApi(navigator.wakeLock);

  return <WakeLockButton {...bind} buttonKey={TOOL_ID} />;
};
