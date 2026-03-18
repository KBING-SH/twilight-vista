import { useRef } from "react";
import { Loader2, ChevronLeft, ChevronRight, X, Trash2 } from "lucide-react";
import { ImageActionBar } from "@/components/ImageActionBar";

interface HistoryItem {
  img: string;
  ratio: string;
  ratioLabel: string;
  time: Date;
}

interface ResultDisplayProps {
  isGenerating: boolean;
  generatedImg: string | null;
  generatedRatio: string;
  history: HistoryItem[];
  selectedHistoryIdx: number | null;
  onSetHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
  onSetSelectedHistoryIdx: React.Dispatch<React.SetStateAction<number | null>>;
  onSetGeneratedImg: React.Dispatch<React.SetStateAction<string | null>>;
  onPreview: (idx: number) => void;
  compact?: boolean;
  historyOnly?: boolean;
}

export function ResultDisplay({
  isGenerating,
  generatedImg,
  generatedRatio,
  history,
  selectedHistoryIdx,
  onSetHistory,
  onSetSelectedHistoryIdx,
  onSetGeneratedImg,
  onPreview,
  compact = false,
  historyOnly = false,
}: ResultDisplayProps) {
  const historyRef = useRef<HTMLDivElement>(null);

  const scrollHistory = (dir: number) => {
    historyRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  const hasContent = isGenerating || generatedImg || history.length > 0;
  if (!hasContent) return null;

  return (
    <div className={compact ? "px-3 pb-3" : ""}>
      {/* Generated image / loading */}
      {!historyOnly && (isGenerating || generatedImg) && (
        <div className={`flex items-center justify-center ${compact ? "py-3" : "flex-1 min-h-0 w-full px-4 pb-4"}`}>
          {isGenerating ? (
            <div
              className={`rounded-2xl border border-border/50 bg-muted/30 flex flex-col items-center justify-center gap-3 ${
                compact ? "w-full h-48" : "h-full max-w-full"
              }`}
              style={compact ? undefined : { aspectRatio: generatedRatio }}
            >
              <Loader2 className={`text-primary animate-spin ${compact ? "w-8 h-8" : "w-10 h-10"}`} />
              <p className="text-sm text-muted-foreground">Generating...</p>
            </div>
          ) : generatedImg ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <div
                className={`rounded-2xl overflow-hidden border border-border/50 shadow-lg animate-fade-in ${
                  compact ? "w-full h-48" : "h-full max-w-full"
                }`}
                style={compact ? undefined : { aspectRatio: generatedRatio }}
              >
                <img src={generatedImg} alt="Generated result" className="w-full h-full object-cover" />
              </div>
              <ImageActionBar imageUrl={generatedImg} compact />
            </div>
          ) : null}
        </div>
      )}

      {/* History strip */}
      {history.length > 0 && (
        <div className={compact ? "pt-2" : "shrink-0 w-full px-4 pb-3"}>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline gap-2">
              <span className={`font-semibold text-title ${compact ? "text-xs" : "text-sm"}`}>History</span>
              <span className="text-[11px] text-muted-foreground">Up to 30 records saved</span>
            </div>
            <button
              onClick={() => { onSetHistory([]); onSetSelectedHistoryIdx(null); onSetGeneratedImg(null); }}
              className="text-muted-foreground hover:text-destructive transition-colors"
              title="Clear history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex items-start gap-2">
            {history.length > (compact ? 4 : 6) && (
              <button
                onClick={() => scrollHistory(-1)}
                className="shrink-0 w-7 h-7 mt-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-title" />
              </button>
            )}
            <div
              ref={historyRef}
              className="flex-1 flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide"
            >
              {history.map((item, i) => (
                <div key={i} className={`shrink-0 flex flex-col items-center gap-1 pt-2 ${compact ? "pr-1" : "pr-2"}`}>
                  <div className="relative">
                    <button
                      onClick={() => onPreview(i)}
                      className={`rounded-xl flex items-center justify-center border-2 transition-all ${
                        compact ? "w-16 h-16" : "w-20 h-20"
                      } ${
                        item.ratio !== "1/1" ? "bg-muted/50" : ""
                      } ${
                        selectedHistoryIdx === i ? "border-primary shadow-sm" : "border-border/30 hover:border-primary/40"
                      }`}
                    >
                      <div
                        className={`rounded-lg overflow-hidden ${compact ? "max-w-[56px] max-h-[56px]" : "max-w-[72px] max-h-[72px]"}`}
                        style={{ aspectRatio: item.ratio }}
                      >
                        <img src={item.img} alt={`History ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSetHistory((prev) => prev.filter((_, idx) => idx !== i));
                        if (selectedHistoryIdx === i) {
                          onSetSelectedHistoryIdx(null);
                          onSetGeneratedImg(null);
                        } else if (selectedHistoryIdx !== null && selectedHistoryIdx > i) {
                          onSetSelectedHistoryIdx(selectedHistoryIdx - 1);
                        }
                      }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors z-10"
                    >
                      <X className="w-3 h-3 text-background" />
                    </button>
                  </div>
                  <span className="text-[9px] font-medium text-muted-foreground">{item.ratioLabel}</span>
                  {!compact && (
                    <span className="text-[9px] text-muted-foreground">
                      {item.time.toLocaleDateString("en-US")} {item.time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {history.length > (compact ? 4 : 6) && (
              <button
                onClick={() => scrollHistory(1)}
                className="shrink-0 w-7 h-7 mt-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-title" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
