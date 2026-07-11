import type { ScrollStage } from "@/data/visual-experiment-stages";

export function getUniqueUnityBuilds(stages: ScrollStage[]) {
  const seen = new Set<string>();
  const builds = [];

  for (const stage of stages) {
    if (stage.type !== "unity") continue;
    if (seen.has(stage.build.id)) continue;
    seen.add(stage.build.id);
    builds.push(stage.build);
  }

  return builds;
}

export function getStageBuildId(stage: ScrollStage): string | null {
  return stage.type === "unity" ? stage.build.id : null;
}

export function getBuildOpacity(
  buildId: string,
  stages: ScrollStage[],
  state: {
    activeIndex: number;
    isTransitioning: boolean;
    fromIndex: number;
    toIndex: number;
    progress: number;
  },
): number {
  const { activeIndex, isTransitioning, fromIndex, toIndex, progress } = state;

  if (!isTransitioning) {
    const activeStage = stages[activeIndex];
    return getStageBuildId(activeStage) === buildId ? 1 : 0;
  }

  const fromBuildId = getStageBuildId(stages[fromIndex]);
  const toBuildId = getStageBuildId(stages[toIndex]);

  if (buildId === fromBuildId) return 1 - progress;
  if (buildId === toBuildId) return progress;
  return 0;
}

export function getActiveUnityStage(
  stages: ScrollStage[],
  index: number,
): Extract<ScrollStage, { type: "unity" }> | null {
  const stage = stages[index];
  return stage?.type === "unity" ? stage : null;
}
