import { useState, useCallback, useRef } from "react";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ImageActionBar } from "@/components/ImageActionBar";
import ritaLogo from "@/assets/rita-logo.webp";
import { ProductFooterSection } from "@/components/ProductFooterSection";
import { StyleSelector } from "@/components/StyleSelector";
import { UploadPanel } from "@/components/UploadPanel";

import { HowItWorks } from "@/components/HowItWorks";

import { WhyChoose } from "@/components/WhyChoose";
import { FAQSection } from "@/components/FAQSection";
import { ContentSections } from "@/components/ContentSections";
import { ToolkitSection } from "@/components/ToolkitSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ToolFeatures } from "@/components/ToolFeatures";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const RATIO_ASPECT: Record<string, string> = {
  "auto": "16/9", "1:1": "1/1", "16:9": "16/9", "9:16": "9/16",
  "4:3": "4/3", "3:4": "3/4", "2:3": "2/3", "3:2": "3/2",
  "5:4": "5/4", "4:5": "4/5",
};

const Index = () => {
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [generatedRatio, setGeneratedRatio] = useState("16/9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<{ img: string; ratio: string; ratioLabel: string; time: Date }[]>([]);
  const [selectedHistoryIdx, setSelectedHistoryIdx] = useState<number | null>(null);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const styleSetterRef = useRef<((styleIndex: number) => void) | null>(null);

  const handleSelectStyle = useCallback((styleIndex: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const waitAndSet = () => {
      if (window.scrollY <= 5) {
        styleSetterRef.current?.(styleIndex);
      } else {
        requestAnimationFrame(waitAndSet);
      }
    };
    requestAnimationFrame(waitAndSet);
  }, []);

  const handleGenerate = useCallback((styleImg: string, ratio: string) => {
    setIsGenerating(true);
    setGeneratedImg(null);
    const aspectRatio = RATIO_ASPECT[ratio] || "16/9";
    setTimeout(() => {
      setGeneratedImg(styleImg);
      setGeneratedRatio(aspectRatio);
      setIsGenerating(false);
      setHistory((prev) => {
        const next = [{ img: styleImg, ratio: aspectRatio, ratioLabel: ratio, time: new Date() }, ...prev];
        return next.slice(0, 30);
      });
      setSelectedHistoryIdx(0);
    }, 2000);
  }, []);

  const resultProps = {
    isGenerating,
    generatedImg,
    generatedRatio,
    history,
    selectedHistoryIdx,
    onSetHistory: setHistory,
    onSetSelectedHistoryIdx: setSelectedHistoryIdx,
    onSetGeneratedImg: setGeneratedImg,
    onPreview: setPreviewIdx,
  };

  const hasMobileResult = isGenerating || generatedImg || history.length > 0;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative">
      {/* Theme toggle - desktop top right */}
      <div className="hidden lg:block fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* First screen */}
      <section className="min-h-screen lg:h-screen flex flex-col lg:flex-row">
        {/* Mobile/Tablet header inside first screen */}
        <div className="lg:hidden h-12 shrink-0 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <img src={ritaLogo} alt="Rita" className="h-7 w-7 rounded-lg" />
            <span className="text-sm font-bold text-title">Rita</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Left sidebar - desktop */}
        <aside className="hidden lg:flex lg:w-[30%] shrink-0 border-r border-border/50 bg-card">
          <UploadPanel onGenerate={handleGenerate} externalStyleRef={styleSetterRef} />
        </aside>

        {/* Mobile/Tablet: UploadPanel + Result */}
        <div className="flex-1 lg:w-[70%] min-w-0 flex flex-col overflow-hidden">
          <div className="lg:hidden flex-1 min-h-0 overflow-hidden">
            <UploadPanel onGenerate={handleGenerate} externalStyleRef={styleSetterRef} />
          </div>

          {/* Mobile: result display OR hero intro */}
          <div className="lg:hidden shrink-0 border-t border-border/50 bg-card">
            {hasMobileResult ? (
              <ResultDisplay {...resultProps} compact />
            ) : (
              <div className="px-3 py-4 space-y-3">
                <div className="text-center">
                  <h1 className="text-xl font-bold text-title leading-tight mb-1.5">
                    Free AI Image Editor
                  </h1>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mx-auto">
                    Create stunning edits in seconds, powered by AI that makes design simple for everyone.
                  </p>
                </div>
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden">
                  <StyleSelector />
                </div>
              </div>
            )}
          </div>

          {/* Hero content - only visible on desktop */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-4 px-4 md:px-6 flex-1 overflow-hidden">
            <div className="text-center shrink-0 mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-title leading-tight mb-3 md:mb-4">
                Free Online Photo to Cartoon
              </h1>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                Upload your photo and Rita AI will generate fun cartoon images in multiple styles. Supports portraits, pets, landscapes and more — simple to use, ready in seconds.
              </p>
            </div>
            <div className={`flex-1 min-h-0 w-full px-4 flex items-end justify-center relative ${history.length > 0 ? "pb-4" : "pb-[180px]"}`}>
              {!isGenerating && !generatedImg ? (
                <div className="w-full max-h-full aspect-[16/9] rounded-2xl overflow-hidden">
                  <StyleSelector />
                </div>
              ) : isGenerating ? (
                <div className="h-full max-w-full rounded-2xl border border-border/50 bg-muted/30 flex flex-col items-center justify-center gap-3" style={{ aspectRatio: generatedRatio }}>
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">Generating...</p>
                </div>
              ) : generatedImg ? (
                <div className="h-full max-w-full rounded-2xl overflow-hidden border border-border/50 shadow-lg animate-fade-in" style={{ aspectRatio: generatedRatio }}>
                  <img src={generatedImg} alt="Generated result" className="w-full h-full object-cover" />
                </div>
              ) : null}
              {/* Action bar pinned to right edge */}
              {generatedImg && !isGenerating && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <ImageActionBar imageUrl={generatedImg} />
                </div>
              )}
            </div>

            {/* Desktop history strip */}
            {history.length > 0 && (
              <ResultDisplay {...resultProps} historyOnly />
            )}
          </div>
        </div>
      </section>

      {/* History preview dialog */}
      <Dialog open={previewIdx !== null} onOpenChange={(open) => !open && setPreviewIdx(null)}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none flex items-center justify-center w-auto [&>button]:hidden">
          {previewIdx !== null && history[previewIdx] && (
            <div className="relative flex items-center gap-1 sm:gap-3">
              {/* Left arrow - outside on desktop, overlay on mobile */}
              <button
                onClick={() => setPreviewIdx((prev) => prev !== null && prev < history.length - 1 ? prev + 1 : prev)}
                disabled={previewIdx >= history.length - 1}
                className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 items-center justify-center hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              {/* Image container */}
              <div className="relative rounded-2xl bg-background border border-border/50 shadow-2xl p-2 sm:p-4 flex items-center justify-center">
                {/* Close button */}
                <button
                  onClick={() => setPreviewIdx(null)}
                  className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-background" />
                </button>

                {/* Mobile overlay arrows */}
                <button
                  onClick={() => setPreviewIdx((prev) => prev !== null && prev < history.length - 1 ? prev + 1 : prev)}
                  disabled={previewIdx >= history.length - 1}
                  className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border/30 flex items-center justify-center transition-colors disabled:opacity-20"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => setPreviewIdx((prev) => prev !== null && prev > 0 ? prev - 1 : prev)}
                  disabled={previewIdx <= 0}
                  className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border/30 flex items-center justify-center transition-colors disabled:opacity-20"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>

                <img
                  src={history[previewIdx].img}
                  alt="Preview"
                  className="max-h-[75vh] sm:max-h-[78vh] max-w-[88vw] sm:max-w-[72vw] rounded-lg object-contain"
                  style={{ aspectRatio: history[previewIdx].ratio }}
                />
              </div>

              {/* Right arrow - outside on desktop */}
              <button
                onClick={() => setPreviewIdx((prev) => prev !== null && prev > 0 ? prev - 1 : prev)}
                disabled={previewIdx <= 0}
                className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 items-center justify-center hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Below first screen: sidebar sticks, content scrolls */}
      {/* Below first screen: full-width content */}
      <div>
          
          <ToolFeatures />
          <HowItWorks />
          
          <ContentSections onSelectStyle={handleSelectStyle} />
          <WhyChoose />
          <TestimonialsSection />
          <FAQSection />
          <ToolkitSection />

          {/* Footer */}
          <footer className="border-t border-border/50 bg-card-alt">
            <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 mb-12">
                <div className="lg:w-40 shrink-0 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img src={ritaLogo} alt="Rita" className="h-9 w-9 rounded-xl" />
                    <span className="text-xl font-bold text-title italic">Rita</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">Rita makes creativity and efficiency accessible to everyone</p>
                </div>
                <ProductFooterSection />
                <div className="flex gap-10 lg:gap-12 shrink-0 text-sm">
                  <div>
                    <h4 className="font-bold text-title mb-4 text-sm">About</h4>
                    <ul className="space-y-1.5">
                      {[
                        { label: "About Us", href: "https://www.rita.ai/about" },
                        { label: "Contact Us", href: "https://www.rita.ai/contact" },
                      ].map((l) => (
                        <li key={l.label}><a href={l.href} className="text-xs text-body-desc hover:text-primary transition-colors">{l.label}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-title mb-4 text-sm">Legal</h4>
                    <ul className="space-y-1.5">
                      {[
                        { label: "Terms & Conditions", href: "https://www.rita.ai/terms" },
                        { label: "Privacy Policy", href: "https://www.rita.ai/privacy" },
                        { label: "Copyright Policy", href: "https://www.rita.ai/copyright" },
                        { label: "Refund Policy", href: "https://www.rita.ai/refund" },
                        { label: "AML Policy", href: "https://www.rita.ai/aml" },
                      ].map((l) => (
                        <li key={l.label}><a href={l.href} className="text-xs text-body-desc hover:text-primary transition-colors">{l.label}</a></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t border-border/50 pt-6 text-xs text-body-desc text-center">
                © 2026 Rita. All rights reserved.
              </div>
            </div>
          </footer>
      </div>
    </div>
  );
};

export default Index;
