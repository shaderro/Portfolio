"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { InlineNote } from "./product";

const DURATION = 7;
const LOOP = { duration: DURATION, repeat: Infinity } as const;
const SOFT = [0.25, 0.1, 0.25, 1] as const;

function ArticleP1({
  word = <span>unuberwindbaren</span>,
}: {
  word?: ReactNode;
}) {
  return (
    <>
      Die Berliner <span className="text-black">Mauer</span> war mehr als 28{" "}
      Jahre lang das Symbol des Kalten Krieges und der Teilung Deutschlands.
      Errichtet im August 1961, trennte sie Ost - und Westberlin und wurde zu
      einer fast {word} Grenze. Über 100.000 Menschen versuchten, die Mauer zu
      überwinden - einige schafften es, viele scheiterten tragisch. Die
      berühmten Worte von US-Präsident John F. Kennedy &apos; Ich bin ein
      Berliner&apos; wurden vor der Mauer gesprochen. Am 9. November 1989 fiel
      die Mauer friedlich, nachdem ein DDR-Funktionär versehentlich die
      Grenzöffnung bekannt gab . Heute erinnern nur noch wenige erhaltene
      Mauerteile und das Denkmal an der Bernauer Straße an diese Zeit. Die East
      Side Gallery zeigt bunte Graffiti-Kunst auf dem langsten noch stehenden
      Mauerabschnitt. Für viele Deutsche bleibt der Mauerfall das wichtigste
      Ereignis der jüngeren Geschichte .
    </>
  );
}

const ARTICLE_P2 = `Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des Kalten Krieges und der Teilung Deutschlands. Errichtet im August 1961, trennte sie Ost - und Westberlin und wurde zu einer fast unüberwindbaren Grenze. Über 100.000 Menschen versuchten, die Mauer zu überwinden - einige schafften es, viele scheiterten tragisch. Die berühmten Worte von US-Präsident John F. Kennedy ' Ich bin ein Berliner' wurden vor der Mauer gesprochen. Am 9. November 1989 fiel die Mauer friedlich, nachdem ein DDR-Funktionär versehentlich die Grenzöffnung bekannt gab . Heute erinnern nur noch wenige erhaltene Mauerteile und das Denkmal an der Bernauer Straße an diese Zeit. Die East Side Gallery zeigt bunte Graffiti-Kunst auf dem langsten noch stehenden Mauerabschnitt. Für viele Deutsche bleibt der Mauerfall das wichtigste Ereignis der jüngeren Geschichte .`;

function ArticleHeader() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[5px] px-1.5 py-1">
          <img
            src="/images/linktext/motion/icon-back.svg"
            alt=""
            width={14}
            height={14}
            className="block max-w-none"
            style={{ width: 14, height: 14 }}
          />
          <p className="text-[13px] font-medium leading-5 text-[var(--lt-neutral-600)]">
            Back
          </p>
        </div>
        <p className="text-[11px] leading-4 text-[var(--lt-neutral-400)]">
          259 words
        </p>
      </div>
      <h2 className="pt-7 text-[22px] font-semibold leading-[29px] tracking-[-0.3px] text-[var(--lt-neutral-800)]">
        Die Berliner Mauer: Geschichte
      </h2>
      <p className="pt-2.5 text-xs leading-[18px] text-[var(--lt-neutral-400)]">
        Click any word to look it up in the assistant →
      </p>
    </>
  );
}

function Whisper({
  title,
  reduceMotion,
}: {
  title: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-1 pl-4"
      initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
      animate={
        reduceMotion
          ? { opacity: 1, x: 0 }
          : { opacity: [0, 0, 1, 1, 0], x: [12, 12, 0, 0, 0] }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              ...LOOP,
              times: [0, 0.1429, 0.3571, 0.857, 1],
              ease: ["linear", "easeOut", "linear", "easeIn"],
            }
      }
    >
      <img
        src="/images/linktext/motion/whisper-dot.svg"
        alt=""
        width={4}
        height={4}
        className="block max-w-none"
        style={{ width: 4, height: 4 }}
      />
      <div className="text-[11px] leading-normal text-[#707082]">
        <p>{title}</p>
        <p>note added</p>
      </div>
    </motion.div>
  );
}

