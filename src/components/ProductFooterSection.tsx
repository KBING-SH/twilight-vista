import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/** Convert label to a rita.ai slug */
const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const productColumns = [
  { title: "AI Chat", links: [
    { label: "Rita", href: "https://www.rita.ai" },
    { label: "Rita Pro", href: "https://www.rita.ai/pro" },
    { label: "ChatGPT 5.4", href: "https://www.rita.ai/chatgpt-5-4" },
    { label: "ChatGPT 5.2", href: "https://www.rita.ai/chatgpt-5-2" },
    { label: "Gemini 3.1 Pro", href: "https://www.rita.ai/gemini-3-1-pro" },
    { label: "Claude Opus 4.6", href: "https://www.rita.ai/claude-opus-4-6" },
    { label: "Claude Sonnet 4.6", href: "https://www.rita.ai/claude-sonnet-4-6" },
    { label: "Claude Opus 4.5", href: "https://www.rita.ai/claude-opus-4-5" },
    { label: "Gemini 3 Pro", href: "https://www.rita.ai/gemini-3-pro" },
    { label: "Claude 4.5 Sonnet", href: "https://www.rita.ai/claude-4-5-sonnet" },
    { label: "ChatGPT 5.1", href: "https://www.rita.ai/chatgpt-5-1" },
    { label: "DeepSeek V3.1", href: "https://www.rita.ai/deepseek-v3-1" },
    { label: "Grok 4.1", href: "https://www.rita.ai/grok-4-1" },
    { label: "ChatGPT 4o", href: "https://www.rita.ai/chatgpt-4o" },
    { label: "ChatGPT 5", href: "https://www.rita.ai/chatgpt-5" },
  ]},
  { title: "AI Image", links: [
    { label: "Nano Banana 2", href: "https://www.rita.ai/nano-banana-2" },
    { label: "Nano Banana Pro", href: "https://www.rita.ai/nano-banana-pro" },
    { label: "Midjourney", href: "https://www.rita.ai/midjourney" },
    { label: "ChatGPT Image", href: "https://www.rita.ai/chatgpt-image" },
    { label: "Flux", href: "https://www.rita.ai/flux" },
    { label: "Stable Diffusion", href: "https://www.rita.ai/stable-diffusion" },
    { label: "Kling", href: "https://www.rita.ai/kling" },
  ]},
  { title: "AI Video", links: [
    { label: "Veo", href: "https://www.rita.ai/veo" },
    { label: "Kling", href: "https://www.rita.ai/kling-video" },
  ]},
  { title: "AI Audio", links: [
    { label: "Suno", href: "https://www.rita.ai/suno" },
  ]},
  { title: "AI Art Tools", links: [
    { label: "AI Image Generator", href: "https://www.rita.ai/ai-image-generator" },
    { label: "AI Image Upscaler", href: "https://www.rita.ai/ai-image-upscaler" },
    { label: "AI Background Remover", href: "https://www.rita.ai/ai-background-remover" },
    { label: "AI Watermark Remover", href: "https://www.rita.ai/ai-watermark-remover" },
    { label: "AI Photo to Cartoon", href: "https://www.rita.ai/ai-photo-to-cartoon" },
    { label: "AI Christmas Avatar", href: "https://www.rita.ai/ai-christmas-avatar" },
    { label: "AI Ghibli Style", href: "https://www.rita.ai/ai-ghibli-style" },
    { label: "AI Logo Generator", href: "https://www.rita.ai/ai-logo-generator" },
    { label: "AI Pixel Art Generator", href: "https://www.rita.ai/ai-pixel-art-generator" },
    { label: "AI Poster Generator", href: "https://www.rita.ai/ai-poster-generator" },
    { label: "AI Video Generator", href: "https://www.rita.ai/ai-video-generator" },
    { label: "AI Outpainting", href: "https://www.rita.ai/ai-outpainting" },
    { label: "AI Pixar Style", href: "https://www.rita.ai/ai-pixar-style" },
    { label: "AI Avatar Generator", href: "https://www.rita.ai/ai-avatar-generator" },
    { label: "AI Photo Restore", href: "https://www.rita.ai/ai-photo-restore" },
    { label: "Seedance 2.0", href: "https://www.rita.ai/seedance-2-0" },
  ]},
  { title: "AI Tools", links: [
    { label: "AI Detector", href: "https://www.rita.ai/ai-detector" },
    { label: "AI Humanizer", href: "https://www.rita.ai/ai-humanizer" },
    { label: "AI Math Solver", href: "https://www.rita.ai/ai-math-solver" },
    { label: "AI Story Generator", href: "https://www.rita.ai/ai-story-generator" },
    { label: "AI Rewriter", href: "https://www.rita.ai/ai-rewriter" },
    { label: "AI Image to Text", href: "https://www.rita.ai/ai-image-to-text" },
    { label: "AI Essay Writer", href: "https://www.rita.ai/ai-essay-writer" },
    { label: "AI Image Translator", href: "https://www.rita.ai/ai-image-translator" },
    { label: "AI Email Generator", href: "https://www.rita.ai/ai-email-generator" },
    { label: "AI Fortune Teller", href: "https://www.rita.ai/ai-fortune-teller" },
    { label: "AI Translator", href: "https://www.rita.ai/ai-translator" },
    { label: "AI Chemistry Solver", href: "https://www.rita.ai/ai-chemistry-solver" },
  ]},
];

export const ProductFooterSection = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const content = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-6 text-sm">
      {productColumns.map((col) => (
        <div key={col.title}>
          <h5 className="font-semibold text-title mb-2 text-xs">{col.title}</h5>
          <ul className="space-y-1.5">
            {col.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-xs text-body-desc hover:text-primary transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  if (!isMobile) {
    return (
      <div className="flex-1">
        <h4 className="font-bold text-title mb-4 text-sm">Products</h4>
        {content}
      </div>
    );
  }

  return (
    <div className="flex-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-2"
      >
        <h4 className="font-bold text-title text-sm">Products</h4>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2">{content}</div>}
    </div>
  );
};
