import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    // Simple intersection observer for startOnView
    if (startOnView && elementRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const startTimeout = setTimeout(() => {
              setStarted(true);
            }, delay);
            observer.disconnect();
            return () => clearTimeout(startTimeout);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    const graphemes = Array.from(children);
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < graphemes.length) {
        setDisplayedText(graphemes.slice(0, i + 1).join(""));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className
      ),
      ...props,
    },
    displayedText
  );
}
