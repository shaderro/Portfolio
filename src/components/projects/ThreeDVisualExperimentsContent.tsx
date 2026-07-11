"use client";

import Link from "next/link";
import {
  FullPageContainer,
  FullPageSection,
} from "@/components/fullpage/FullPageContainer";
import { SectionOverlay } from "@/components/fullpage/SectionOverlay";
import { UnityBackgroundLayer } from "@/components/fullpage/UnityBackgroundLayer";
import { visualExperimentStages } from "@/data/visual-experiment-stages";

export function ThreeDVisualExperimentsContent() {
  const sectionCount = visualExperimentStages.length;

  return (
    <div className="bg-black text-white">
      <div className="pointer-events-none fixed inset-x-0 top-14 z-[60] px-6 py-6 md:px-10">
        <Link
          href="/#selected-work"
          className="pointer-events-auto inline-block text-sm text-neutral-400 transition-colors hover:text-white"
        >
          ← Back
        </Link>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          3D Lab
        </p>
      </div>

      <FullPageContainer sectionCount={sectionCount}>
        <UnityBackgroundLayer stages={visualExperimentStages} />

        {visualExperimentStages.map((stage, index) => (
          <FullPageSection
            key={`${stage.type}-${index}`}
            index={index}
            aria-label={stage.title}
          >
            <SectionOverlay stage={stage} />
          </FullPageSection>
        ))}
      </FullPageContainer>
    </div>
  );
}
