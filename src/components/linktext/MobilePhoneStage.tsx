"use client";

import { useEffect, useRef, useState } from "react";

const STAGE_W = 1440;
const STAGE_H = 712;
const RADIUS = 22.813;

const SCREENS = [
  {
    src: "/images/linktext/mobile/screen-reading.png",
    alt: "LinkText mobile reading screen with highlighted sentence and translation",
    left: 780.934,
    top: 189.703,
    width: 227.528,
    height: 485.673,
    shadow: "7.204px 7.204px 12.007px 1.201px rgba(0,0,0,0.1)",
    imgStyle: {
      height: "101.36%",
      width: "102.8%",
      left: "-1.53%",
      top: "-1.36%",
    } as const,
  },
  {
    src: "/images/linktext/mobile/screen-review.png",
    alt: "LinkText mobile review screen with grammar cards and Start review",
    left: 606.236,
    top: 98.453,
    width: 227.528,
    height: 492.277,
    shadow: "12.007px 12.007px 7.204px 1.201px rgba(0,0,0,0.1)",
  },
  {
    src: "/images/linktext/mobile/screen-library.png",
    alt: "LinkText mobile library screen with article list",
    left: 412.327,
    top: 36.617,
    width: 227.528,
    height: 492.277,
    shadow: "12.007px 12.007px 67.238px 1.201px rgba(0,0,0,0.1)",
  },
] as const;

export function MobilePhoneStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setScale(Math.min(1, el.clientWidth / STAGE_W));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative overflow-hidden"
        style={{ height: STAGE_H * scale }}
      >
        <div
          className="relative origin-top-left"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="absolute top-0"
            style={{
              left: 134.371,
              width: 1171.258,
              height: STAGE_H,
              backgroundImage: "linear-gradient(to bottom, #ffffff, #fafafa)",
            }}
          />
          {SCREENS.map((screen, index) => (
            <div
              key={screen.src}
              className="absolute"
              style={{
                left: screen.left,
                top: screen.top,
                width: screen.width,
                height: screen.height,
                borderRadius: RADIUS,
                boxShadow: screen.shadow,
                zIndex: index + 1,
              }}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: RADIUS }}
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  width={400}
                  height={844}
                  className="absolute max-w-none"
                  style={
                    "imgStyle" in screen
                      ? screen.imgStyle
                      : {
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
