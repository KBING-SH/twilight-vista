import { useRef, useCallback } from "react";

/**
 * Hook that adds manual drag-to-scroll to a CSS-animated marquee container.
 * The scrollRef goes on the INNER animated div (the one with animate-marquee).
 * The handlers go on the OUTER overflow container.
 * Pauses CSS animation while dragging and resumes on release.
 */
export function useDraggableMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startTranslateX = useRef(0);
  const currentTranslateX = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();

  const getComputedTranslateX = (el: HTMLElement): number => {
    const style = window.getComputedStyle(el);
    const matrix = style.transform;
    if (!matrix || matrix === "none") return 0;
    const match = matrix.match(/matrix.*\((.+)\)/);
    if (!match) return 0;
    const values = match[1].split(",").map(Number);
    return values[4] || 0;
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragging.current = true;
    clearTimeout(resumeTimer.current);

    // Capture current visual position
    const currentX = getComputedTranslateX(el);
    startTranslateX.current = currentX;
    currentTranslateX.current = currentX;
    startX.current = e.clientX;

    // Freeze animation at current position
    el.style.animationPlayState = "paused";
    el.style.transform = `translateX(${currentX}px)`;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    const newX = startTranslateX.current + dx;
    currentTranslateX.current = newX;
    scrollRef.current.style.transform = `translateX(${newX}px)`;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const el = scrollRef.current;
    if (!el) return;

    // Resume CSS animation after delay
    resumeTimer.current = setTimeout(() => {
      if (!dragging.current && el) {
        el.style.transform = "";
        el.style.animationPlayState = "running";
      }
    }, 1500);
  }, []);

  return {
    scrollRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
