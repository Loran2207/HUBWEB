import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Page hero. The whole title renders in the iridescent gradient; `orb` bleeds
 * the transparent holographic orb off the top-right of the black canvas.
 */
export function ScreenHeader({
  title,
  accentWord,
  subtitle,
  hero = false,
  orb = false,
  right,
}: {
  title: string;
  accentWord?: string;
  subtitle?: string;
  hero?: boolean;
  orb?: boolean;
  right?: ReactNode;
}) {
  const fullTitle = accentWord ? `${title} ${accentWord}` : title;
  return (
    <div className="relative mb-9">
      {orb && (
        <div className="pointer-events-none absolute -top-16 right-[-28px] z-0 hidden h-[360px] w-[600px] max-w-[50%] md:block">
          <img
            src="/hero/orb.webp"
            alt=""
            aria-hidden
            draggable={false}
            className="size-full object-contain object-right-top"
          />
        </div>
      )}
      <div className="relative z-10 flex flex-wrap items-start gap-6">
        <div className="min-w-0 flex-1 basis-[520px]">
          <h1
            className={cn(
              "font-display font-bold leading-[1.04] tracking-[-0.015em]",
              hero ? "text-[clamp(36px,4.4vw,56px)]" : "text-[clamp(26px,2.4vw,32px)]",
            )}
          >
            <span className="text-irid-h">{fullTitle}</span>
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-4 max-w-[760px] font-display font-normal leading-snug text-fg/70",
                hero ? "text-[clamp(16px,1.5vw,20px)]" : "text-lg",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {right && <div className="relative z-10 shrink-0 pt-2">{right}</div>}
      </div>
    </div>
  );
}
