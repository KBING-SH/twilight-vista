import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is AI Photo to Cartoon?",
    a: "AI Photo to Cartoon is a technology that transforms your photos into cartoon-style images using artificial intelligence.",
  },
  {
    q: "How does AI Photo to Cartoon work?",
    a: "AI Photo to Cartoon uses AI algorithms to analyze your photo and recreate it with cartoon-like features and effects.",
  },
  {
    q: "Can I use AI Photo to Cartoon for any photo?",
    a: "AI Photo to Cartoon works best with clear, well-lit photos, but it can be applied to most types of images.",
  },
  {
    q: "Is AI Photo to Cartoon easy to use?",
    a: "Yes, AI Photo to Cartoon tools are designed to be user-friendly, allowing you to convert photos into cartoons quickly.",
  },
  {
    q: "Are the results from AI Photo to Cartoon customizable?",
    a: "Some AI Photo to Cartoon tools offer options to adjust the style or intensity of the cartoon effect.",
  },
  {
    q: "Can AI Photo to Cartoon be used for professional purposes?",
    a: "AI Photo to Cartoon can be used for various purposes, including personal and creative projects, depending on the quality needed.",
  },
  {
    q: "Is AI Photo to Cartoon safe to use?",
    a: "AI Photo to Cartoon services generally prioritize user privacy and data security, but it's good to review each service's policies.",
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
