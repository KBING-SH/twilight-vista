import { motion } from "framer-motion";
import { ImageIcon, Check } from "lucide-react";
import demoPortrait from "@/assets/demo-portrait.png";

const CYCLE = 6.5;

export function StepUploadAnimation({ active = true }: { active?: boolean }) {
  if (!active) {
    return (
      <div className="w-full h-full bg-card flex items-center justify-center">
        <div className="w-full h-full flex flex-col p-[8%] gap-[4%]">
          <p className="text-[0.65em] text-body-desc font-medium leading-none">Upload reference image</p>
          <div className="relative flex-1 rounded-lg border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-[4%] bg-muted/10 min-h-0">
            <ImageIcon className="w-[12%] h-[12%] min-w-4 min-h-4 text-body-desc/40" />
            <span className="text-[0.55em] text-body-desc/40">Click or drag image to upload</span>
          </div>
          <div className="flex flex-col gap-[3%]">
            <div className="h-[1.2em]" />
            <p className="text-[0.55em] text-body-desc leading-none">Prompt</p>
            <div className="h-[1.8em] rounded-md border border-border/40 bg-muted/10 px-[4%] flex items-center">
              <span className="text-[0.5em] text-body-desc/40">Describe your idea...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex items-center justify-center">
      <div className="w-full h-full flex flex-col p-[8%] gap-[4%]">
        <p className="text-[0.65em] text-body-desc font-medium leading-none">Upload reference image</p>
        <div className="relative flex-1 rounded-lg border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-[4%] bg-muted/10 min-h-0">
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ opacity: [1, 1, 1, 0, 0, 0, 0, 1] }}
            transition={{ duration: CYCLE, times: [0, 0.25, 0.28, 0.35, 0.5, 0.85, 0.93, 1], repeat: Infinity }}
          >
            <ImageIcon className="w-[12%] h-[12%] min-w-4 min-h-4 text-body-desc/40" />
            <span className="text-[0.55em] text-body-desc/40">Click or drag image to upload</span>
          </motion.div>
          <motion.div
            className="absolute inset-[6%] rounded-md overflow-hidden shadow-md"
            animate={{
              y: ["-100%", "-100%", "-100%", "0%", "-2%", "0%", "0%", "0%", "-100%"],
              opacity: [0, 0, 0, 1, 1, 1, 1, 0, 0],
              scale: [0.85, 0.85, 0.85, 1, 1.01, 1, 1, 0.95, 0.85],
              rotate: [-4, -4, -4, 0, 0, 0, 0, 0, -4],
            }}
            transition={{ duration: CYCLE, times: [0, 0.2, 0.3, 0.48, 0.52, 0.55, 0.88, 0.95, 1], ease: "easeOut", repeat: Infinity }}
          >
            <img src={demoPortrait} alt="Sample portrait" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none"
            animate={{ opacity: [0, 0, 0, 0.7, 0.7, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.3, 0.42, 0.48, 0.65, 0.7, 1], repeat: Infinity }}
          />
        </div>
        <div className="flex flex-col gap-[3%]">
          <motion.div
            className="flex items-center gap-1 h-[1.2em]"
            animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.3, 0.5, 0.55, 0.85, 0.93, 1], repeat: Infinity }}
          >
            <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-2 h-2 text-primary" />
            </div>
            <span className="text-[0.5em] text-primary leading-none">Upload successful</span>
          </motion.div>
          <p className="text-[0.55em] text-body-desc leading-none">Prompt</p>
          <div className="h-[1.8em] rounded-md border border-border/40 bg-muted/10 px-[4%] flex items-center">
            <span className="text-[0.5em] text-body-desc/40">Describe your idea...</span>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute w-4 h-4 z-10"
        style={{ top: "35%", right: "25%" }}
        animate={{ x: [20, 20, 20, 0, 0, 0, 0, 20], y: [-20, -20, -20, 10, 10, 10, 10, -20], opacity: [0, 0, 0.9, 0.9, 0.9, 0, 0, 0] }}
        transition={{ duration: CYCLE, times: [0, 0.2, 0.28, 0.46, 0.5, 0.55, 0.8, 1], repeat: Infinity }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
