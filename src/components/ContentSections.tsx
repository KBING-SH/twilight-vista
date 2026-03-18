import { useState, useEffect } from "react";
import { User, PawPrint, Mountain, ChevronRight } from "lucide-react";
import landscapeBefore from "@/assets/landscape-before.jpg";
import landscapeAfter from "@/assets/landscape-after.jpg";
import petBefore from "@/assets/pet-before.jpg";
import petAfter from "@/assets/pet-after.jpg";
import portraitBefore from "@/assets/portrait-before.jpg";
import portraitAfter from "@/assets/portrait-after.jpg";
import { AutoComparisonSlider } from "@/components/AutoComparisonSlider";

const sections = [
  {
    icon: User,
    title: "AI Portrait to Cartoon — Turn Selfies into Cartoon Avatars",
    subtitle: "Transform your selfies into unique cartoon avatars",
    image: null,
    comparison: { before: portraitBefore, after: portraitAfter },
    imageAlt: "Young woman's selfie transformed into a colorful cartoon avatar using AI Photo to Cartoon",
    paragraphs: [
      "Create a cartoon portrait with AI Photo to Cartoon by uploading a clear photo. This tool converts your portrait into a charming cartoon avatar that highlights your unique features. Choose a style and enjoy a personalized image suitable for social media or gifts. Explore AI Photo to Cartoon to see your portrait in a new way.",
    ],
    imageFirst: true,
  },
  {
    icon: PawPrint,
    title: "AI Pet Photo to Cartoon — Cartoon Portraits for Cats & Dogs",
    subtitle: "Create charming cartoon portraits of your pets",
    image: null,
    comparison: { before: petBefore, after: petAfter },
    imageAlt: "Golden retriever puppy turned into a playful cartoon portrait with AI Photo to Cartoon",
    paragraphs: [
      "Generate a cartoon portrait of your pet using AI Photo to Cartoon. Upload a clear photo of your pet and let the tool transform it into a playful cartoon style. This effect brings out your pet's personality in a fun and engaging way. Share your pet's new look created by AI Photo to Cartoon with friends and family.",
    ],
    imageFirst: false,
  },
  {
    icon: Mountain,
    title: "AI Landscape to Cartoon — Scenic Photos as Cartoon Art",
    subtitle: "Transform scenic photos into cartoon artwork",
    image: null,
    comparison: { before: landscapeBefore, after: landscapeAfter },
    imageAlt: "Mountain lake scenery converted into vibrant cartoon artwork using AI Photo to Cartoon",
    paragraphs: [
      "Apply a cartoon effect with AI Photo to Cartoon that turns your landscape photos into appealing cartoon images. Upload your favorite scene and watch it become a colorful cartoon portrait. Enjoy a fresh artistic interpretation of your landscapes with AI Photo to Cartoon.",
    ],
    imageFirst: true,
  },
];

// Map section index to style index: 0=Ghibli, 1=Cartoon, 2=Ink
const SECTION_STYLE_MAP = [0, 1, 3];

export function ContentSections({ onSelectStyle }: { onSelectStyle?: (styleIndex: number) => void }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTryNow = (sectionIndex: number) => {
    if (onSelectStyle) {
      onSelectStyle(SECTION_STYLE_MAP[sectionIndex] ?? 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const checkScrollDone = () => {
        if (window.scrollY <= 5) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
        } else {
          requestAnimationFrame(checkScrollDone);
        }
      };
      requestAnimationFrame(checkScrollDone);
    }
  };

  return (
    <>
      {showTooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
          <UploadTooltip />
        </div>
      )}
      <section className="space-y-0">
        <div className="max-w-[1600px] mx-auto space-y-0">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`py-10 md:py-16 lg:py-24 ${i % 2 === 0 ? "bg-muted/40" : "bg-background"}`}
            >
              <article
                className={`px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-5 lg:gap-[80px] ${
                  section.imageFirst ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-[55%] shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
                    {section.comparison ? (
                      <AutoComparisonSlider
                        beforeSrc={section.comparison.before}
                        afterSrc={section.comparison.after}
                        beforeAlt="Original photo"
                        afterAlt="Cartoon effect"
                      />
                    ) : (
                      <img
                        src={section.image!}
                        alt={section.imageAlt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-[45%] space-y-5">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide">
                      <section.icon className="h-3.5 w-3.5" />
                      <span>{section.subtitle}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-title leading-tight tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base md:text-lg text-body2 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => handleTryNow(i)}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-primary text-primary-foreground text-base font-semibold transition-all hover:opacity-90 hover:shadow-lg group"
                    >
                      <span>Try it now</span>
                      <ChevronRight className="h-4 w-4 text-primary-foreground/70 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function UploadTooltip() {
  const [pos, setPos] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>("#upload-drop-zone"));
    const el = candidates.find((node) => {
      const rect = node.getBoundingClientRect();
      const style = window.getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });

    if (el) {
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    }
  }, []);

  if (!pos) return null;

  return (
    <div
      className="absolute animate-fade-in flex items-center justify-center"
      style={{ top: pos.top, left: pos.left, width: pos.width, height: pos.height }}
    >
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-[bounce_1s_ease-in-out_3]">
        👆 Upload your image here to get started
      </div>
    </div>
  );
}
