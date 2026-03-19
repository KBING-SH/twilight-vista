import { useState, useRef, useCallback } from "react";
import { ImageIcon, Check, X, Eye, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/LoginDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";


import logoChatgpt from "@/assets/logo-chatgpt.png";
import logoBanana from "@/assets/logo-banana.png";
import logoKling from "@/assets/logo-kling.png";
import logoFlux from "@/assets/logo-flux.png";

import styleGhibli from "@/assets/style-ghibli.png";
import stylePixel from "@/assets/style-pixel.png";
import styleRealistic from "@/assets/style-realistic.png";
import styleInk from "@/assets/style-ink.png";
import styleCartoon from "@/assets/style-cartoon.png";
import styleClassic from "@/assets/style-classic.png";
import styleCute from "@/assets/style-cute.png";
import styleMinimal from "@/assets/style-minimal.png";

const MODEL_OPTIONS = [
  { value: "chatgpt-image-1", label: "ChatGPT-image-1", desc: "Strong comprehension, can generate images with text", logo: logoChatgpt, cost: "30-60" },
  { value: "nano-banana-pro-direct", label: "Nano-banana pro | direct connect", desc: "Broader coverage and routing for unstable networks", logo: logoBanana, cost: "30-60" },
  { value: "kling-v1.5", label: "Kling V1.5", desc: "Supports face reference during generation", logo: logoKling, cost: "10-30" },
  { value: "kling-v2", label: "Kling V2", desc: "Rich details, ideal for refined images", logo: logoKling, cost: "10-30" },
  { value: "nano-banana-pro", label: "Nano-banana pro", desc: "Vivid colors and richer details", logo: logoBanana, cost: "15" },
  { value: "flux-kontext-dev", label: "Flux.1 Kontext Dev", desc: "Great for quick sketch generation", logo: logoFlux, cost: "5" },
  { value: "flux-kontext-max", label: "Flux.1 Kontext Max", desc: "Editable, strong comprehension and precision for commercial use", logo: logoFlux, cost: "8" },
];

export const MODEL_LABELS = MODEL_OPTIONS.map((m) => m.label);

const STYLE_OPTIONS = [
  { src: styleGhibli, label: "Ghibli", prompt: "Transform the photo into Ghibli animation style, preserving soft colors, warm lighting and hand-drawn textures, creating a Miyazaki-esque dreamy atmosphere." },
  { src: stylePixel, label: "Pixel", prompt: "Transform the photo into retro pixel art style, using a limited color palette and crisp pixel blocks, creating an 8-bit game-like nostalgic aesthetic." },
  { src: styleRealistic, label: "Realistic", prompt: "Transform the photo into a highly realistic digital painting style, preserving fine lighting and texture details, creating a hyperrealistic artistic quality." },
  { src: styleInk, label: "Ink Wash", prompt: "Transform the photo into an East Asian ink wash painting style, using variations of ink density and flow, creating the mood and charm of traditional Chinese painting." },
  { src: styleCartoon, label: "Cartoon", prompt: "Transform the photo into a bright and lively cartoon style, using vivid colors, bold outlines and exaggerated expressions, full of fun and energy." },
  { src: styleClassic, label: "Retro", prompt: "Transform the photo into retro fashion style, blending classic tones and elegant composition, creating a nostalgic old movie poster aesthetic." },
  { src: styleCute, label: "Cute", prompt: "Transform the photo into a chibi cute style, with big eyes, rounded contours and soft colors, creating a sweet anime-inspired look." },
  { src: styleMinimal, label: "Minimal", prompt: "Transform the photo into a minimal illustration style, using clean lines and limited colors, removing excess detail, creating a crisp modern aesthetic." },
];

const RATIOS = [
  { value: "auto", label: "Auto", w: 26, h: 26 },
  { value: "1:1", label: "1:1", w: 26, h: 26 },
  { value: "16:9", label: "16:9", w: 27, h: 16 },
  { value: "9:16", label: "9:16", w: 16, h: 27 },
  { value: "4:3", label: "4:3", w: 27, h: 21 },
  { value: "3:4", label: "3:4", w: 21, h: 27 },
  { value: "2:3", label: "2:3", w: 19, h: 27 },
  { value: "3:2", label: "3:2", w: 27, h: 19 },
  { value: "5:4", label: "5:4", w: 27, h: 22 },
  { value: "4:5", label: "4:5", w: 22, h: 27 },
];

const RESOLUTIONS = ["1 MP", "2 MP", "4 MP"];
const FORMATS = ["WebP", "JPG", "PNG"];

export function UploadPanel({ onGenerate, externalStyleRef }: { onGenerate?: (styleImg: string, ratio: string) => void; externalStyleRef?: React.MutableRefObject<((styleIndex: number) => void) | null> } = {}) {
  const [isDragging, setIsDragging] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedModel, setSelectedModel] = useState("chatgpt-image-1");
  const selectedModelOption = MODEL_OPTIONS.find((m) => m.value === selectedModel) ?? MODEL_OPTIONS[0];
  const [selectedResolution, setSelectedResolution] = useState("1 MP");
  const [selectedFormat, setSelectedFormat] = useState("WebP");
  const [previewStyle, setPreviewStyle] = useState<number | null>(null);
  const [promptText, setPromptText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Expose a method to set style externally
  if (externalStyleRef) {
    externalStyleRef.current = (styleIndex: number) => {
      if (STYLE_OPTIONS[styleIndex]) {
        setSelectedStyle(styleIndex);
        setPromptText(STYLE_OPTIONS[styleIndex].prompt);
      }
    };
  }

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setShowSuccess(true);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setShowSuccess(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="rounded-xl border border-border/50 bg-muted shadow-soft h-full flex flex-col overflow-hidden">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-3 lg:p-4 space-y-2 md:space-y-1.5 lg:space-y-3 text-sm">
        {/* Model selector */}
        <div>
          <label className="text-xs font-medium text-title mb-1 lg:mb-1.5 block">Model</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="rounded-lg border-border/50 bg-card text-title h-auto py-1.5 lg:py-2 text-left">
              <div className="flex items-center gap-2.5 w-full pr-6">
                <img src={selectedModelOption.logo} alt={selectedModelOption.label + " logo"} className="w-9 h-9 rounded-lg object-contain shrink-0" />
                <div className="flex flex-col justify-center text-left flex-1 min-w-0">
                  <span className="font-medium text-sm leading-snug truncate">{selectedModelOption.label}</span>
                  <span className="text-xs text-muted-foreground leading-snug truncate">{selectedModelOption.desc}</span>
                </div>
                <span className="shrink-0 text-xs font-medium text-primary flex items-center gap-0.5 ml-auto">💎 {selectedModelOption.cost}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-72 w-[var(--radix-select-trigger-width)]">
              {MODEL_OPTIONS.map((m) => (
                <SelectItem key={m.value} value={m.value} className="py-2 pr-2 [&>span:last-child]:hidden">
                  <div className="flex items-center gap-2.5 w-full">
                    <img src={m.logo} alt={m.label + " logo"} className="w-9 h-9 rounded-lg object-contain shrink-0" />
                    <div className="flex flex-col justify-center text-left flex-1 min-w-0">
                      <span className="font-medium text-sm leading-snug truncate">{m.label}</span>
                      <span className="text-xs text-muted-foreground leading-snug">{m.desc}</span>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-primary flex items-center gap-0.5 ml-auto">💎 {m.cost}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Upload area */}
        <div>
          <label className="text-xs font-medium text-title mb-1 lg:mb-1.5 block">Image</label>
          <div id="upload-drop-zone" className="relative">
            {uploadedImage ? (
              <div className="relative rounded-lg border border-border/50 overflow-hidden animate-fade-in">
                <img src={uploadedImage} alt="Uploaded image" className="w-full h-20 md:h-[90px] lg:h-28 object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-background" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={cn(
                  "h-20 md:h-[90px] lg:h-28 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                )}
              >
                <ImageIcon className="h-5 w-5 lg:h-8 lg:w-8 text-body-desc" />
                <p className="text-[16px] text-body-desc">Drag & drop image here, or click to browse</p>
                <p className="text-[14px] text-body-desc/60"><p className="text-[14px] text-body-desc/60">Supports jpg/jpeg/png/webp, max 20MB</p></p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
            {showSuccess && (
              <div className="flex items-center gap-1.5 mt-1 animate-fade-in">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                <span className="text-xs text-primary">Upload successful</span>
              </div>
            )}
          </div>
        </div>

        {/* Prompt */}
        <div>
          <label className="text-xs font-medium text-title mb-1 lg:mb-1.5 block">
            Prompt <span className="text-destructive">*</span>
          </label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder='Describe your editing requirements, such as "Remove the person in the background".'
            className="w-full h-[54px] md:h-14 lg:h-24 rounded-lg border border-border/50 bg-card px-3 py-1.5 text-sm text-title placeholder:text-body-desc resize-none md:resize-none lg:resize-y focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground justify-end">
            <span>{promptText.length}/4096</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {PROMPT_SHORTCUTS.map((shortcut) => (
              <button
                key={shortcut}
                type="button"
                onClick={() => setPromptText((prev) => prev ? `${prev}, ${shortcut}` : shortcut)}
                className="px-2.5 py-1 rounded-md border border-border/50 bg-card text-xs text-body2 hover:border-primary/50 hover:text-primary transition-colors"
              >
                {shortcut}
              </button>
            ))}
          </div>
        </div>


        {/* Aspect Ratio */}
        <div>
          <label className="text-xs md:text-sm font-medium text-title mb-1 lg:mb-1.5 block">Aspect Ratio</label>
          <div className="grid grid-cols-5 gap-1.5 md:gap-2 lg:gap-2">
            {RATIOS.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRatio(r.value)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-1.5 px-1 border text-[10px] font-medium transition-all",
                  "md:text-xs md:py-2",
                  "lg:py-2.5 lg:text-[11px]",
                  selectedRatio === r.value
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-body2 hover:border-primary/50 hover:bg-primary/5"
                )}
                style={{ borderRadius: '14px' }}
              >
                <RatioIcon w={r.w} h={r.h} active={selectedRatio === r.value} />
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resolution */}
        <div>
          <label className="text-xs md:text-sm font-medium text-title mb-1 lg:mb-1.5 block">Resolution</label>
          <div className="flex flex-wrap gap-1 md:gap-1.5 lg:gap-1.5">
            {RESOLUTIONS.map((res) => (
              <button
                key={res}
                onClick={() => setSelectedResolution(res)}
                className={cn(
                  "px-3 py-1.5 md:px-4 md:py-2 rounded-lg border text-[11px] md:text-xs font-medium transition-all",
                  selectedResolution === res
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-body2 hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom: generate */}
      <div className="border-t border-border/50 p-3 md:p-3 lg:p-4 flex items-center gap-2">
        <Button
          variant="gradient"
          size="default"
          className="flex-1"
          onClick={() => {
            const style = STYLE_OPTIONS[selectedStyle];
            if (onGenerate && style) {
              onGenerate(style.src, selectedRatio);
            }
          }}
        >
          Claim 60 Free Credits Daily
        </Button>
        <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-0.5">10 credits/use</span>
      </div>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />

      {/* Style Preview Dialog */}
      <Dialog open={previewStyle !== null} onOpenChange={(open) => !open && setPreviewStyle(null)}>
        <DialogContent className="max-w-4xl p-0 sm:p-4 overflow-visible gap-0 border border-border bg-card rounded-2xl shadow-xl [&>button]:hidden">
          <div className="relative">
            {/* Close button - top right corner */}
            <button
              onClick={() => setPreviewStyle(null)}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-30 w-8 h-8 rounded-full bg-foreground/70 hover:bg-foreground/90 flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="w-4 h-4 text-background" />
            </button>

            {/* Desktop arrows - outside card */}
            <button
              onClick={() => setPreviewStyle((prev) => prev !== null ? (prev - 1 + STYLE_OPTIONS.length) % STYLE_OPTIONS.length : 0)}
              className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 items-center justify-center hover:bg-background transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6 text-title" />
            </button>
            <button
              onClick={() => setPreviewStyle((prev) => prev !== null ? (prev + 1) % STYLE_OPTIONS.length : 0)}
              className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 items-center justify-center hover:bg-background transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6 text-title" />
            </button>

            {/* Main card */}
            <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row min-h-0 md:min-h-[420px]">
                {/* Left: large image */}
                <div className="relative md:w-[55%] bg-muted/30">
                  {previewStyle !== null && (
                    <img
                      src={STYLE_OPTIONS[previewStyle].src}
                      alt={STYLE_OPTIONS[previewStyle].label}
                      className="w-full h-56 sm:h-64 md:h-full object-cover"
                    />
                  )}
                  {/* Mobile arrows - overlay on image */}
                  <button
                    onClick={() => setPreviewStyle((prev) => prev !== null ? (prev - 1 + STYLE_OPTIONS.length) % STYLE_OPTIONS.length : 0)}
                    className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border/30 flex items-center justify-center transition-colors z-10"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    onClick={() => setPreviewStyle((prev) => prev !== null ? (prev + 1) % STYLE_OPTIONS.length : 0)}
                    className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border/30 flex items-center justify-center transition-colors z-10"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground" />
                  </button>
                </div>
                {/* Right: style info & prompt */}
                <div className="md:w-[45%] p-4 sm:p-6 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-title mb-4 sm:mb-5">
                    {previewStyle !== null && STYLE_OPTIONS[previewStyle].label}
                  </h3>
                  <p className="text-sm font-semibold text-title mb-2">Prompt</p>
                  <div className="rounded-xl border border-border/50 bg-muted p-3 sm:p-4 flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {previewStyle !== null && STYLE_OPTIONS[previewStyle].prompt}
                    </p>
                  </div>
                  <Button
                    variant="gradient"
                    className="w-full mt-4 sm:mt-5"
                    onClick={() => {
                      if (previewStyle !== null) {
                        setSelectedStyle(previewStyle);
                        setPromptText(STYLE_OPTIONS[previewStyle].prompt);
                        setPreviewStyle(null);
                      }
                    }}
                  >
                    Use Prompt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StyleCard({ style, index, selected, onSelect, onPreview }: {
  style: { src: string; label: string; prompt: string };
  index: number;
  selected: boolean;
  onSelect: (i: number) => void;
  onPreview: () => void;
}) {
  return (
    <div
      onClick={() => onSelect(index)}
      className="relative cursor-pointer flex flex-col items-center gap-1.5"
    >
      <div className={cn(
        "relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all",
        selected ? "border-primary shadow-sm" : "border-transparent hover:border-primary/40"
      )}>
        <img
          src={style.src}
          alt={style.label}
          className="w-full h-full object-cover"
          style={{ imageRendering: "auto", transform: "translateZ(0)", backfaceVisibility: "hidden", filter: "blur(0.15px)" }}
          loading="eager"
          decoding="async"
          draggable={false}
        />
        {selected && (
          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-primary-foreground" />
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onPreview(); }}
          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <Eye className="w-3 h-3 text-white" />
        </button>
      </div>
      <span className={cn(
        "text-[10px] leading-tight truncate w-full text-center",
        selected ? "text-primary font-medium" : "text-muted-foreground"
      )}>{style.label}</span>
    </div>
  );
}

function RatioIcon({ w, h, active }: { w: number; h: number; active: boolean }) {
  const stroke = active ? "hsl(var(--primary-foreground))" : "hsl(var(--body2))";
  const fill = active ? "hsl(var(--primary-foreground) / 0.2)" : "none";
  return (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
      <rect x={(28 - w) / 2} y={(28 - h) / 2} width={w} height={h} rx="2.5" stroke={stroke} strokeWidth="1.8" fill={fill} />
    </svg>
  );
}
