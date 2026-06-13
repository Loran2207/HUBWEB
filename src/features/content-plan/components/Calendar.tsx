import { useState } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/cn";
import {
  FIRST_WEEKDAY,
  MONTH_LABEL,
  YEAR_LABEL,
  type DayStatus,
  type MonthDay,
  type WeekDay,
} from "@/features/content-plan/data";

export type CalendarView = "week" | "month";

function StatusMark({ status, onLime }: { status: DayStatus; onLime: boolean }) {
  if (status === "done")
    return (
      <span className="grid size-6 place-items-center rounded-full bg-teal/15 text-teal">
        <Icons.check size={14} strokeWidth={2.6} />
      </span>
    );
  if (status === "today")
    return (
      <span
        className={cn(
          "rounded-full px-2.5 py-[3px] font-ui text-xs font-bold",
          onLime ? "bg-black/15 text-on-lime" : "bg-lime/15 text-lime",
        )}
      >
        2 / 3
      </span>
    );
  if (status === "rest") return <span className="text-[13px] opacity-70">🌙</span>;
  if (status === "upcoming" || status === "locked")
    return <Icons.lock size={13} className="text-fg-faint" />;
  return <span className="size-1.5 rounded-full bg-fg-faint" />;
}

function DayCell({
  day,
  selected,
  onSelect,
}: {
  day: WeekDay;
  selected: boolean;
  onSelect: () => void;
}) {
  const isToday = day.status === "today";
  const limeSel = selected && isToday;
  if (day.status === "out") {
    return (
      <span className="flex flex-col items-center gap-3 px-2 pb-3.5 pt-4 opacity-30">
        <span className="font-logo text-xs font-bold uppercase tracking-wider text-fg-subtle">
          {day.dow}
        </span>
        <span className="font-display text-3xl font-bold leading-none text-fg-faint">
          {day.date}
        </span>
        <span className="size-1.5" />
      </span>
    );
  }
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-3 px-2 pb-3.5 pt-4 transition-all",
        "rounded-card border-[0.5px]",
        limeSel
          ? "border-transparent bg-lime shadow-[0_8px_28px_rgba(184,230,68,0.25)]"
          : selected
            ? "border-transparent bg-white/10"
            : "border-white/10 hover:-translate-y-0.5 hover:bg-white/5",
      )}
    >
      <span
        className={cn(
          "font-logo text-xs font-bold uppercase tracking-wider",
          limeSel ? "text-on-lime/65" : "text-fg-subtle",
        )}
      >
        {day.dow}
      </span>
      <span
        className={cn(
          "font-display text-3xl font-bold leading-none",
          limeSel ? "text-on-lime" : isToday ? "text-lime" : "text-fg",
        )}
      >
        {day.date}
      </span>
      <StatusMark status={day.status} onLime={limeSel} />
    </button>
  );
}

function WeekStrip({
  week,
  selected,
  onSelect,
}: {
  week: readonly WeekDay[];
  selected: number;
  onSelect: (d: number) => void;
}) {
  return (
    <div className="grid grid-cols-7 gap-2.5">
      {week.map((d) => (
        <DayCell
          key={d.date}
          day={d}
          selected={selected === d.date}
          onSelect={() => onSelect(d.date)}
        />
      ))}
    </div>
  );
}

function MonthCell({
  d,
  selected,
  onSelect,
}: {
  d: MonthDay;
  selected: boolean;
  onSelect: () => void;
}) {
  const isToday = d.status === "today";
  const limeSel = selected && isToday;
  const locked = d.status === "locked";
  const dot =
    d.status === "done"
      ? "var(--color-teal)"
      : isToday
        ? "var(--color-lime)"
        : "var(--color-fg-faint)";
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative flex min-h-[104px] flex-col overflow-hidden rounded-input p-3 text-left transition-colors",
        "border-[0.5px]",
        limeSel
          ? "border-transparent bg-lime"
          : selected
            ? "border-transparent bg-white/10"
            : "border-white/10 bg-white/5 hover:bg-white/8",
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={cn(
            "font-display text-base font-bold",
            limeSel ? "text-on-lime" : isToday ? "text-lime" : "text-fg",
          )}
        >
          {d.date}
        </span>
        {d.status === "done" && (
          <span className={limeSel ? "text-on-lime" : "text-teal"}>
            <Icons.check size={14} strokeWidth={2.6} />
          </span>
        )}
        {isToday && (
          <span
            className={cn(
              "font-ui text-[10px] font-bold uppercase tracking-wide",
              limeSel ? "text-on-lime/70" : "text-lime",
            )}
          >
            Today
          </span>
        )}
        {locked && <Icons.lock size={13} className="text-fg-faint" />}
        {d.status === "rest" && <span className="text-xs opacity-70">🌙</span>}
      </div>
      {d.idea && (
        <span
          className={cn(
            "line-clamp-3 font-ui text-[11.5px] font-medium leading-snug",
            limeSel ? "text-on-lime/80" : "text-fg-muted",
            locked && "select-none blur-[3.5px]",
          )}
        >
          {d.idea}
        </span>
      )}
      {d.tasks > 0 && !locked && (
        <span
          className={cn(
            "mt-auto inline-flex items-center gap-1.5 pt-2 font-ui text-[10.5px] font-semibold",
            limeSel ? "text-on-lime/60" : "text-fg-subtle",
          )}
        >
          <span className="size-[5px] rounded-full" style={{ background: dot }} />
          {d.tasks} tasks
        </span>
      )}
    </button>
  );
}

