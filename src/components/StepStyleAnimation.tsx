import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import styleGhibli from "@/assets/style-ghibli.png";
import stylePixel from "@/assets/style-pixel.png";
import styleRealistic from "@/assets/style-realistic.png";
import styleInk from "@/assets/style-ink.png";
import styleCartoon from "@/assets/style-cartoon.png";
import styleClassic from "@/assets/style-classic.png";
import styleCute from "@/assets/style-cute.png";
import styleMinimal from "@/assets/style-minimal.png";

const STYLES = [
  { src: styleGhibli, label: "Ghibli" },
  { src: stylePixel, label: "Pixel" },
  { src: styleRealistic, label: "Realistic" },
  { src: styleInk, label: "Ink Wash" },
  { src: styleCartoon, label: "Cartoon" },
  { src: styleClassic, label: "Retro" },
  { src: styleCute, label: "Cute" },
  { src: styleMinimal, label: "Minimal" },
];

// Grid center positions for cursor (left%, top%)
const CELL_POS: [number, number][] = [
  [14, 26], [37, 26], [60, 26], [83, 26],
  [14, 56], [37, 56], [60, 56], [83, 56],
];
const BTN_POS: [number, number] = [50, 91];

// State machine steps
type Step =
  | { type: "idle" }
  | { type: "move"; target: number } // move cursor to style index
  | { type: "select"; target: number } // click to select
  | { type: "hold" }
  | { type: "moveBtn" }
  | { type: "clickBtn" }
  | { type: "loading" }
  | { type: "reset" };

const SCRIPT: { step: Step; duration: number }[] = [
  { step: { type: "idle" }, duration: 800 },
  { step: { type: "move", target: 3 }, duration: 600 },        // move to Ink
  { step: { type: "select", target: 3 }, duration: 200 },       // click
  { step: { type: "hold" }, duration: 1200 },
  { step: { type: "move", target: 1 }, duration: 600 },         // move to Pixel
  { step: { type: "select", target: 1 }, duration: 200 },       // click
  { step: { type: "hold" }, duration: 1200 },
  { step: { type: "move", target: 4 }, duration: 600 },         // move to Cartoon
  { step: { type: "select", target: 4 }, duration: 200 },       // click
  { step: { type: "hold" }, duration: 1000 },
  { step: { type: "moveBtn" }, duration: 600 },                  // move to button
  { step: { type: "clickBtn" }, duration: 300 },                 // press button
  { step: { type: "loading" }, duration: 1800 },                 // loading state
  { step: { type: "reset" }, duration: 600 },                    // fade out
];

export function StepStyleAnimation({ active = true }: { active?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<[number, number]>([50, 10]);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const entry = SCRIPT[stepIndex];
    const { step } = entry;

    switch (step.type) {
      case "idle":
        setCursorVisible(true);
        setCursorPos([50, 10]);
        setSelected(null);
        setBtnPressed(false);
        setIsLoading(false);
        break;
      case "move":
        setCursorPos(CELL_POS[step.target]);
        break;
      case "select":
        setSelected(step.target);
        break;
      case "hold":
        break;
      case "moveBtn":
        setCursorPos(BTN_POS);
        break;
      case "clickBtn":
        setBtnPressed(true);
        break;
      case "loading":
        setBtnPressed(false);
        setIsLoading(true);
        setCursorVisible(false);
        break;
      case "reset":
        setIsLoading(false);
        setSelected(null);
        break;
    }

    if (!active) return;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCRIPT.length);
    }, entry.duration);

    return () => clearTimeout(timer);
  }, [stepIndex, active]);

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[2%]">
      <p className="text-[0.55em] text-body-desc font-medium leading-none">Select a Style</p>

      <div className="grid grid-cols-4 gap-[2.5%] flex-1 min-h-0">
        {STYLES.map((style, i) => (
          <div key={i} className="relative flex flex-col items-center gap-[2px] min-h-0">
            <div className="relative w-full aspect-[4/3] rounded-[0.2em] overflow-hidden border border-border/30">
              <img
                src={style.src}
                alt={style.label}
                className="w-full h-full object-cover"
                style={{ imageRendering: "auto", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
                draggable={false}
              />
              <AnimatePresence>
                {selected === i && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-[0.2em] border-2 border-primary pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                    <motion.div
                      className="absolute top-[5%] left-[5%] w-[22%] aspect-square rounded-full bg-primary flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-[55%] h-[55%] text-primary-foreground" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <span
              className="text-[0.32em] leading-tight truncate w-full text-center transition-colors duration-200"
              style={{ color: selected === i ? "hsl(var(--primary))" : "hsl(var(--body-desc))" }}
            >
              {style.label}
            </span>
          </div>
        ))}
      </div>

      {/* Generate button */}
      <motion.div
        className="w-full h-[13%] rounded-lg flex items-center justify-center shrink-0 relative"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--theme1)))",
        }}
        animate={{ scale: btnPressed ? 0.95 : 1 }}
        transition={{ duration: 0.1 }}
      >
        {!isLoading && (
          <span className="text-[0.5em] font-semibold text-white">Generate ⚡10</span>
        )}
        {isLoading && (
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[4px] h-[4px] rounded-full bg-white/80"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10 pointer-events-none"
        animate={{
          left: `${cursorPos[0]}%`,
          top: `${cursorPos[1]}%`,
          opacity: cursorVisible ? 0.9 : 0,
        }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
