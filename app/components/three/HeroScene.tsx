"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useState, useSyncExternalStore } from "react";

const AgentGraph = dynamic(() => import("./AgentGraph"), { ssr: false });

let webglSupport: boolean | undefined;
function supportsWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noopSubscribe = () => () => {};

export function HeroScene() {
  const reduce = useReducedMotion();
  const webgl = useSyncExternalStore(noopSubscribe, supportsWebGL, () => false);
  const [ready, setReady] = useState(false);

  const show3d = webgl && !reduce;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Static backdrop: always present, and the full experience for reduced motion / no WebGL. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_45%,color-mix(in_oklab,var(--color-signal)_16%,transparent),transparent_70%),radial-gradient(40%_40%_at_25%_70%,color-mix(in_oklab,var(--color-aqua)_10%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]" />
      {show3d && (
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}>
          <AgentGraph onReady={() => setReady(true)} />
        </div>
      )}
      {/* Readability scrim behind the headline. */}
      <div className="absolute inset-0 bg-ink/55 lg:bg-transparent lg:bg-[linear-gradient(90deg,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_75%,transparent)_30%,transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
