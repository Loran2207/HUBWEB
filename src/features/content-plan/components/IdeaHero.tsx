import { useState } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/cn";
import { IDEA } from "@/features/content-plan/data";

const ALT_IDEAS = [
  { title: IDEA.title, desc: IDEA.desc },
  {
    title: "The 2-minute rule that builds any habit",
    desc: "Break a goal into a version so small it feels silly to skip — then show how it snowballs over a week.",
  },
  {
    title: "Why your phone is sabotaging your focus",
    desc: "A relatable walkthrough of attention drains and 3 fixes a creator can apply before lunch.",
  },
];

function Ring({ done, total }: { done: number; total: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const pct = total ? done / total : 0;
  return (
    <span className="relative grid size-[60px] place-items-center">
      <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
        <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
        <circle
          cx="30"
          cy="30"
          r={r}
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset .5s ease" }}
        />
      </svg>
      <span className="absolute font-display text-[15px] font-extrabold text-fg">
        {done}/{total}
      </span>
    </span>
  );
}

export function IdeaHero({
  done,
  total,
  taskCount,
}: {
  done: number;
  total: number;
  taskCount: number;
}) {
  const [i, setI] = useState(0);
  const [spin, setSpin] = useState(false);
  const idea = ALT_IDEAS[i] ?? ALT_IDEAS[0];

  const regenerate = () => {
    setSpin(true);
    setTimeout(() => {
      setI((p) => (p + 1) % ALT_IDEAS.length);
      setSpin(false);
    }, 460);
  };

  return (
    <section className="relative mb-7 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-white/[0.04]">
      {/* iridescent ambience */}
      <div className="pointer-events-none absolute -left-24 -top-28 size-[380px] rounded-full bg-[radial-gradient(circle,rgba(78,231,255,0.20),transparent_62%)] blur-[55px]" />
      <div className="pointer-events-none absolute -bottom-28 right-10 size-[320px] rounded-full bg-[radial-gradient(circle,rgba(184,230,68,0.14),transparent_62%)] blur-[55px]" />

      <div className="relative flex flex-wrap items-start justify-between gap-7 p-7">
        <div className="min-w-0 flex-1 basis-[460px]">
          <div className="mb-3.5 flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-lime">
              <Icons.sparkle size={13} /> Idea of the day
            </span>
            <button
              onClick={regenerate}
              title="Regenerate idea"
              className="grid size-7 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg-muted transition-colors hover:bg-white/10 hover:text-fg"
            >
              <span
                className="grid place-items-center transition-transform duration-500"
                style={{ transform: spin ? "rotate(320deg)" : "none" }}
              >
                <Icons.refresh size={14} />
              </span>
            </button>
          </div>

          <div
            className={cn("transition-opacity duration-300", spin ? "opacity-30" : "opacity-100")}
          >
            <h2 className="max-w-[640px] font-display text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.12] text-balance text-fg">
              {idea.title}
            </h2>
            <p className="mt-3 max-w-[560px] font-ui text-[15.5px] font-medium leading-relaxed text-fg-muted">
              {idea.desc}
            </p>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border-[0.5px] border-white/10 bg-white/5 px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-lime" />
            <span className="font-ui text-[13px] font-semibold text-fg-muted">
              {taskCount} tasks planned for today
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3.5 rounded-card border-[0.5px] border-white/10 bg-white/5 px-5 py-4">
          <Ring done={done} total={total} />
          <div>
            <div className="font-display text-base font-bold text-fg">Today's progress</div>
            <div className="font-ui text-[13px] font-medium text-fg-subtle">
              {done} of {total} done
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
