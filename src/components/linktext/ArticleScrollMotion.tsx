"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ease, tr, type Bezier } from "./fm";

const STAGE_W = 401;
const STAGE_H = 844;
const DURATION = 10.648;
const LOOP = { duration: DURATION, repeat: Infinity };
const EASE_OUT: Bezier = [0.22, 1, 0.36, 1];
const EASE_SCROLL: Bezier = [0.4, 0, 0.2, 1];
const HIGHLIGHT = "#85DDD0";

const ICONS = {
  volume: "/images/linktext/mobile/contextual/volume.svg",
  message: "/images/linktext/mobile/contextual/message-square.svg",
  back: "/images/linktext/mobile/contextual/icon-back.svg",
  dot1: "/images/linktext/mobile/contextual/think-dot-1.svg",
  dot2: "/images/linktext/mobile/contextual/think-dot-2.svg",
  dot3: "/images/linktext/mobile/contextual/think-dot-3.svg",
} as const;

const ARTICLE = `    Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des Kalten Krieges und der Teilung Deutschlands. Errichtet im August 1961, trennte sie Ost - und Westberlin und wurde zu einer fast unuberwindbaren Grenze. Über 100.000 Menschen versuchten, die Mauer zu überwinden - einige schafften es, viele scheiterten tragisch. Die beruhmten Worte von US-Prasident John F. Kennedy ' Ich bin ein Berliner' wurden vor der Mauer gesprochen. Am 9. November 1989 fiel die Mauer friedlich, nachdem ein DDR-Funktionar versehentlich die Grenzöffnung bekannt gab. Heute erinnern nur noch wenige erhaltene Mauerteile und das Denkmal an der Bernauer Straße an diese Zeit. Die East Side Gallery zeigt bunte Graffiti-Kunst auf dem langsten noch stehenden Mauerabschnitt. Für viele Deutsche bleibt der Mauerfall das wichtigste Ereignis der jungeren Geschichte .`;

const HIGHLIGHTS = [
  { left: 0, top: 52, width: 148 },
  { left: 0, top: 26, width: 327 },
  { left: 184, top: 0, width: 143 },
] as const;

