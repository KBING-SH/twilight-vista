import { FileImage, Palette, RectangleHorizontal, MonitorUp, Sparkles, Gift } from "lucide-react";

const features = [
  { icon: FileImage, text: "Supports JPG, JPEG, PNG, and WEBP uploads up to 20 MB." },
  { icon: Palette, text: "Choose from multiple AI models including GPT-image, Gemini, and more for varied editing results." },
  { icon: RectangleHorizontal, text: "Available aspect ratios include Auto, 1:1, 16:9, 9:16, 4:3, 3:4, 2:3, 3:2, 5:4, and 4:5." },
  { icon: MonitorUp, text: "Output resolutions include 1 MP, 2 MP, and 4 MP." },
  { icon: Sparkles, text: "Custom prompts can be used to describe the edits you want in natural language." },
  { icon: Gift, text: "Claim 60 free credits daily — each generation costs 10 credits." },
];

export function ToolFeatures() {
  return (
    <section className="py-10 md:py-16 border-b border-border/50" aria-labelledby="tool-features-title">
      <div className="container px-4 md:px-8 max-w-4xl">
        <h2 id="tool-features-title" className="text-xl md:text-2xl font-bold text-title text-center mb-6 md:mb-10">
          AI Image Editor — Tool Features
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-soft">
              <f.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-body2 leading-relaxed">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
