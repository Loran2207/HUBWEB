import { useState } from "react";
import type { ReactNode } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/cn";
import { TaskRow } from "@/features/content-plan/components/TaskRow";
import {
  CompletedBanner,
  LockedDay,
  RestDay,
} from "@/features/content-plan/components/DayStates";
import { GROUPS, IDEA, type MonthDay, type Task } from "@/features/content-plan/data";

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

/** One section heading — shared by both blocks so they read as equivalent. */
function SectionHeading({
  eyebrow,
  accent,
  icon,
  title,
  desc,
  right,
  dim,
}: {
  eyebrow: string;
  accent: string;
  icon?: boolean;
  title: string;
  desc?: string;
  right?: ReactNode;
  dim?: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="mb-3.5 flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em]"
          style={{ color: accent }}
        >
          {icon && <Icons.sparkle size={13} />}
          {eyebrow}
        </span>
        {right}
      </div>
      <h2
        className={cn(
          "max-w-[680px] font-display text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.12] text-balance transition-opacity duration-300",
          dim ? "text-fg/30" : "text-fg",
        )}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={cn(
            "mt-3 max-w-[600px] font-ui text-[15.5px] font-medium leading-relaxed transition-opacity duration-300",
            dim ? "text-fg-muted/40" : "text-fg-muted",
          )}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

function ProgressPill({ done, total }: { done: number; total: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-[0.5px] border-white/10 bg-white/5 py-1 pl-1.5 pr-3">
      <span className="grid size-5 place-items-center rounded-full bg-lime/15 text-[10px] font-extrabold text-lime">
        {done}
      </span>
      <span className="font-ui text-[12.5px] font-semibold text-fg-muted">
        {done} / {total} done today
      </span>
    </span>
  );
}

function RegenButton({ onClick, spinning }: { onClick: () => void; spinning: boolean }) {
  return (
    <button
      onClick={onClick}
      title="Regenerate idea"
      className="grid size-7 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg-muted transition-colors hover:bg-white/10 hover:text-fg"
    >
      <span
        className="grid place-items-center transition-transform duration-500"
        style={{ transform: spinning ? "rotate(320deg)" : "none" }}
      >
        <Icons.refresh size={14} />
      </span>
    </button>
  );
}

function TaskList({
  tasks,
  doneMap,
  readOnly,
  onToggle,
  onOpen,
}: {
  tasks: readonly Task[];
  doneMap: Record<string, boolean>;
  readOnly: boolean;
  onToggle: (id: string) => void;
  onOpen: (task: Task) => void;
}) {
  return (
    <>
      {tasks.map((t) => (
        <TaskRow
          key={t.id}
          task={t}
          done={readOnly ? true : !!doneMap[t.id]}
          readOnly={readOnly}
          onToggle={() => onToggle(t.id)}
          onOpen={onOpen}
        />
      ))}
    </>
  );
}

function GrowthSection({
  doneMap,
  readOnly,
  onToggle,
  onOpen,
}: {
  doneMap: Record<string, boolean>;
  readOnly: boolean;
  onToggle: (id: string) => void;
  onOpen: (task: Task) => void;
}) {
  return (
    <div className="mt-10">
      <SectionHeading eyebrow={GROUPS[1].eyebrow} accent="var(--color-teal)" title={GROUPS[1].title} />
      <TaskList tasks={GROUPS[1].tasks} doneMap={doneMap} readOnly={readOnly} onToggle={onToggle} onOpen={onOpen} />
    </div>
  );
}

export function DayBody({
  selected,
  dayMeta,
  isToday,
  doneMap,
  progress,
  onToggle,
  onOpen,
  onUnlock,
}: {
  selected: number;
  dayMeta: MonthDay | undefined;
  isToday: boolean;
  doneMap: Record<string, boolean>;
  progress: { done: number; total: number };
  onToggle: (id: string) => void;
  onOpen: (task: Task) => void;
  onUnlock: () => void;
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

  if (isToday) {
    return (
      <div>
        <SectionHeading
          eyebrow="Idea of the day"
          accent="var(--color-lime)"
          icon
          title={idea.title}
          desc={idea.desc}
          dim={spin}
          right={
            <>
              <RegenButton onClick={regenerate} spinning={spin} />
              <span className="ml-auto">
                <ProgressPill done={progress.done} total={progress.total} />
              </span>
            </>
          }
        />
        <TaskList tasks={GROUPS[0].tasks} doneMap={doneMap} readOnly={false} onToggle={onToggle} onOpen={onOpen} />
        <GrowthSection doneMap={doneMap} readOnly={false} onToggle={onToggle} onOpen={onOpen} />
      </div>
    );
  }

  if (dayMeta?.status === "done") {
    return (
      <div>
        <CompletedBanner date={selected} />
        <SectionHeading
          eyebrow="Idea of the day"
          accent="var(--color-lime)"
          icon
          title={dayMeta.idea ?? ""}
        />
        <TaskList tasks={GROUPS[0].tasks} doneMap={doneMap} readOnly onToggle={onToggle} onOpen={onOpen} />
        <GrowthSection doneMap={doneMap} readOnly onToggle={onToggle} onOpen={onOpen} />
      </div>
    );
  }

  if (dayMeta?.status === "rest") return <RestDay date={selected} />;
  return <LockedDay date={selected} idea={dayMeta?.idea ?? null} onUnlock={onUnlock} />;
}