function Glyph({ src, size }: { src: string; size: number }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="block max-w-none shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

function ArticleBody({ className }: { className?: string }) {
  return (
    <p
      className={
        className ??
        "min-w-full text-[14px] leading-[26.6px] whitespace-pre-wrap text-black"
      }
    >
      {ARTICLE}
    </p>
  );
}

const scrollTransition = tr({
  ...LOOP,
  times: [0, 0.047, 0.1972, 1],
  ease: ease("linear", EASE_SCROLL, "linear"),
});

const highlightFade = tr({
  ...LOOP,
  times: [0, 0.2629, 0.263, 0.3381, 0.3991, 0.3992],
  ease: ease("linear", "linear", EASE_OUT, "linear", "linear"),
});

export function ArticleScrollMotion() {
  const reduceMotion = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-[401px]">
      <div className="relative" style={{ height: STAGE_H * scale }}>
        <div
          className="relative origin-top-left"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[38px] shadow-[2px_10px_31px_3px_#9898a6]" />
          <div
            data-article-scroll-phone=""
            className="relative isolate h-full w-full overflow-hidden rounded-[38px] bg-white"
          >
            <motion.div
              className="absolute top-0 left-0 z-0 h-[1139px] w-[401px]"
              initial={{ y: 0 }}
              animate={reduceMotion ? { y: -295 } : { y: [0, 0, -295, -295] }}
              transition={reduceMotion ? undefined : scrollTransition}
            >
              <motion.div
                className="absolute top-[249px] left-9 z-0 h-[66px] w-[327px]"
                initial={{ y: 0 }}
                animate={reduceMotion ? { y: 295 } : { y: [0, 0, 295, 295] }}
                transition={reduceMotion ? undefined : scrollTransition}
              >
                {HIGHLIGHTS.map((band) => (
                  <motion.div
                    key={`${band.left}-${band.top}`}
                    className="absolute h-[14px]"
                    style={{
                      left: band.left,
                      top: band.top,
                      width: band.width,
                    }}
                    initial={{ backgroundColor: "rgba(133, 221, 208, 0)" }}
                    animate={
                      reduceMotion
                        ? { backgroundColor: HIGHLIGHT }
                        : {
                            backgroundColor: [
                              "rgba(133, 221, 208, 0)",
                              "rgba(133, 221, 208, 0)",
                              "rgba(133, 221, 208, 0)",
                              HIGHLIGHT,
                              HIGHLIGHT,
                              HIGHLIGHT,
                            ],
                          }
                    }
                    transition={reduceMotion ? undefined : highlightFade}
                  />
                ))}
              </motion.div>

              <div className="absolute top-0 left-0 z-[1] flex h-[1139px] w-[401px] flex-col items-start">
                <div className="flex w-full shrink-0 flex-col items-center px-5 pt-[61px] pb-2">
                  <h2 className="text-center text-[32px] leading-[42px] font-bold tracking-[-0.56px] whitespace-nowrap text-[var(--lt-neutral-800)]">
                    Die Berlin Mauer
                  </h2>
                </div>
                <div className="flex w-full flex-col gap-4 px-9">
                  <ArticleBody />
                  <ArticleBody className="h-[506px] w-[329px] overflow-hidden text-[14px] leading-[26.6px] whitespace-pre-wrap text-black" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-[315px] left-[21.5px] z-20 w-[360px] overflow-hidden rounded-xl"
              style={{
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.07), 0 1px 1.5px rgba(0,0,0,0.06)",
              }}
              initial={{ height: 88, opacity: 0 }}
              animate={
                reduceMotion
                  ? { height: 257, opacity: 1 }
                  : {
                      height: [88, 88, 168, 168, 257, 257],
                      opacity: [0, 0, 1, 1],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      height: {
                        ...LOOP,
                        times: [0, 0.4367, 0.5072, 0.6199, 0.6856, 1],
                        ease: ["linear", EASE_OUT, "linear", EASE_OUT, "linear"],
                      },
                      opacity: {
                        ...LOOP,
                        times: [0, 0.3475, 0.3757, 1],
                        ease: ["linear", EASE_OUT, "linear"],
                      },
                    }
              }
            >
              <div className="absolute top-0 left-0 h-[257px] w-[360px] overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.07)]">
                <div className="absolute top-4 left-4 flex h-7 w-[328px] items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex h-[27px] w-[81px] items-center justify-center gap-1.5 rounded-lg border border-[#eaeaed] bg-white pr-3.5 pl-3">
                      <Glyph src={ICONS.volume} size={14} />
                      <span className="text-xs leading-normal text-[#4b4b5a]">
                        Listen
                      </span>
                    </div>
                    <motion.div
                      className="flex h-[27px] w-[89px] items-center justify-center rounded-lg border pr-3.5 pl-3"
                      initial={{
                        backgroundColor: "#FFF",
                        borderColor: "#EAEAED",
                      }}
                      animate={
                        reduceMotion
                          ? {
                              backgroundColor: "#EAF9F6",
                              borderColor: "#2DB9A0",
                            }
                          : {
                              backgroundColor: [
                                "#FFF",
                                "#FFF",
                                "#FFF",
                                "#EAF9F6",
                                "#EAF9F6",
                                "#EAF9F6",
                              ],
                              borderColor: [
                                "#EAEAED",
                                "#EAEAED",
                                "#EAEAED",
                                "#2DB9A0",
                                "#2DB9A0",
                                "#2DB9A0",
                              ],
                            }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              backgroundColor: {
                                ...LOOP,
                                times: [
                                  0, 0.4037, 0.4038, 0.4226, 0.7137, 0.7138,
                                ],
                                ease: [
                                  "linear",
                                  "linear",
                                  EASE_OUT,
                                  "linear",
                                  "linear",
                                ],
                              },
                              borderColor: {
                                ...LOOP,
                                times: [
                                  0, 0.4037, 0.4038, 0.4226, 0.7137, 0.7138,
                                ],
                                ease: [
                                  "linear",
                                  "linear",
                                  EASE_OUT,
                                  "linear",
                                  "linear",
                                ],
                              },
                            }
                      }
                    >
                      <motion.span
                        className="text-xs leading-normal"
                        initial={{ color: "#4B4B5A" }}
                        animate={
                          reduceMotion
                            ? { color: "#229A85" }
                            : {
                                color: [
                                  "#4B4B5A",
                                  "#4B4B5A",
                                  "#4B4B5A",
                                  "#229A85",
                                  "#229A85",
                                  "#229A85",
                                ],
                              }
                        }
                        transition={
                          reduceMotion
                            ? undefined
                            : {
                                ...LOOP,
                                times: [
                                  0, 0.4037, 0.4038, 0.4226, 0.7137, 0.7138,
                                ],
                                ease: [
                                  "linear",
                                  "linear",
                                  EASE_OUT,
                                  "linear",
                                  "linear",
                                ],
                              }
                        }
                      >
                        Translation
                      </motion.span>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="absolute top-[56px] left-4 flex h-[68px] w-[328px] flex-col gap-1.5 overflow-hidden rounded-xl bg-[#f4f4f6] p-4 text-xs leading-normal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: [0, 0, 1, 1], y: [10, 10, 0, 0] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: {
                            ...LOOP,
                            times: [0, 0.4433, 0.4996, 1],
                            ease: ["linear", EASE_OUT, "linear"],
                          },
                          y: {
                            ...LOOP,
                            times: [0, 0.4433, 0.4996, 1],
                            ease: ["linear", EASE_OUT, "linear"],
                          },
                        }
                  }
                >
                  <p className="text-[#1a1a2a]">
                    (This is a mock translation of a sentence.)
                  </p>
                  <p className="text-[#717182]">Auto translation</p>
                </motion.div>

                <motion.div
                  className="absolute top-[136px] left-4 h-4 w-[328px]"
                  initial={{ y: -80 }}
                  animate={reduceMotion ? { y: 0 } : { y: [-80, -80, 0, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          ...LOOP,
                          times: [0, 0.4367, 0.5072, 1],
                          ease: ["linear", EASE_OUT, "linear"],
                        }
                  }
                >
                  <span className="absolute top-[0.5px] left-0 text-xs leading-normal whitespace-nowrap text-[#4b4b5a]">
                    Ask AI
                  </span>
                  <div className="absolute top-0 left-[44px] size-4">
                    <Glyph src={ICONS.message} size={16} />
                  </div>
                  <motion.div
                    className="absolute top-[-5.5px] left-[68px] flex h-[27px] w-[254px] items-center rounded-lg border px-2.5"
                    initial={{
                      backgroundColor: "#FFF",
                      borderColor: "#EAEAED",
                    }}
                      animate={
                        reduceMotion
                          ? {
                              backgroundColor: "#EAF9F6",
                              borderColor: "#2DB9A0",
                            }
                          : {
                              backgroundColor: [
                                "#FFF",
                                "#FFF",
                                "#FFF",
                                "#EAF9F6",
                                "#EAF9F6",
                                "#EAF9F6",
                              ],
                              borderColor: [
                                "#EAEAED",
                                "#EAEAED",
                                "#EAEAED",
                                "#2DB9A0",
                                "#2DB9A0",
                                "#2DB9A0",
                              ],
                            }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              backgroundColor: {
                                ...LOOP,
                                times: [
                                  0, 0.5681, 0.5682, 0.587, 0.7137, 0.7138,
                                ],
                                ease: [
                                  "linear",
                                  "linear",
                                  EASE_OUT,
                                  "linear",
                                  "linear",
                                ],
                              },
                              borderColor: {
                                ...LOOP,
                                times: [
                                  0, 0.5681, 0.5682, 0.587, 0.7137, 0.7138,
                                ],
                                ease: [
                                  "linear",
                                  "linear",
                                  EASE_OUT,
                                  "linear",
                                  "linear",
                                ],
                              },
                            }
                      }
                    >
                      <motion.span
                        className="text-xs leading-normal font-semibold whitespace-nowrap"
                        initial={{ color: "#4B4B5A" }}
                        animate={
                          reduceMotion
                            ? { color: "#229A85" }
                            : {
                                color: [
                                  "#4B4B5A",
                                  "#4B4B5A",
                                  "#4B4B5A",
                                  "#229A85",
                                  "#229A85",
                                  "#229A85",
                                ],
                              }
                        }
                        transition={
                          reduceMotion
                            ? undefined
                            : {
                                ...LOOP,
                                times: [
                                  0, 0.5681, 0.5682, 0.587, 0.7137, 0.7138,
                                ],
                                ease: [
                                  "linear",
                                  "linear",
                                  EASE_OUT,
                                  "linear",
                                  "linear",
                                ],
                              }
                        }
                      >
                        Grammatical structure of this sentence?
                      </motion.span>
                    </motion.div>
                </motion.div>

                <motion.div
                  className="absolute top-[164px] left-4 flex h-[77px] w-[328px] flex-col overflow-hidden rounded-2xl border border-[#fafafa] bg-[#fafafa] p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: [0, 0, 1, 1], y: [10, 10, 0, 0] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: {
                            ...LOOP,
                            times: [0, 0.7016, 0.7485, 1],
                            ease: ["linear", EASE_OUT, "linear"],
                          },
                          y: {
                            ...LOOP,
                            times: [0, 0.7016, 0.7485, 1],
                            ease: ["linear", EASE_OUT, "linear"],
                          },
                        }
                  }
                >
                  <p className="text-xs leading-normal text-[#4b4b5a]">
                    About this sentence: this is a sample AI answer. In the real
                    app, a detailed AI analysis of the sentence structure appears
                    here.
                  </p>
                </motion.div>

                <motion.div
                  className="absolute top-[164px] left-4 h-[77px] w-[328px] overflow-hidden rounded-2xl border border-[#fafafa] bg-[#fafafa]"
                  initial={{ opacity: 0 }}
                  animate={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: [0, 0, 1, 1, 0, 0] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          ...LOOP,
                          times: [0, 0.6152, 0.6246, 0.6922, 0.7016, 1],
                          ease: [
                            "linear",
                            EASE_OUT,
                            "linear",
                            EASE_OUT,
                            "linear",
                          ],
                        }
                  }
                >
                  {(
                    [
                      {
                        src: ICONS.dot1,
                        left: 144.5,
                        times: [0, 0.6246, 0.6396, 0.6546, 0.6696, 0.6847, 1],
                      },
                      {
                        src: ICONS.dot2,
                        left: 159.5,
                        times: [0, 0.6302, 0.6452, 0.6602, 0.6753, 0.6903, 1],
                      },
                      {
                        src: ICONS.dot3,
                        left: 174.5,
                        times: [0, 0.6358, 0.6508, 0.6659, 0.6809, 0.6959, 1],
                      },
                    ] as const
                  ).map((dot) => (
                    <motion.div
                      key={dot.src}
                      className="absolute top-[34px] size-[7px]"
                      style={{ left: dot.left }}
                      initial={{ opacity: 0.55, y: 0 }}
                      animate={
                        reduceMotion
                          ? { opacity: 0.55, y: 0 }
                          : {
                              opacity: [0.55, 0.55, 1, 0.55, 1, 0.55, 0.55],
                              y: [0, 0, -2, 0, -2, 0, 0],
                            }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: {
                                ...LOOP,
                                times: [...dot.times],
                                ease: [
                                  "linear",
                                  "easeInOut",
                                  "easeInOut",
                                  "easeInOut",
                                  "easeInOut",
                                  "linear",
                                ],
                              },
                              y: {
                                ...LOOP,
                                times: [...dot.times],
                                ease: [
                                  "linear",
                                  "easeInOut",
                                  "easeInOut",
                                  "easeInOut",
                                  "easeInOut",
                                  "linear",
                                ],
                              },
                            }
                      }
                    >
                      <Glyph src={dot.src} size={7} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-0 left-0 z-30 flex h-20 w-[94px] items-center justify-center gap-[5px] rounded px-1.5 py-1"
              initial={{ opacity: 1 }}
              animate={
                reduceMotion ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      ...LOOP,
                      times: [0, 0.047, 0.1972, 1],
                      ease: ["linear", EASE_SCROLL, "linear"],
                    }
              }
            >
              <Glyph src={ICONS.back} size={14} />
              <span className="text-[13px] leading-5 font-medium text-[#717182]">
                Back
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
