import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ value, duration = 2, decimals = 0, prefix = "", suffix = "" }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      onUpdate: (latest) => setDisplayValue(latest),
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
