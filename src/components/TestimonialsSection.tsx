import { cn } from "@/lib/utils";
import { useDraggableMarquee } from "@/hooks/use-draggable-marquee";

const testimonials = [
  {
    name: "Elena M.",
    role: "Graphic Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "I've used this free image editor AI for a mix of design tasks, and it's been surprisingly easy to work with. It helps me make quick changes without slowing down my workflow. I like that I can get cleaner visuals without opening more complicated editing software.",
  },
  {
    name: "Raj P.",
    role: "Social Media Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "This free image editor AI has been useful when I need to update images fast for social posts. I can make simple changes, test a different look, and move on without spending too much time on one file. It's made day-to-day content work a lot easier.",
  },
  {
    name: "Claire B.",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "What I liked most about this free image editor AI was how easy it felt from the start. I could upload an image, make a few changes, and get something that looked more polished almost right away. It's been helpful for keeping my content fresh without extra effort.",
  },
  {
    name: "Tomasz K.",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "I tried this AI editor when I needed a faster way to make basic image changes, and it worked well for that. It's convenient for testing edits and cleaning things up without getting pulled into a longer process. I'd use it again for quick turnaround work.",
  },
  {
    name: "Amina S.",
    role: "Blogger",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    content: "The free image editor AI made editing feel much less time-consuming for me. I could update photos, try a different visual direction, and get a result I was happy with pretty quickly. It's a nice option when I want something simple that still looks good.",
  },
  {
    name: "Lucas R.",
    role: "Marketing Assistant",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "I appreciated how straightforward this free image editor AI was to use. It helped me put together cleaner visuals for marketing materials without needing advanced editing skills. The whole process felt simple, which made it easier to work faster.",
  },
  {
    name: "Yuki N.",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    content: "This free image editor AI was helpful for both school projects and personal images. I didn't need much time to figure it out, and it made my pictures look more finished with only a few steps. It's a good tool when you want quick results without overthinking it.",
  },
  {
    name: "Marco D.",
    role: "Freelancer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    content: "I like using this free image editor AI when I need to improve an image quickly. It gives me a simple way to make changes, try different styles, and get a better final look without a lot of effort. It's been a solid addition to my regular workflow.",
  },
  {
    name: "Sofia L.",
    role: "Social Media Influencer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    content: "The free image editor AI has been great for updating visuals before I post them. I can make quick edits and get images looking more polished without spending too long on each one. I also liked that the process felt clear and easy to follow.",
  },
  {
    name: "Daniel M.",
    role: "Artist",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    content: "This free image editor AI gave me an easy way to explore new ideas without getting stuck in technical steps. I could experiment a bit, make changes quickly, and still keep the process enjoyable. For creative work, that kind of simplicity is genuinely useful.",
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
