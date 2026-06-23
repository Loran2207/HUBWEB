import { CalendarPanel } from "@/features/content-plan/components/Calendar";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/icons";
import { MONTH, weekFor } from "@/features/content-plan/data";

const INCLUDED = [
  { icon: "sparkle" as const, text: "Daily viral ideas" },
  { icon: "film" as const, text: "Video scripts" },
  { icon: "edit" as const, text: "Ready-to-post copy" },
];

function Chip({ name, text }: { name: "sparkle" | "film" | "edit"; text: string }) {
  const Ic = name === "film" ? Icons.film : name === "edit" ? Icons.edit : Icons.sparkle;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-white/10 bg-white/5 px-3 py-1.5 font-ui text-[12.5px] font-semibold text-fg">
      <span className="text-lime"><Ic size={14} /></span>
      {text}
    </span>
  );
}

/** Celebratory reveal: a fresh-plan header on top of the month calendar grid. */
export function PlanReady({ onGo }: { onGo?: () => void }) {
  const week = weekFor(0);
  return (
    <div>
      <div className="relative mb-7 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(130%_140%_at_0%_0%,rgba(78,231,255,0.14),transparent_55%),radial-gradient(120%_130%_at_100%_0%,rgba(184,230,68,0.12),transparent_55%)] px-7 py-7">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-lime">
              <Icons.sparkle size={13} /> Plan ready
            </span>
            <h1 className="mt-2 font-display text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.012em]">
              <span className="text-irid-h">Your Content Plan is ready</span>
            </h1>
            <p className="mt-3 max-w-[620px] font-ui text-[16px] leading-relaxed text-fg-muted">
              The whole month is planned ahead. Ideas, scripts and growth tasks, ready when you wake up.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {INCLUDED.map((f) => (
                <Chip key={f.text} name={f.icon} text={f.text} />
              ))}
            </div>
          </div>
          <Button variant="primary" size="lg" className="min-w-[210px] px-9" onClick={onGo} leftIcon={<Icons.sparkle size={18} />}>
            Let us go
          </Button>
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
      />
    </div>
  );
}
