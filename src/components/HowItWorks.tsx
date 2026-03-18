import { useState, useEffect, useCallback } from "react";
import { StepUploadAnimation } from "./StepUploadAnimation";
import { StepStyleAnimation } from "./StepStyleAnimation";
import { StepDownloadAnimation } from "./StepDownloadAnimation";

const steps = [
  {
    step: "01",
    title: "Upload Photo",
    desc: "Drag and drop or click to upload portrait, pet, or landscape photos. Supports PNG / JPG / WEBP, up to 20 MB.",
    color: "from-primary to-theme1",
  },
  {
    step: "02",
    title: "Pick Style · Generate",
    desc: "Choose your favorite cartoon style and click generate. Rita AI delivers a high-quality cartoon image in seconds.",
    color: "from-theme1 to-emerald-400",
  },
  {
    step: "03",
    title: "Download & Share",
    desc: "Instantly download HD watermark-free images, or share to social platforms with one click to show off your cartoon avatar.",
    color: "from-theme2 to-primary",
  },
];

// Duration each animation plays before moving to next
const DURATIONS = [6500, 10000, 8600];

const COMPONENTS = [StepUploadAnimation, StepStyleAnimation, StepDownloadAnimation];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, DURATIONS[activeIndex]);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="py-10 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">How to Turn a Photo into a Cartoon in 3 Steps</h2>
        <p className="text-sm md:text-base text-body-desc text-center mb-6 md:mb-12">No design skills needed — upload your photo, pick a style, and download the cartoon instantly</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => {
            const Component = COMPONENTS[i];
            const isActive = activeIndex === i;

            return (
              <div
                key={s.step}
                className={`group rounded-xl border bg-card shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer hover:bg-hover-bg overflow-hidden ${
                  isActive ? "border-primary/30" : "border-border/50"
                }`}
              >
                <div className="w-full aspect-[8/5] overflow-hidden bg-muted/30">
                  {/* Re-mount component when it becomes active to restart animation */}
                  <Component key={isActive ? `active-${activeIndex}` : `idle-${i}`} active={isActive} />
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} shrink-0`}>
                      <span className="text-sm font-bold text-white">{s.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-title">{s.title}</h3>
                  </div>
                  <p className="text-sm text-body-desc leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
