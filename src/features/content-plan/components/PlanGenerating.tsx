import { CalendarPanel } from "@/features/content-plan/components/Calendar";
import { Icons } from "@/components/icons";
import { MONTH, weekFor } from "@/features/content-plan/data";

/** The plan is still being generated: a progress header + a calendar whose later cells are still loading. */
export function PlanGenerating({ percent = 40 }: { percent?: number }) {
  const week = weekFor(0);
  const phase = (date: number) => (date <= 13 ? ("generated" as const) : ("generating" as const));
  return (
    <div>
      <div className="relative mb-7 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(130%_140%_at_0%_0%,rgba(78,231,255,0.12),transparent_55%)] px-7 py-7">
        <span className="inline-flex items-center gap-2 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-lime">
          <span className="cp-spin grid place-items-center">
            <Icons.refresh size={13} />
          </span>
          Building your plan
        </span>
        <h1 className="mt-2 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.06] tracking-[-0.012em]">
          <span className="text-irid-h">Generating your Content Plan</span>
        </h1>
        <p className="mt-3 max-w-[620px] font-ui text-[15px] leading-relaxed text-fg-muted">
          We are writing ideas, scripts and growth tasks for the whole month. Days fill in as they are ready.
        </p>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-ui text-[13px] font-bold text-lime">Generating content...</span>
            <span className="font-display text-[14px] font-extrabold tabular-nums text-fg">{percent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full" style={{ width: percent + "%", background: "linear-gradient(90deg, var(--color-lime), var(--color-teal))" }} />
          </div>
        </div>
      </div>
      <CalendarPanel
        week={week}
        month={MONTH}
        selected={28}
        view="month"
        weekOffset={0}
        onView={() => {}}
        onSelect={() => {}}
        onPrevWeek={() => {}}
        onNextWeek={() => {}}
        cellPhase={phase}
      />
    </div>
  );
}