function MonthGrid({
  month,
  selected,
  onSelect,
}: {
  month: readonly MonthDay[];
  selected: number;
  onSelect: (d: number) => void;
}) {
  const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div>
      <div className="mb-2.5 grid grid-cols-7 gap-2.5">
        {dows.map((d) => (
          <span
            key={d}
            className="pl-1 text-left font-logo text-[11px] font-bold uppercase tracking-wide text-fg-subtle"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2.5">
        {Array.from({ length: FIRST_WEEKDAY }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {month.map((d) => (
          <MonthCell
            key={d.date}
            d={d}
            selected={selected === d.date}
            onSelect={() => onSelect(d.date)}
          />
        ))}
      </div>
    </div>
  );
}

function ArrowButton({
  dir,
  enabled,
  onClick,
}: {
  dir: "prev" | "next";
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={enabled ? onClick : undefined}
      disabled={!enabled}
      className={cn(
        "grid size-9 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg transition-opacity",
        enabled ? "opacity-100 hover:bg-white/10" : "cursor-default opacity-35",
      )}
    >
      <span className={dir === "next" ? "-scale-x-100" : undefined}>
        <Icons.arrowLeft size={18} />
      </span>
    </button>
  );
}

export function CalendarPanel({
  week,
  month,
  selected,
  view,
  weekOffset,
  onView,
  onSelect,
  onPrevWeek,
  onNextWeek,
}: {
  week: readonly WeekDay[];
  month: readonly MonthDay[];
  selected: number;
  view: CalendarView;
  weekOffset: number;
  onView: (v: CalendarView) => void;
  onSelect: (d: number) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}) {
  const canPrev = view === "week" && weekOffset > -4;
  const canNext = view === "week" && weekOffset < 0;
  return (
    <section className="mb-6 rounded-card border-[0.5px] border-white/10 bg-white/5 p-5">
      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <h2 className="font-display text-[22px] font-bold text-fg">{MONTH_LABEL}</h2>
          <span className="font-ui text-[15px] font-semibold text-fg-subtle">{YEAR_LABEL}</span>
        </div>
        <div className="flex items-center gap-3">
          <Segmented view={view} onView={onView} />
          <div className="flex gap-2">
            <ArrowButton dir="prev" enabled={canPrev} onClick={onPrevWeek} />
            <ArrowButton dir="next" enabled={canNext} onClick={onNextWeek} />
          </div>
        </div>
      </div>
      {view === "week" ? (
        <WeekStrip week={week} selected={selected} onSelect={onSelect} />
      ) : (
        <MonthGrid month={month} selected={selected} onSelect={onSelect} />
      )}
    </section>
  );
}

function Segmented({
  view,
  onView,
}: {
  view: CalendarView;
  onView: (v: CalendarView) => void;
}) {
  const [hover, setHover] = useState<CalendarView | null>(null);
  return (
    <div className="flex rounded-full border-[0.5px] border-white/10 bg-white/5 p-[3px]">
      {(["week", "month"] as const).map((v) => (
        <button
          key={v}
          onClick={() => onView(v)}
          onMouseEnter={() => setHover(v)}
          onMouseLeave={() => setHover(null)}
          className={cn(
            "rounded-full px-[18px] py-[7px] font-ui text-[13px] font-bold capitalize transition-colors",
            view === v
              ? "bg-white/10 text-fg"
              : hover === v
                ? "text-fg"
                : "text-fg-subtle",
          )}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
