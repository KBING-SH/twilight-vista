import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is a free image editor AI and what can it do?",
    a: "A free image editor AI is an online tool that helps you edit and improve images with less manual work. It can be used for tasks like enhancing photos, changing backgrounds, adjusting colors, applying styles, and making other common visual edits more easily.",
  },
  {
    q: "How does a free image editor AI create edits from uploaded photos?",
    a: "The editor analyzes the uploaded image and applies changes based on the options or instructions you provide. It can handle things like visual refinements, background updates, style changes, and other edits while keeping the main subject of the photo recognizable.",
  },
  {
    q: "Can I use a free image editor AI to edit any type of photo?",
    a: "Yes, it can be used with many types of photos. You can upload different kinds of images and apply edits such as enhancements, style changes, background adjustments, or other simple visual updates.",
  },
  {
    q: "Does the free image editor AI require complex steps to make edits?",
    a: "No, the process is usually simple. You upload your image, choose or describe the changes you want, and the AI applies the edits for you without requiring advanced manual editing.",
  },
  {
    q: "What kind of visual results can I expect from using a free image editor AI?",
    a: "The results depend on the type of edit you choose, but in general you can expect images that look cleaner, more polished, or more visually distinctive after the changes are applied.",
  },
  {
    q: "Is the free image editor AI suitable for improving profile pictures?",
    a: "Yes, it can be a useful option for profile pictures. It can help improve the overall look of an image through adjustments such as cleaner presentation, background changes, or light style edits.",
  },
  {
    q: "Does the free image editor AI support image enhancement besides style effects?",
    a: "Yes, it can also be used for general image enhancement. Depending on the tool, this may include improving details, refining the overall look, adjusting visual elements, and making the image feel more polished.",
  },
  {
    q: "How does the free image editor AI simplify the image editing process?",
    a: "It simplifies editing by handling many changes automatically after you upload an image and choose what you want to adjust. This reduces manual work and makes it easier to get usable results more quickly.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 md:py-24" itemScope itemType="https://schema.org/FAQPage">
      <div className="container px-4 md:px-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-10">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <MessageCircleQuestion className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-title">FAQ</h2>
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl border border-border/50 bg-card shadow-soft overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const isLast = i === faqs.length - 1;
            return (
              <div
                key={i}
                className={cn(!isLast && "border-b border-border/40")}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group transition-colors duration-200",
                    isOpen ? "bg-primary/[0.04]" : "hover:bg-hover-bg"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "text-xs font-bold tabular-nums w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                        isOpen
                          ? "gradient-primary text-white shadow-sm"
                          : "bg-muted text-body-desc"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      itemProp="name"
                      className={cn(
                        "text-[15px] font-medium transition-colors",
                        isOpen ? "text-title" : "text-title group-hover:text-primary"
                      )}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-180 text-primary"
                        : "text-body-desc group-hover:text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <p itemProp="text" className="px-6 pb-5 pl-[3.75rem] text-sm text-body-desc leading-[1.8]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
