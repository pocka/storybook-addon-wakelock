import type { FC } from "react";

import { TOOL_ID } from "../constants";
import { useWakeLockApi } from "../hooks/useWakeLockApi";
import { WakeLockButton } from "./WakeLockButton";

export const ToolbarButton: FC = () => {
  const bind = useWakeLockApi(navigator.wakeLock);

  return <WakeLockButton {...bind} buttonKey={TOOL_ID} />;
};
