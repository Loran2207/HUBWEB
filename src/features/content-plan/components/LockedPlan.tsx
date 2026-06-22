import { Icons, PlatformRow, TaskGlyph } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { GROUPS, type Task } from "@/features/content-plan/data";

/** A task card shown but gated while the subscription is lapsed. */
function LockedCard({ task }: { task: Task }) {
  return (
    <div className="relative mb-4 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-ink-700 p-5 opacity-80">
      <div className="mb-3 flex items-center gap-3.5">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-[14px] border-[0.5px] border-white/10 bg-ink-800"
          style={{ color: task.accent }}
        >
          <TaskGlyph name={task.glyph} size={22} />
        </span>
        <h4 className="min-w-0 flex-1 font-display text-[19px] font-bold leading-tight text-fg">
          {task.title}
        </h4>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg-subtle">
          <Icons.lock size={15} />
        </span>
      </div>
      <p className="mb-3 font-ui text-[14.5px] font-medium leading-normal text-fg-muted">{task.desc}</p>
      <div className="flex items-center gap-3">
        <PlatformRow platforms={task.platforms} size={20} />
        {task.format && (
          <span className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-white/10 bg-white/5 px-[11px] py-[5px] font-ui text-[12.5px] font-semibold text-fg">
            <Icons.mic size={13} /> {task.format}
          </span>
        )}
      </div>
    </div>
  );
}

/** Subscription-ended state: the day's plan is previewed but gated behind Renew. */
export function LockedPlanBody({
  endedOn,
  onRenew,
}: {
  endedOn: string;
  onRenew: () => void;
}) {
  return (
    <div>
      <div className="mb-7 overflow-hidden rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(149,97,255,0.16),transparent_60%)] p-6">
        <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-purple">
          <Icons.lock size={13} /> Content locked
        </span>
        <h2 className="mb-2 mt-2.5 font-display text-[clamp(22px,2.3vw,30px)] font-bold leading-tight text-fg">
          Your plan ended on {endedOn}
        </h2>
        <p className="mb-5 max-w-[560px] font-ui text-[15.5px] leading-relaxed text-fg-muted">
          Renew to unlock your daily content plan, scripts, and growth tasks.
        </p>
        <Button variant="primary" size="lg" onClick={onRenew} leftIcon={<Icons.sparkle size={18} />}>
          Renew subscription
        </Button>
      </div>

      <div className="mb-5">
        <span className="font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-lime">
          Idea of the day
        </span>
      </div>
      {GROUPS[0].tasks.map((t) => (
        <LockedCard key={t.id} task={t} />
      ))}

      <div className="mb-5 mt-9">
        <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-teal">
          <Icons.lock size={12} /> Growth Boost locked
        </span>
        <h2 className="mt-2 font-display text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.15] text-fg">
          Audience Engagement
        </h2>
      </div>
      {GROUPS[1].tasks.map((t) => (
        <LockedCard key={t.id} task={t} />
      ))}
    </div>
  );
}
