import { useState } from "react";
import type { ReactNode } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/cn";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
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
    desc: "Break a goal into a version so small it feels silly to skip, then show how it snowballs over a week.",
  },
  {
    title: "Why your phone is sabotaging your focus",
    desc: "A relatable walkthrough of attention drains and 3 fixes a creator can apply before lunch.",
  },
];

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
    <div className="mb-5">
      <div className="mb-2 flex items-center gap-2.5">
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
          "max-w-[860px] font-display text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.15] transition-opacity duration-300",
          dim ? "text-fg/30" : "text-fg",
        )}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={cn(
            "mt-3 max-w-[760px] font-ui text-[15.5px] font-medium leading-relaxed transition-opacity duration-300",
            dim ? "text-fg-muted/40" : "text-fg-muted",
          )}
        >
          {desc}
        </p>
      )}
    </div>
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
    <div className="mt-9">
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
  onToggle,
  onOpen,
  onUnlock,
}: {
  selected: number;
  dayMeta: MonthDay | undefined;
  isToday: boolean;
  doneMap: Record<string, boolean>;
  onToggle: (id: string) => void;
  onOpen: (task: Task) => void;
  onUnlock: () => void;
}) {
  const [i, setI] = useState(0);
  const [spin, setSpin] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
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
          right={<RegenButton onClick={() => setConfirmOpen(true)} spinning={spin} />}
        />
        <TaskList tasks={GROUPS[0].tasks} doneMap={doneMap} readOnly={false} onToggle={onToggle} onOpen={onOpen} />
        <GrowthSection doneMap={doneMap} readOnly={false} onToggle={onToggle} onOpen={onOpen} />

        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Regenerate today's idea?"
          message="We'll suggest a fresh idea and refresh your video script and post to match. Your current ones will be replaced."
          confirmLabel="Regenerate"
          onConfirm={regenerate}
        />
      </div>
    );
  }

  if (dayMeta?.status === "done") {
    return (
      <div>
        <CompletedBanner date={selected} />
        <SectionHeading eyebrow="Idea of the day" accent="var(--color-lime)" icon title={dayMeta.idea ?? ""} />
        <TaskList tasks={GROUPS[0].tasks} doneMap={doneMap} readOnly onToggle={onToggle} onOpen={onOpen} />
        <GrowthSection doneMap={doneMap} readOnly onToggle={onToggle} onOpen={onOpen} />
      </div>
    );
  }

  if (dayMeta?.status === "rest") return <RestDay date={selected} />;
  return <LockedDay date={selected} idea={dayMeta?.idea ?? null} onUnlock={onUnlock} />;
}
