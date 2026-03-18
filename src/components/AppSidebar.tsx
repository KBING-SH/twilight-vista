import { useState } from "react";
import { 
  ChevronDown, ChevronRight, Image, Wand2, Palette, Layers, 
  Sparkles, X 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  children?: { label: string; active?: boolean }[];
}

const menuItems: SidebarItem[] = [
  {
    label: "AI Image",
    icon: Image,
    children: [
      { label: "Image Generation" },
      { label: "Photo to Cartoon", active: true },
      { label: "Image Enhancement" },
    ],
  },
  {
    label: "AI Effects",
    icon: Sparkles,
    children: [
      { label: "Smart Cutout" },
      { label: "Background Replace" },
    ],
  },
  {
    label: "Image Tools",
    icon: Wand2,
    children: [
      { label: "Image Compression" },
      { label: "Format Conversion" },
      { label: "Resize" },
    ],
  },
  {
    label: "Model Library",
    icon: Layers,
  },
  {
    label: "Palette",
    icon: Palette,
  },
];

interface AppSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function AppSidebar({ mobileOpen, onClose }: AppSidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "AI Image": true,
  });

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <img src="/rita-logo.webp" alt="Rita" className="h-8 w-8 rounded-lg" />
          <span className="text-base font-bold text-title">Rita</span>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-hover-bg transition-colors">
          <X className="h-5 w-5 text-body2" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-0.5">
            <button
              onClick={() => item.children && toggleExpand(item.label)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-body2 hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.children && (
                expanded[item.label] 
                  ? <ChevronDown className="h-3.5 w-3.5 text-body-desc" /> 
                  : <ChevronRight className="h-3.5 w-3.5 text-body-desc" />
              )}
            </button>
            {item.children && expanded[item.label] && (
              <div className="ml-4 mt-0.5">
                {item.children.map((child) => (
                  <button
                    key={child.label}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                      child.active
                        ? "bg-menu-selected text-primary font-medium shadow-soft"
                        : "text-body2 hover:bg-hover-bg"
                    )}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 border-r border-border/50 bg-card h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={onClose} />
          <aside className="relative w-64 h-full bg-card shadow-soft-lg">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
