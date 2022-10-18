import type { FC } from "react";

import { TOOL_ID } from "../constants.js";
import { usePolyfill } from "../hooks/usePolyfill.js";
import { useWakeLockApi } from "../hooks/useWakeLockApi.js";
import { WakeLockButton } from "./WakeLockButton.js";

export const ToolbarButton: FC = () => {
  return "wakeLock" in navigator ? <Native /> : <Polyfill />;
};

const Native: FC = () => {
  const bind = useWakeLockApi(navigator.wakeLock);

  return <WakeLockButton {...bind} buttonKey={TOOL_ID} />;
};

const Polyfill: FC = () => {
  const bind = usePolyfill(() => import("nosleep.js").then(mod => new mod.default()));

  return <WakeLockButton {...bind} buttonKey={TOOL_ID} />;
};
