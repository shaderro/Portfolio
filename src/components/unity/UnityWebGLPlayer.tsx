"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { UnityBuild } from "@/data/unity-builds";
import type { UnityPlayerInstance } from "@/types/unity";

interface UnityLoaderConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
}

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: UnityLoaderConfig,
      onProgress?: (progress: number) => void,
    ) => Promise<UnityPlayerInstance>;
  }
}

interface UnityWebGLPlayerProps {
  build: UnityBuild;
  className?: string;
  fullscreen?: boolean;
  enableWheelScroll?: boolean;
  layerOpacity?: number;
  interactive?: boolean;
  autoReloadMs?: number;
  onInstanceReady?: (instance: UnityPlayerInstance) => void;
}

function buildAssetUrls(
  buildPath: string,
  buildName: string,
  compression: UnityBuild["compression"] = "none",
) {
  const suffix =
    compression === "gzip"
      ? { data: ".data.gz", framework: ".framework.js.gz", wasm: ".wasm.gz" }
      : compression === "brotli"
        ? { data: ".data.br", framework: ".framework.js.br", wasm: ".wasm.br" }
        : { data: ".data", framework: ".framework.js", wasm: ".wasm" };

  return {
    dataUrl: `${buildPath}/${buildName}${suffix.data}`,
    frameworkUrl: `${buildPath}/${buildName}${suffix.framework}`,
    codeUrl: `${buildPath}/${buildName}${suffix.wasm}`,
  };
}

function loadUnityLoader(loaderUrl: string): Promise<void> {
  if (window.createUnityInstance) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${loaderUrl}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Unity loader failed")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unity loader failed"));
    document.body.appendChild(script);
  });
}

export function UnityWebGLPlayer({
  build,
  className,
  fullscreen = false,
  enableWheelScroll = true,
  layerOpacity = 1,
  interactive = true,
  autoReloadMs,
  onInstanceReady,
}: UnityWebGLPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<UnityPlayerInstance | null>(null);
  const onInstanceReadyRef = useRef(onInstanceReady);
  const [reloadKey, setReloadKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    onInstanceReadyRef.current = onInstanceReady;
  }, [onInstanceReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    const buildPath = `/unity/${build.id}/Build`;
    const loaderUrl = `${buildPath}/${build.buildName}.loader.js`;
    const assetUrls = buildAssetUrls(
      buildPath,
      build.buildName,
      build.compression,
    );

    setStatus("loading");
    setProgress(0);
    setErrorMessage(null);

    const startInstance = async () => {
      try {
        await loadUnityLoader(loaderUrl);
        if (cancelled || !window.createUnityInstance) return;

        const instance = await window.createUnityInstance(
          canvas,
          {
            ...assetUrls,
            streamingAssetsUrl: "StreamingAssets",
            companyName: "Portfolio",
            productName: build.buildName,
            productVersion: "1.0",
          },
          (value) => {
            if (!cancelled) setProgress(Math.round(value * 100));
          },
        );

        if (cancelled) {
          await instance.Quit();
          return;
        }

        instanceRef.current = instance;
        setStatus("ready");
        onInstanceReadyRef.current?.(instance);
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unity build failed to load.",
          );
        }
      }
    };

    void startInstance();

    return () => {
      cancelled = true;
      instanceRef.current?.Quit().catch(() => undefined);
      instanceRef.current = null;
    };
  }, [build.id, build.buildName, build.compression, reloadKey]);

  useEffect(() => {
    if (!autoReloadMs || !interactive || status !== "ready") return;

    const timer = window.setTimeout(() => {
      void (async () => {
        const instance = instanceRef.current;
        instanceRef.current = null;
        if (instance) {
          await instance.Quit().catch(() => undefined);
        }
        setReloadKey((key) => key + 1);
      })();
    }, autoReloadMs);

    return () => window.clearTimeout(timer);
  }, [autoReloadMs, interactive, status, reloadKey]);

  useEffect(() => {
    if (!enableWheelScroll) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      window.scrollBy({
        top: event.deltaY,
        left: event.deltaX,
        behavior: "auto",
      });
      event.preventDefault();
      event.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [enableWheelScroll]);

  const isVisible = layerOpacity > 0.01;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-black",
        fullscreen
          ? "h-full w-full border-0"
          : "rounded-lg border border-border bg-neutral-950",
        className,
      )}
      style={{
        opacity: layerOpacity,
        pointerEvents: interactive && isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        willChange: "opacity",
      }}
      aria-hidden={!isVisible}
    >
      <div
        ref={containerRef}
        className={cn("relative h-full w-full", !fullscreen && "aspect-video")}
      >
        <canvas
          ref={canvasRef}
          id={`unity-canvas-${build.id}`}
          className={cn(
            "h-full w-full",
            status !== "ready" && "invisible",
          )}
        />

        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center">
            <p className="text-sm text-neutral-400">Loading Unity…</p>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full bg-white transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-mono text-xs text-neutral-500">{progress}%</p>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 px-6">
            <p className="max-w-md text-center text-sm leading-relaxed text-neutral-400">
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
