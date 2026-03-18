import toolImagegen from "@/assets/tool-imagegen.webp";
import toolUpscale from "@/assets/tool-upscale.png";
import toolBgRemover from "@/assets/tool-bg-remover.png";
import toolWatermark from "@/assets/tool-watermark.png";
import toolAnime from "@/assets/tool-anime.png";
import toolPixel from "@/assets/tool-pixel.webp";
import toolGhibli from "@/assets/tool-ghibli.webp";
import toolAvatar from "@/assets/tool-avatar.webp";
import toolOutpaint from "@/assets/tool-outpaint.webp";
import toolVideo from "@/assets/tool-video.webp";
import toolRestore from "@/assets/tool-restore.webp";
import toolPixar from "@/assets/tool-pixar.webp";
import { useDraggableMarquee } from "@/hooks/use-draggable-marquee";

const tools = [
  { name: "AI Image Generator", href: "https://www.rita.ai/ai-image-generator", gradient: "from-[hsl(210,80%,82%)] to-[hsl(240,65%,85%)]", image: toolImagegen },
  { name: "AI Image Upscaler", href: "https://www.rita.ai/ai-image-upscaler", gradient: "from-[hsl(270,55%,82%)] to-[hsl(300,50%,80%)]", image: toolUpscale },
  { name: "AI Background Remover", href: "https://www.rita.ai/ai-background-remover", gradient: "from-[hsl(350,60%,82%)] to-[hsl(15,65%,82%)]", image: toolBgRemover },
  { name: "AI Watermark Remover", href: "https://www.rita.ai/ai-watermark-remover", gradient: "from-[hsl(260,50%,82%)] to-[hsl(290,55%,80%)]", image: toolWatermark },
  { name: "AI Anime Generator", href: "https://www.rita.ai/ai-anime-generator", gradient: "from-[hsl(180,55%,80%)] to-[hsl(200,60%,82%)]", image: toolAnime },
  { name: "AI Pixel Art Generator", href: "https://www.rita.ai/ai-pixel-art-generator", gradient: "from-[hsl(15,70%,82%)] to-[hsl(40,65%,80%)]", image: toolPixel },
  { name: "AI Ghibli Style", href: "https://www.rita.ai/ai-ghibli-style", gradient: "from-[hsl(45,60%,82%)] to-[hsl(80,50%,80%)]", image: toolGhibli },
  { name: "AI Avatar Generator", href: "https://www.rita.ai/ai-avatar-generator", gradient: "from-[hsl(170,55%,80%)] to-[hsl(200,60%,82%)]", image: toolAvatar },
  { name: "AI Outpainting", href: "https://www.rita.ai/ai-outpainting", gradient: "from-[hsl(30,65%,82%)] to-[hsl(50,60%,80%)]", image: toolOutpaint },
  { name: "AI Video Generator", href: "https://www.rita.ai/ai-video-generator", gradient: "from-[hsl(200,65%,82%)] to-[hsl(230,55%,85%)]", image: toolVideo },
  { name: "AI Pixar Style", href: "https://www.rita.ai/ai-pixar-style", gradient: "from-[hsl(300,45%,82%)] to-[hsl(330,50%,80%)]", image: toolPixar },
  { name: "AI Photo Restore", href: "https://www.rita.ai/ai-photo-restore", gradient: "from-[hsl(150,50%,80%)] to-[hsl(180,55%,82%)]", image: toolRestore },
];

export function ToolkitSection() {
  const repeated = [...tools, ...tools, ...tools, ...tools];
  const { scrollRef, handlers } = useDraggableMarquee();

  return (
    <nav aria-labelledby="more-tools-title" className="py-10 md:py-24 bg-card-alt overflow-hidden">
      <div className="container px-4 md:px-8 max-w-6xl mb-6 md:mb-10">
        <h2 id="more-tools-title" className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          Explore More Rita AI Image Tools
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center">
          Upscale, remove backgrounds, generate pixel art and more — all powered by AI
        </p>
      </div>

      <ul
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none scrollbar-hide list-none p-0 m-0"
        style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
        {...handlers}
      >
        <li className="contents">
          <div ref={scrollRef} className="flex gap-5 w-max animate-marquee" style={{ willChange: "transform" }}>
            {repeated.map((t, i) => (
              <a
                key={i}
                href={t.href}
                className="shrink-0 w-[220px] md:w-[260px] cursor-pointer group block"
                draggable={false}
              >
                <div className={`rounded-2xl bg-gradient-to-br ${t.gradient} p-5 pb-0 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-lg`}>
                  <h3 className="text-sm font-bold text-title mb-4">{t.name}</h3>
                  <div className="flex justify-center">
                    <img
                      src={t.image}
                      alt={`${t.name} — AI-powered creative tool by Rita`}
                      className="w-[85%] aspect-[3/4] object-cover object-top rounded-t-xl shadow-lg"
                      loading="lazy"
                      width="187"
                      height="249"
                      draggable={false}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
}
