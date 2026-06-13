import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ScreenHeader({
  title,
  subtitle,
  hero = false,
  right,
}: {
  title: string;
  subtitle?: string;
  hero?: boolean;
  right?: ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="flex flex-wrap items-start gap-6">
        <div className="min-w-0 flex-1 basis-[420px]">
          <h1
            className={cn(
              "font-display font-bold leading-[1.08] tracking-[-0.011em] text-balance text-fg",
              hero ? "text-[clamp(34px,4.2vw,54px)]" : "text-[clamp(26px,2.4vw,32px)]",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-3.5 max-w-[640px] font-display font-normal leading-snug text-fg/90",
                hero ? "text-[clamp(17px,1.7vw,22px)]" : "text-lg",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {right && <div className="shrink-0 pt-2">{right}</div>}
      </div>
    </div>
  );
}
