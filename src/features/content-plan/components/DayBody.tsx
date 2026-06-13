import { Icons } from "@/components/icons";
import { TaskRow } from "@/features/content-plan/components/TaskRow";
import { IdeaHero } from "@/features/content-plan/components/IdeaHero";
import {
  CompletedBanner,
  LockedDay,
  RestDay,
} from "@/features/content-plan/components/DayStates";
import { GROUPS, PLAN, type MonthDay, type Task } from "@/features/content-plan/data";

function Eyebrow({ children, accent }: { children: string; accent: string }) {
  return (
    <div
      className="mb-[18px] font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em]"
      style={{ color: accent }}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="mb-[18px] mt-8">
      <span
        className="font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em]"
        style={{ color: accent }}
      >
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-bold leading-tight text-fg">
        {title}
      </h2>
    </div>
  );
}

function TaskGroups({
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
  const isDone = (t: Task) => (readOnly ? true : !!doneMap[t.id]);
  return (
    <div>
      <Eyebrow accent="var(--color-fg-subtle)">Create &amp; publish</Eyebrow>
      {GROUPS[0].tasks.map((t) => (
        <TaskRow
          key={t.id}
          task={t}
          done={isDone(t)}
          readOnly={readOnly}
          onToggle={() => onToggle(t.id)}
          onOpen={onOpen}
        />
      ))}
      <SectionHeader eyebrow={GROUPS[1].eyebrow} title={GROUPS[1].title} accent={GROUPS[1].accent} />
      {GROUPS[1].tasks.map((t) => (
        <TaskRow
          key={t.id}
          task={t}
          done={isDone(t)}
          readOnly={readOnly}
          onToggle={() => onToggle(t.id)}
          onOpen={onOpen}
        />
      ))}
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
  if (isToday) {
    return (
      <div>
        <IdeaHero done={progress.done} total={progress.total} taskCount={PLAN.length} />
        <TaskGroups doneMap={doneMap} readOnly={false} onToggle={onToggle} onOpen={onOpen} />
      </div>
    );
  }
  if (dayMeta?.status === "done") {
    return (
      <div>
        <CompletedBanner date={selected} />
        <div className="mb-7">
          <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.04em] text-fg-subtle">
            <Icons.sparkle size={13} /> That day's idea
          </span>
          <h2 className="mt-2.5 max-w-[760px] font-display text-[clamp(22px,2.1vw,28px)] font-bold leading-snug text-fg">
            {dayMeta.idea}
          </h2>
        </div>
        <TaskGroups doneMap={doneMap} readOnly onToggle={onToggle} onOpen={onOpen} />
      </div>
    );
  }
  if (dayMeta?.status === "rest") return <RestDay date={selected} />;
  return <LockedDay date={selected} idea={dayMeta?.idea ?? null} onUnlock={onUnlock} />;
}
