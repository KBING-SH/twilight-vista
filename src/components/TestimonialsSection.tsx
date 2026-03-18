import { cn } from "@/lib/utils";
import { useDraggableMarquee } from "@/hooks/use-draggable-marquee";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Graphic Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "I found the AI Photo to Cartoon tool quite useful for creating unique cartoon versions of my photos. The results were generally good, though sometimes the cartoon effect felt a bit too strong. Overall, it's a handy tool for quick cartoon transformations.",
  },
  {
    name: "David L.",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "This AI Photo to Cartoon service made it easy to turn my photos into cartoons. The process was straightforward, and the output looked natural for the most part. It's a convenient way to add a creative touch to images without much effort.",
  },
  {
    name: "Emily R.",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "The AI Photo to Cartoon feature worked, but I noticed some inconsistencies in how it rendered different photos. Some cartoons looked great, while others missed details. It's a decent tool but could use some improvements for more consistent results.",
  },
  {
    name: "Michael T.",
    role: "Marketing Specialist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "Using AI Photo to Cartoon helped me produce cartoon-style images quickly. The tool is simple to use and delivers satisfying results, though occasionally the cartoon effect was a bit exaggerated. Still, it's a useful option for casual cartoonizing.",
  },
  {
    name: "Jessica K.",
    role: "Social Media Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    content: "I enjoyed experimenting with AI Photo to Cartoon to create fun, cartoon-like images for social media. The results were appealing, and the tool was easy to navigate. Some photos worked better than others, but overall it's a good creative resource.",
  },
  {
    name: "Alex W.",
    role: "Illustrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "As an illustrator, I was curious about AI Photo to Cartoon. It surprised me — the Ghibli and ink wash styles are genuinely impressive. I now use it for quick concept references before starting my own illustrations. Great time saver.",
  },
  {
    name: "Rachel H.",
    role: "Teacher",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    content: "My students absolutely loved seeing their class photos turned into cartoons! AI Photo to Cartoon made our end-of-year slideshow so much more fun. The process was easy enough that even my less tech-savvy colleagues could use it.",
  },
  {
    name: "James P.",
    role: "Small Business Owner",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    content: "I used AI Photo to Cartoon to create cartoon avatars for my team's profile pictures on our website. Customers love the friendly, approachable look. It was ready to use directly — no extra editing needed.",
  },
  {
    name: "Linda C.",
    role: "Pet Blogger",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    content: "Turning my cats' photos into cartoon portraits was the highlight of my week! AI Photo to Cartoon captured their personalities perfectly. My followers on Instagram went crazy for the results. Definitely recommend for any pet content creator.",
  },
  {
    name: "Chris N.",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    content: "The variety of styles in AI Photo to Cartoon is what sets it apart. I've tried pixel, chibi, and realistic — each produces a distinct look. It's become part of my design toolkit for creating playful mockups and presentation visuals.",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  const { scrollRef, handlers } = useDraggableMarquee();

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] cursor-grab active:cursor-grabbing select-none touch-none scrollbar-hide"
      {...handlers}
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-3 md:gap-5 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ willChange: "transform" }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <li
            key={i}
            className="w-[260px] md:w-[380px] shrink-0 rounded-xl md:rounded-2xl border border-border/50 bg-card p-3 md:p-5 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
          >
            <figure>
              <blockquote className="text-xs md:text-sm text-body2 leading-relaxed md:leading-[1.75] mb-2 md:mb-4 line-clamp-3">
                "{t.content}"
              </blockquote>
              <figcaption className="flex items-center gap-2 md:gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name}, ${t.role}`}
                  className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
                  loading="lazy"
                  width="36"
                  height="36"
                  draggable={false}
                />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-title leading-snug">
                    {t.name}
                  </p>
                  <p className="text-[10px] md:text-xs text-body-desc">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="py-10 md:py-24 overflow-hidden"
      aria-labelledby="user-feedback-title"
    >
      <div className="container px-4 md:px-8 max-w-6xl mb-6 md:mb-12">
        <h2 id="user-feedback-title" className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          What Users Say
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center max-w-lg mx-auto">
          Sample feedback from users who tried Rita for cartoon-style image creation.
        </p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
