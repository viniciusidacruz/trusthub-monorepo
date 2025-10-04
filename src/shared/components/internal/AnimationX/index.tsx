"use client";

import { animated, useSpring } from "@react-spring/web";

import { AnimationXProps } from "./types";

export function AnimationX({ children, direction }: AnimationXProps) {
  const isLeft = direction === "left";

  const { opacity, transform } = useSpring({
    config: {
      duration: 1000,
    },
    from: {
      opacity: 0,
      transform: isLeft ? "translateX(100px)" : "translateX(-100px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0px)",
    },
  });

  return <animated.div style={{ opacity, transform }}>{children}</animated.div>;
}
