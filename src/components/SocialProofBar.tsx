import { Award, Layers, ImageDown, Camera } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "Featured on",
    label: "Product Hunt",
    color: "text-orange-500",
  },
  {
    icon: Layers,
    value: "8+ Styles",
    label: "Cartoon styles available",
    color: "text-primary",
  },
  {
    icon: ImageDown,
    value: "HD",
    label: "Watermark-free output",
    color: "text-emerald-500",
  },
  {
    icon: Camera,
    value: "Supports",
    label: "Portraits, pets, landscapes",
    color: "text-sky-500",
  },
];

export function SocialProofBar() {
  return (
    <div className="border-y border-border/50 bg-card-alt/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 md:py-5 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center md:justify-center md:gap-0 md:divide-x md:divide-border/50">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 md:gap-3 px-2 md:px-10"
          >
            <s.icon className={`h-4 w-4 md:h-5 md:w-5 ${s.color} shrink-0`} />
            <div>
                <span className="text-sm md:text-lg font-bold text-title">{s.value}</span>
              <span className="text-[10px] md:text-xs text-body-desc">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
