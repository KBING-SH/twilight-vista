import { useState, useRef, useEffect, type ReactNode } from "react";
import { Download, Share2, Mail } from "lucide-react";
import { toast } from "sonner";

interface ImageActionBarProps {
  imageUrl: string;
  compact?: boolean;
}

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.07 1.373.14v3.32c-.149-.016-.408-.024-.732-.024-1.04 0-1.44.394-1.44 1.42v2.702h3.878l-.666 3.667h-3.212v8.212A11.998 11.998 0 0 0 24 12.204 12 12 0 0 0 12 .204a12 12 0 0 0-2.899 23.487z"/></svg>
);
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);

interface SharePlatform {
  name: string;
  icon: ReactNode;
  getUrl: (url: string, imgUrl: string) => string;
}

const SHARE_PLATFORMS: SharePlatform[] = [
  { name: "Twitter / X", icon: <TwitterIcon />, getUrl: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check out this AI-generated image!")}` },
  { name: "Facebook", icon: <FacebookIcon />, getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: "Pinterest", icon: <PinterestIcon />, getUrl: (url, imgUrl) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imgUrl)}` },
  { name: "WhatsApp", icon: <WhatsAppIcon />, getUrl: (url) => `https://wa.me/?text=${encodeURIComponent(url)}` },
  { name: "LinkedIn", icon: <LinkedInIcon />, getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { name: "Telegram", icon: <TelegramIcon />, getUrl: (url) => `https://t.me/share/url?url=${encodeURIComponent(url)}` },
  { name: "Email", icon: <Mail className="w-[18px] h-[18px]" />, getUrl: (url) => `mailto:?subject=${encodeURIComponent("AI Generated Image")}&body=${encodeURIComponent(url)}` },
];

export function ImageActionBar({ imageUrl, compact = false }: ImageActionBarProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shareOpen) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shareOpen]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rita-ai-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Image downloaded");
    } catch {
      toast.error("Download failed, please try again");
    }
  };

  const handleSharePlatform = (getUrl: (url: string, imgUrl: string) => string) => {
    const shareUrl = window.location.href;
    window.open(getUrl(shareUrl, imageUrl), "_blank", "noopener,noreferrer,width=600,height=500");
    setShareOpen(false);
  };

  const btnClass = compact
    ? "w-9 h-9 rounded-lg"
    : "w-10 h-10 rounded-xl";

  return (
    <div className={`flex ${compact ? "flex-row gap-2" : "flex-col gap-2"}`}>
      {/* Download */}
      <button
        onClick={handleDownload}
        className={`${btnClass} bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer`}
        title="Download image"
      >
        <Download className={compact ? "w-4 h-4" : "w-[18px] h-[18px]"} />
      </button>

      {/* Share */}
      <div
        className="relative"
        ref={popoverRef}
        onMouseEnter={() => setShareOpen(true)}
        onMouseLeave={() => setShareOpen(false)}
      >
        <button
          className={`${btnClass} bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer ${shareOpen ? "border-primary/50 text-primary bg-primary/5" : ""}`}
          title="Share"
        >
          <Share2 className={compact ? "w-4 h-4" : "w-[18px] h-[18px]"} />
        </button>

        {shareOpen && (
          <div className="absolute z-50 top-0 right-full pr-2">
            <div className="bg-card border border-border rounded-xl shadow-lg p-2 animate-fade-in">
              <div className="flex flex-col items-center gap-1">
                {SHARE_PLATFORMS.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleSharePlatform(platform.getUrl)}
                    title={platform.name}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                  >
                    {platform.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
