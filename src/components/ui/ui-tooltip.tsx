// components/ui/tooltip.tsx
import { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function UiTooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-flex group">
      {children}

      <span
        className={`
          pointer-events-none absolute z-50 whitespace-nowrap rounded-md
          bg-slate-800 px-2 py-1 text-xs text-white opacity-0
          transition-opacity duration-200
          group-hover:opacity-100
          ${positionClasses[position]}
        `}
      >
        {content}
      </span>
    </div>
  );
}