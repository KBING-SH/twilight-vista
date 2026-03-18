import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Check } from "lucide-react";
import demoResult from "@/assets/demo-result.png";

type Step =
  | "idle"
  | "showResult"
  | "moveToDl"
  | "clickDl"
  | "downloading"
  | "dlDone"
  | "moveToShare"
  | "clickShare"
  | "showPlatforms"
  | "selectPlatform"
  | "shared"
  | "reset";

const SCRIPT: { step: Step; duration: number }[] = [
  { step: "idle", duration: 500 },
  { step: "showResult", duration: 1200 },
  { step: "moveToDl", duration: 500 },
  { step: "clickDl", duration: 200 },
  { step: "downloading", duration: 1200 },
  { step: "dlDone", duration: 1000 },
  { step: "moveToShare", duration: 500 },
  { step: "clickShare", duration: 200 },
  { step: "showPlatforms", duration: 800 },
  { step: "selectPlatform", duration: 300 },
  { step: "shared", duration: 1500 },
  { step: "reset", duration: 600 },
];

const PLATFORMS = [
  { icon: "𝕏", label: "Twitter" },
  { icon: "📘", label: "Facebook" },
  { icon: "💬", label: "WeChat" },
  { icon: "📷", label: "Instagram" },
];

const DL_POS: [number, number] = [30, 88];
const SHARE_POS: [number, number] = [70, 88];
const PLAT_POS: [number, number] = [62, 72];

export function StepDownloadAnimation({ active = true }: { active?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState<[number, number]>([50, 50]);
  const [cursorVisible, setCursorVisible] = useState(false);

  const currentStep = SCRIPT[stepIndex].step;

  useEffect(() => {
    switch (currentStep) {
      case "idle":
        setCursorVisible(false);
        setCursorPos([50, 50]);
        break;
      case "showResult":
        setCursorVisible(true);
        break;
      case "moveToDl":
        setCursorPos(DL_POS);
        break;
      case "moveToShare":
        setCursorPos(SHARE_POS);
        break;
      case "selectPlatform":
        setCursorPos(PLAT_POS);
        break;
      case "reset":
        setCursorVisible(false);
        break;
    }

    if (!active) return;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCRIPT.length);
    }, SCRIPT[stepIndex].duration);

    return () => clearTimeout(timer);
  }, [stepIndex, currentStep, active]);

  const showResult = currentStep !== "idle" && currentStep !== "reset";
  const showDlProgress = currentStep === "downloading";
  const showDlDone = ["dlDone", "moveToShare", "clickShare", "showPlatforms", "selectPlatform", "shared"].includes(currentStep);
  const showPlatforms = ["showPlatforms", "selectPlatform", "shared"].includes(currentStep);
  const platformSelected = ["selectPlatform", "shared"].includes(currentStep);
  const showSharedDone = currentStep === "shared";

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[3%]">
      {/* Result image */}
      <div className="flex-1 min-h-0 flex flex-col gap-[3px]">
        <span className="text-[0.45em] text-body-desc">Generated Result</span>
        <motion.div
          className="flex-1 rounded-[0.3em] overflow-hidden border border-border/30 min-h-0 relative"
          animate={{ opacity: showResult ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={demoResult}
            alt="Generated cartoon effect"
            className="w-full h-full object-cover"
            style={{ transform: "translateZ(0)" }}
          />
          {!showResult && (
            <div className="absolute inset-0 bg-card/60 flex items-center justify-center">
              <span className="text-[0.45em] text-body-desc">Generating...</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-[4%] shrink-0 relative">
        {/* Download button */}
        <motion.div
          className="flex-1 h-[2em] rounded-lg border border-border/50 flex items-center justify-center gap-[4px] bg-card relative overflow-hidden"
          animate={{
            borderColor: (currentStep === "clickDl" || showDlProgress) ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
            scale: currentStep === "clickDl" ? 0.95 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {showDlDone ? (
            <motion.div className="flex items-center gap-[3px]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Check className="w-[0.6em] h-[0.6em] text-primary" />
              <span className="text-[0.4em] text-primary font-medium">Downloaded</span>
            </motion.div>
          ) : showDlProgress ? (
            <div className="flex items-center gap-[3px]">
              <motion.div className="w-[60%] h-[3px] rounded-full bg-muted absolute bottom-0 left-[20%]">
                <motion.div className="h-full rounded-full bg-primary" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.1, ease: "easeOut" }} />
              </motion.div>
              <Download className="w-[0.5em] h-[0.5em] text-primary" />
              <span className="text-[0.4em] text-body-desc">Downloading...</span>
            </div>
          ) : (
            <>
              <Download className="w-[0.5em] h-[0.5em] text-body-desc" />
              <span className="text-[0.4em] text-body-desc">Download</span>
            </>
          )}
        </motion.div>

        {/* Share button */}
        <motion.div
          className="flex-1 h-[2em] rounded-lg border border-border/50 flex items-center justify-center gap-[4px] bg-card relative"
          animate={{
            borderColor: currentStep === "clickShare" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
            scale: currentStep === "clickShare" ? 0.95 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {showSharedDone ? (
            <motion.div className="flex items-center gap-[3px]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Check className="w-[0.6em] h-[0.6em] text-primary" />
              <span className="text-[0.4em] text-primary font-medium">Shared</span>
            </motion.div>
          ) : (
            <>
              <Share2 className="w-[0.5em] h-[0.5em] text-body-desc" />
              <span className="text-[0.4em] text-body-desc">Share</span>
            </>
          )}
        </motion.div>

        {/* Platform popup */}
        <AnimatePresence>
          {showPlatforms && (
            <motion.div
              className="absolute bottom-[110%] right-0 bg-card border border-border/50 rounded-lg shadow-soft p-[3%] grid grid-cols-2 gap-[4px] z-20"
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {PLATFORMS.map((p, i) => (
                <motion.div
                  key={p.label}
                  className="flex items-center gap-[3px] px-[6px] py-[3px] rounded-md text-[0.35em]"
                  animate={{ backgroundColor: (platformSelected && i === 2) ? "hsl(var(--primary) / 0.1)" : "transparent" }}
                  transition={{ duration: 0.15 }}
                >
                  <span>{p.icon}</span>
                  <span className="text-body-desc">{p.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-30 pointer-events-none"
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
