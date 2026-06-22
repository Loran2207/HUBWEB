import { Icons, PlatformRow, TaskGlyph } from "@/components/icons";
import { SkeletonLines } from "@/components/ui/Skeleton";
import { GROUPS, IDEA, type Task } from "@/features/content-plan/data";

/** Slim progress bar shown while the AI builds the plan, pinned just under the calendar. */
function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="mb-7 rounded-card border-[0.5px] border-white/10 bg-ink-800/80 px-5 py-4">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-ui text-[14px] font-bold text-lime">
          <span className="cp-spin grid place-items-center">
            <Icons.refresh size={16} />
          </span>
          Generating content...
        </span>
        <span className="font-display text-[15px] font-extrabold tabular-nums text-fg">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{ width: percent + "%", background: "linear-gradient(90deg, var(--color-lime), var(--color-teal))" }}
        />
      </div>
    </div>
  );
}

function GenCard({ task }: { task: Task }) {
  return (
    <div className="relative mb-4 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-ink-700 p-5">
      <div className="mb-3.5 flex items-center gap-3.5">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-[14px] border-[0.5px] border-white/10 bg-ink-800"
          style={{ color: task.accent }}
        >
          <TaskGlyph name={task.glyph} size={22} />
        </span>
        <h4 className="min-w-0 flex-1 font-display text-[19px] font-bold leading-tight text-fg">
          {task.title}
        </h4>
      </div>
      <SkeletonLines lines={2} className="mb-3.5" />
      <PlatformRow platforms={task.platforms} size={20} />
    </div>
  );
}

/** Today layout while the AI streams the day's content. */
export function GeneratingBody({ percent = 20 }: { percent?: number }) {
  return (
    <div className="relative pb-6">
      <ProgressBar percent={percent} />
      <div className="mb-5">
        <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-lime">
          <Icons.sparkle size={13} /> Idea of the day
        </span>
        <h2 className="mt-2 max-w-[860px] font-display text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.15] text-fg">
          {IDEA.title}
        </h2>
      </div>
      {GROUPS[0].tasks.map((t) => (
        <GenCard key={t.id} task={t} />
      ))}
      <div className="mb-5 mt-9">
        <span className="font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-teal">
          Growth Boost
        </span>
        <h2 className="mt-2 font-display text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.15] text-fg">
          Audience Engagement
        </h2>
      </div>
      {GROUPS[1].tasks.map((t) => (
        <GenCard key={t.id} task={t} />
      ))}
    </div>
  );
}