export function GrammarFocusMotion() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="relative h-[415px] w-[927px] overflow-hidden bg-white">
      <div className="mx-auto w-[680px] px-10 pt-7">
        <ArticleHeader />
        <div className="relative w-[600px] pt-6">
          <motion.div
            className="pointer-events-none absolute left-0 top-6 h-[62px] w-[600px]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: reduceMotion ? 1 : [0, 0, 1, 1] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    ...LOOP,
                    times: [0, 0.0714, 0.1286, 1],
                    ease: ["linear", SOFT, "linear"],
                  }
            }
          >
            <motion.div
              className="absolute left-0 top-[21px] h-[27.52px] w-[600px]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{
                opacity: reduceMotion
                  ? 1
                  : [0, 0, 1, 0.25, 1, 0.25, 1, 1],
              }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      ...LOOP,
                      times: [0, 0.0857, 0.1286, 0.1643, 0.2071, 0.2429, 0.2857, 1],
                      ease: [
                        "linear",
                        SOFT,
                        "easeInOut",
                        "easeInOut",
                        "easeInOut",
                        "easeInOut",
                        "linear",
                      ],
                    }
              }
            >
              <img
                src="/images/linktext/motion/sentence-underline.svg"
                alt=""
                width={600}
                height={27.52}
                className="block max-w-none"
                style={{ width: 600, height: 27.52 }}
              />
            </motion.div>
            <motion.div
              className="absolute left-[147.9px] top-[27px] size-[6px]"
              initial={{ opacity: 1 }}
              animate={{ opacity: reduceMotion ? 0 : [1, 1, 0, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      ...LOOP,
                      times: [0, 0.4577, 0.5018, 1],
                      ease: ["linear", SOFT, "linear"],
                    }
              }
            >
              <img
                src="/images/linktext/motion/note-icon.svg"
                alt=""
                width={6}
                height={6}
                className="block max-w-none"
                style={{ width: 6, height: 6 }}
              />
            </motion.div>
          </motion.div>
          <p className="text-justify text-[14px] leading-6 text-[var(--lt-text-primary)]">
            <ArticleP1 />
          </p>
          <p className="mt-2.5 text-justify text-[14px] leading-6 text-[var(--lt-text-primary)]">
            {ARTICLE_P2}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute left-[757px] top-[165px]">
        <Whisper title="Subordinate Clause" reduceMotion={reduceMotion} />
      </div>
      <motion.div
        className="absolute left-[163px] top-[215px] w-[555px]"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: [0, 0, 1, 1], y: [8, 8, 0, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                ...LOOP,
                times: [0, 0.4357, 0.5071, 1],
                ease: ["linear", SOFT, "linear"],
              }
        }
      >
        <InlineNote
          title="Grammar →"
          body="This is an explanation of a grammar knowledge. This is an explanation of a grammar knowledge. This is an explanation of a grammar knowledge."
        />
      </motion.div>
    </div>
  );
}

export function VocabFocusMotion() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="relative h-[415px] w-[927px] overflow-hidden bg-white">
      <div className="mx-auto w-[680px] px-10 pt-7">
        <ArticleHeader />
        <div className="relative w-[600px] pt-6">
          <div className="text-justify text-[14px] leading-6 text-[var(--lt-text-primary)]">
            <ArticleP1
              word={
                <span className="relative">
                  unuberwindbaren
                  <motion.span
                    className="absolute left-0 block h-6 w-[119px] bg-white"
                    style={{ top: "50%", marginTop: -12 }}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: reduceMotion ? 1 : [0, 0, 1, 1] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            ...LOOP,
                            times: [0, 0.0286, 0.0714, 1],
                            ease: ["linear", SOFT, "linear"],
                          }
                    }
                  />
                  <motion.span
                    className="absolute left-0 whitespace-nowrap text-[14px] font-semibold leading-6 text-[var(--lt-brand-500)]"
                    style={{ top: "50%", marginTop: -12 }}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: reduceMotion ? 1 : [0, 0, 1, 1] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            ...LOOP,
                            times: [0, 0.0714, 0.1286, 1],
                            ease: ["linear", SOFT, "linear"],
                          }
                    }
                  >
                    unuberwindbaren
                  </motion.span>
                  <span
                    className="absolute left-full block size-[6px]"
                    style={{ top: "50%", marginTop: -12 }}
                  >
                    <motion.span
                      className="block size-[6px]"
                      initial={{ scaleX: 0, scaleY: 0 }}
                      animate={
                        reduceMotion
                          ? { scaleX: 0, scaleY: 0 }
                          : { scaleX: [0, 1, 1, 0, 0], scaleY: [0, 1, 1, 0, 0] }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              ...LOOP,
                              times: [0, 0.0429, 0.2143, 0.2571, 1],
                              ease: [
                                [0.696, -0.149, 0.4, 1.4],
                                "linear",
                                [0.5, 0, 0.5, 1],
                                "linear",
                              ],
                            }
                      }
                    >
                      <img
                        src="/images/linktext/motion/note-icon.svg"
                        alt=""
                        width={6}
                        height={6}
                        className="block max-w-none"
                        style={{ width: 6, height: 6 }}
                      />
                    </motion.span>
                  </span>
                  <motion.span
                    className="absolute left-[-6px] block w-[224px]"
                    style={{ top: "50%", marginTop: 12 }}
                    initial={
                      reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: [0, 0, 1, 1], y: [6, 6, 0, 0] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            ...LOOP,
                            times: [0, 0.1429, 0.2143, 1],
                            ease: ["linear", SOFT, "linear"],
                          }
                    }
                  >
                    <InlineNote
                      title="vocabulary →"
                      body="This is an explanation of a vocab in the context of this sentence."
                    />
                  </motion.span>
                </span>
              }
            />
          </div>
          <p className="mt-2.5 text-justify text-[14px] leading-6 text-[var(--lt-text-primary)]">
            {ARTICLE_P2}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute left-[757px] top-[213px]">
        <Whisper title={`"unüberwindbaren"`} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}
