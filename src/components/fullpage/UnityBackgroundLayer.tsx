"use client";

import { useEffect, useRef } from "react";
import { UnityWebGLPlayer } from "@/components/unity/UnityWebGLPlayer";
import { useTransitionManager } from "@/components/fullpage/TransitionManager";
import type { ScrollStage } from "@/data/visual-experiment-stages";
import {
  getActiveUnityStage,
  getBuildOpacity,
  getUniqueUnityBuilds,
} from "@/lib/unity-background";
import type { UnityPlayerInstance } from "@/types/unity";

interface UnityBackgroundLayerProps {
  stages: ScrollStage[];
}

export function UnityBackgroundLayer({ stages }: UnityBackgroundLayerProps) {
  const {
    activeIndex,
    fromIndex,
    toIndex,
    progress,
    isTransitioning,
  } = useTransitionManager();

  const instancesRef = useRef<Map<string, UnityPlayerInstance>>(new Map());
  const builds = getUniqueUnityBuilds(stages);

  const transitionState = {
    activeIndex,
    fromIndex,
    toIndex,
    progress,
    isTransitioning,
  };

  useEffect(() => {
    if (isTransitioning) return;

    const stage = getActiveUnityStage(stages, activeIndex);
    if (!stage?.unityScene) return;

    const instance = instancesRef.current.get(stage.build.id);
    if (!instance) return;

    instance.SendMessage(
      stage.unityMessageTarget ?? "SceneController",
      "LoadScene",
      stage.unityScene,
    );
  }, [activeIndex, isTransitioning, stages]);

  return (
    <div className="absolute inset-0 z-[1]" aria-hidden={false}>
      {builds.map((build) => {
        const opacity = getBuildOpacity(build.id, stages, transitionState);
        const isInteractive =
          !isTransitioning &&
          getActiveUnityStage(stages, activeIndex)?.build.id === build.id;

        return (
          <UnityWebGLPlayer
            key={build.id}
            build={build}
            fullscreen
            enableWheelScroll={false}
            layerOpacity={opacity}
            interactive={isInteractive}
            autoReloadMs={build.autoReloadMs}
            onInstanceReady={(instance) => {
              instancesRef.current.set(build.id, instance);
            }}
          />
        );
      })}
    </div>
  );
}
