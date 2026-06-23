import { Icons } from "@/components/icons";

/** Footer for the calendar: the next 30 days are gated behind a live countdown. */
export function NextPlanFooter({ days = 30, hours = 20, minutes = 30 }: { days?: number; hours?: number; minutes?: number }) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(120%_140%_at_50%_0%,rgba(78,231,255,0.12),transparent_60%)] px-7 py-9 text-center">
        <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-lime">
          <Icons.lock size={13} /> Next 30 days
        </span>
        <p className="mx-auto mt-3 max-w-[540px] font-ui text-[15px] leading-relaxed text-fg-muted">
          Your plan covers January. The next month is generating now and unlocks in
        </p>
        <div className="mt-3 font-display text-[clamp(34px,5vw,60px)] font-extrabold italic leading-none tracking-tight">
          <span className="text-irid-h">
            {pad(days)}d : {pad(hours)}h : {pad(minutes)}m
          </span>
        </div>
      </div>
    </div>
  );
}
