import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Page hero. `accentWord` renders the trailing word in the iridescent gradient
 * (matches "Explore Templates"). `orb` bleeds the holographic banner off the
 * top-right, blended into the black canvas.
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
  return (
    <div className="relative mb-9">
      {orb && (
        <div className="pointer-events-none absolute -top-20 right-[-56px] z-0 hidden h-[340px] w-[720px] max-w-[58%] md:block">
          <img
            src="/hero/orb.webp"
            alt=""
            aria-hidden
            className="size-full object-cover object-right"
            style={{
              mixBlendMode: "plus-lighter",
              maskImage:
                "radial-gradient(135% 130% at 100% 12%, #000 34%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(135% 130% at 100% 12%, #000 34%, transparent 72%)",
            }}
          />
        </div>
      )}
      <div className="relative z-10 flex flex-wrap items-start gap-6">
        <div className="min-w-0 flex-1 basis-[420px]">
          <h1
            className={cn(
              "font-display font-bold leading-[1.04] tracking-[-0.015em] text-balance text-fg",
              hero ? "text-[clamp(36px,4.4vw,56px)]" : "text-[clamp(26px,2.4vw,32px)]",
            )}
          >
            {title}
            {accentWord && (
              <>
                {" "}
                <span className="text-irid-h">{accentWord}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-4 max-w-[560px] font-display font-normal leading-snug text-fg/70",
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
