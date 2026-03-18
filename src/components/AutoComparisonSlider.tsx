import { useState, useRef, useEffect, useCallback } from "react";

interface AutoComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  speed?: number;
  min?: number;
  max?: number;
}

export function AutoComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Original photo",
  afterAlt = "Cartoon effect",
  speed = 10,
  min = 0,
  max = 100,
}: AutoComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const directionRef = useRef<1 | -1>(1);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);

  // Auto-animation
  useEffect(() => {
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!pausedRef.current) {
        setSliderPos((prev) => {
          let next = prev + directionRef.current * speed * delta;
          if (next >= max) {
            next = max;
            directionRef.current = -1;
          } else if (next <= min) {
            next = min;
            directionRef.current = 1;
          }
          return next;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [speed, min, max]);

  // Convert pointer position to slider percentage
  const posFromEvent = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return 50;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      return Math.max(min, Math.min(max, pct));
    },
    [min, max]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      pausedRef.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setSliderPos(posFromEvent(e.clientX));
    },
    [posFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      setSliderPos(posFromEvent(e.clientX));
    },
    [posFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    // Update direction based on current position for smooth resume
    setSliderPos((pos) => {
      directionRef.current = pos > (max + min) / 2 ? -1 : 1;
      return pos;
    });
    pausedRef.current = false;
  }, [max, min]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/2] overflow-hidden select-none cursor-ew-resize touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After (cartoon - full background) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full block object-cover object-center"
        width="600"
        height="400"
        loading="lazy"
        draggable={false}
      />

      {/* Before (original - clipped) */}
      <div
        className="absolute inset-0 z-[8]"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full block object-cover object-center"
          width="600"
          height="400"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute z-10 top-0 bottom-0 flex flex-col items-center pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-[2px] bg-white flex-1" />
        <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center gap-1 bg-black/20 backdrop-blur-sm">
          <span className="block h-3.5 w-[2px] bg-white rounded-full" />
          <span className="block h-3.5 w-[2px] bg-white rounded-full" />
        </div>
        <div className="w-[2px] bg-white flex-1" />
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
        Before
      </div>
      <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
        After
      </div>
    </div>
  );
}
