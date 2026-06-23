import { Icons } from "@/components/icons";
import { SkeletonBar } from "@/components/ui/Skeleton";

/** A locked, still-generating upcoming day shown below the 30 live calendar days. */
function GenRow({ date }: { date: number }) {
  return (
    <div className="flex items-center gap-4 rounded-card border-[0.5px] border-white/10 bg-ink-700 px-5 py-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border-[0.5px] border-white/10 bg-ink-800 font-display text-[14px] font-bold text-fg-muted">
        {date}
      </span>
      <div className="min-w-0 flex-1">
        <SkeletonBar w="56%" h={13} className="mb-2.5" />
        <span className="inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-fg-subtle">
          <span className="cp-spin grid place-items-center">
            <Icons.refresh size={13} />
          </span>
          Content generation in progress...
        </span>
      </div>
      <span className="text-fg-faint">
        <Icons.lock size={16} />
      </span>
    </div>
  );
}

/** Footer for the calendar: the next 30 days are gated behind a live countdown. */
export function NextPlanFooter({ days = 30, hours = 20, minutes = 30 }: { days?: number; hours?: number; minutes?: number }) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <div className="mt-8">
      <div className="mb-6 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(120%_140%_at_50%_0%,rgba(78,231,255,0.12),transparent_60%)] px-7 py-8 text-center">
        <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-lime">
          <Icons.lock size={13} /> Next 30 days
        </span>
        <p className="mx-auto mt-3 max-w-[520px] font-ui text-[15px] leading-relaxed text-fg-muted">
          Your plan covers January. The next month is generating now and unlocks in
        </p>
        <div className="mt-3 font-display text-[clamp(34px,5vw,60px)] font-extrabold italic leading-none tracking-tight">
          <span className="text-irid-h">
            {pad(days)}d : {pad(hours)}h : {pad(minutes)}m
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((d) => (
          <GenRow key={d} date={d} />
        ))}
      </div>
    </div>
  );
}
