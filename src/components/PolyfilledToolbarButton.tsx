import type { FC } from "react";

import { TOOL_ID } from "../constants";
import { usePolyfill } from "../hooks/usePolyfill";
import { useWakeLockApi } from "../hooks/useWakeLockApi";
import { WakeLockButton } from "./WakeLockButton";

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
