import type { Easing, Transition } from "framer-motion";

/** Mutable cubic-bezier tuple accepted by Framer Motion. */
export type Bezier = [number, number, number, number];

/** Widen readonly ease configs so they type-check as Transition easings. */
export function ease(...values: Easing[]): Easing[] {
  return values;
}

/** Cast motion transition objects built with `as const` / readonly easings. */
export function tr(transition: object): Transition {
  return transition as Transition;
}
