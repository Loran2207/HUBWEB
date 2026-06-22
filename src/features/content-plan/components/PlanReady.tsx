import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { MONTH, MONTH_LABEL, type MonthDay } from "@/features/content-plan/data";

const INCLUDED = [
  { icon: "sparkle" as const, text: "Daily viral content ideas" },
  { icon: "film" as const, text: "Professional video scripts" },
  { icon: "edit" as const, text: "Ready-to-post micro posts" },
];

function IncludedIcon({ name }: { name: "sparkle" | "film" | "edit" }) {
  if (name === "film") return <Icons.film size={16} />;
  if (name === "edit") return <Icons.edit size={16} />;
  return <Icons.sparkle size={16} />;
}

function DayRow({ d, ready, last }: { d: MonthDay; ready: boolean; last: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center pt-1">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border-[0.5px] border-white/10 bg-ink-800 font-display text-[15px] font-bold leading-none text-fg">
          {d.date}
        </span>
        {!last && <span className="mt-1.5 w-px flex-1 bg-white/12" />}
      </div>
      <div className="min-w-0 flex-1 pb-5">
        <div className="rounded-card border-[0.5px] border-white/10 bg-ink-700 p-4">
          <p className="mb-2 font-display text-[16px] font-bold leading-snug text-fg">{d.idea}</p>
          {ready ? (
            <span className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-teal">
              <Icons.check size={14} strokeWidth={2.6} /> Content generated and ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold text-fg-subtle">
              <span className="cp-spin grid place-items-center">
                <Icons.refresh size={13} />
              </span>
              Content generation in progress...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/** Celebratory reveal after the AI finishes building the plan. */
export function PlanReady({ onGo }: { onGo?: () => void }) {
  const today = MONTH.find((d) => d.status === "today");
  const base = today?.date ?? 28;
  const upcoming = MONTH.filter((d) => d.date > base && d.idea).slice(0, 3);
  const rows = [today, ...upcoming].filter(Boolean) as MonthDay[];
  return (
    <div className="mx-auto max-w-[760px] pb-10">
      <div className="relative mb-7 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(184,230,68,0.12),transparent_60%)] px-6 py-9 text-center">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-lime/15 text-lime">
          <Icons.sparkle size={26} />
        </span>
        <h1 className="font-display text-[clamp(26px,3vw,38px)] font-extrabold italic leading-tight">
          <span className="text-irid-h">Your Content Plan is ready</span>
        </h1>
      </div>

      <div className="mb-7 rounded-card border-[0.5px] border-white/10 bg-white/[0.03] p-5">
        <div className="mb-3 font-ui text-[12.5px] font-semibold text-fg-subtle">What is included</div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {INCLUDED.map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2.5 rounded-input border-[0.5px] border-white/10 bg-white/5 px-3 py-2.5"
            >
              <span className="text-lime">
                <IncludedIcon name={f.icon} />
              </span>
              <span className="font-ui text-[13px] font-semibold text-fg">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 font-display text-[20px] font-bold text-fg">{MONTH_LABEL}</div>
      <div className="mb-8">
        {rows.map((d, i) => (
          <DayRow key={d.date} d={d} ready={d.status === "today"} last={i === rows.length - 1} />
        ))}
      </div>

      <Button variant="primary" size="lg" full onClick={onGo} leftIcon={<Icons.sparkle size={18} />}>
        Let us go
      </Button>
    </div>
  );
}
