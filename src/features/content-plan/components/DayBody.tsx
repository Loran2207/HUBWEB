import { Icons } from "@/components/icons";
import { TaskRow } from "@/features/content-plan/components/TaskRow";
import {
  CompletedBanner,
  LockedDay,
  RestDay,
} from "@/features/content-plan/components/DayStates";
import { GROUPS, IDEA, type MonthDay, type Task } from "@/features/content-plan/data";

function Eyebrow({
  children,
  accent,
  icon = false,
}: {
  children: string;
  accent: string;
  icon?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em]"
      style={{ color: accent }}
    >
      {icon && <Icons.sparkle size={13} />}
      {children}
    </span>
  );
}

function IdeaHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-7">
      <Eyebrow accent="var(--color-lime)" icon>
        Idea of the day
      </Eyebrow>
      <h2 className="mt-3.5 max-w-[820px] font-display text-[clamp(24px,2.3vw,30px)] font-bold leading-[1.18] text-balance text-fg">
        {title}
      </h2>
      {desc && (
        <p className="mt-2.5 max-w-[760px] font-ui text-[15.5px] font-medium leading-relaxed text-fg-muted">
          {desc}
        </p>
      )}
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
    <div className="mb-[18px] mt-1.5">
      <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      <h2 className="mt-2 font-display text-[clamp(22px,2vw,26px)] font-bold leading-tight text-fg">
        {title}
      </h2>
    </div>
  );
}

function DayPlan({
  idea,
  doneMap,
  readOnly,
  onToggle,
  onOpen,
}: {
  idea: { title: string; desc: string };
  doneMap: Record<string, boolean>;
  readOnly: boolean;
  onToggle: (id: string) => void;
  onOpen: (task: Task) => void;
}) {
  const isDone = (t: Task) => (readOnly ? true : !!doneMap[t.id]);
  return (
    <div>
      <IdeaHeader title={idea.title} desc={idea.desc} />
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
      <div className="h-3.5" />
      <SectionHeader
        eyebrow={GROUPS[1].eyebrow}
        title={GROUPS[1].title}
        accent={GROUPS[1].accent}
      />
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
  if (isToday) {
    return (
      <DayPlan
        idea={{ title: IDEA.title, desc: IDEA.desc }}
        doneMap={doneMap}
        readOnly={false}
        onToggle={onToggle}
        onOpen={onOpen}
      />
    );
  }
  if (dayMeta?.status === "done") {
    return (
      <div>
        <CompletedBanner date={selected} />
        <DayPlan
          idea={{ title: dayMeta.idea ?? "", desc: "" }}
          doneMap={doneMap}
          readOnly
          onToggle={onToggle}
          onOpen={onOpen}
        />
      </div>
    );
  }
  if (dayMeta?.status === "rest") return <RestDay date={selected} />;
  return <LockedDay date={selected} idea={dayMeta?.idea ?? null} onUnlock={onUnlock} />;
}
