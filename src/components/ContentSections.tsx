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
    title: "What is AI Image Editor?",
    subtitle: "Easy online photo editing",
    image: null,
    comparison: { before: portraitBefore, after: portraitAfter },
    imageAlt: "AI Image Editor transforming a photo with intelligent editing tools",
    paragraphs: [
      "An AI image editor is an easy online tool that helps you edit photos quickly and without hassle. Upload your image, describe the result you want, and get it in moments. From improving image quality to removing backgrounds or testing creative styles, everything is available in one free place.",
    ],
    prompt: "Enhance this photo to improve overall quality, sharpness, and color balance while keeping it natural",
    imageFirst: true,
  },
  {
    icon: PawPrint,
    title: "Why is AI Image Editor recommended?",
    subtitle: "Simple, efficient, and free",
    image: null,
    comparison: { before: petBefore, after: petAfter },
    imageAlt: "AI Image Editor providing quick and efficient photo editing results",
    paragraphs: [
      "This AI image editor is recommended because it makes photo editing simple and efficient. You can upload an image, choose a model, or enter a prompt to create results in seconds. It also supports quick re-edits and downloads in multiple formats, all online and free to use.",
    ],
    prompt: "Replace the background with a clean, professional studio setting while keeping the subject intact",
    imageFirst: false,
  },
  {
    icon: Mountain,
    title: "Struggling with Image Editing?",
    subtitle: "A faster, easier alternative",
    image: null,
    comparison: { before: landscapeBefore, after: landscapeAfter },
    imageAlt: "AI Image Editor solving common photo editing challenges effortlessly",
    paragraphs: [
      "Traditional image editing can be time-consuming and difficult, especially when you need to remove backgrounds or apply visual styles. Professional software can also be expensive. An AI image editor offers a faster, easier, and free way to get the results you need.",
    ],
    prompt: "Remove unwanted objects from the background and fill the area naturally to match the surrounding scene",
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
