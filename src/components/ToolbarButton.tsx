import type { FC } from "react";
import * as React from "react";

import { TOOL_ID } from "../constants.js";
import { useWakeLockApi } from "../hooks/useWakeLockApi.js";
import { WakeLockButton } from "./WakeLockButton.js";

export const ToolbarButton: FC = () => {
  const bind = useWakeLockApi(navigator.wakeLock);

  return <WakeLockButton {...bind} buttonKey={TOOL_ID} />;
};
