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

/** The calendar only signals done / not-done (+ today). No moon / lock / counts. */
function StatusMark({ status, onLime }: { status: DayStatus; onLime: boolean }) {
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
  if (status === "done")
    return (
      <span className="grid size-[22px] place-items-center rounded-full bg-teal/15 text-teal ring-[0.5px] ring-teal/40">
        <Icons.check size={13} strokeWidth={2.6} />
      </span>
    );
  return <span className="size-[22px] rounded-full border-[1.5px] border-white/15" />;
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
  const isDone = day.status === "done";
  const limeSel = selected && isToday;
  if (day.status === "out") {
    return (
      <span className="flex flex-col items-center gap-3 px-2 pb-3.5 pt-4 opacity-25">
        <span className="font-logo text-xs font-bold uppercase tracking-wider text-fg-subtle">{day.dow}</span>
        <span className="font-display text-3xl font-bold leading-none text-fg-faint">{day.date}</span>
        <span className="size-[22px]" />
      </span>
    );
  }
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-3 overflow-hidden px-2 pb-3.5 pt-4 transition-all rounded-card border-[0.5px]",
        limeSel
          ? "border-transparent bg-lime shadow-[0_8px_28px_rgba(184,230,68,0.25)]"
          : selected
            ? "border-white/15 bg-white/10"
            : isDone
              ? "border-teal/15 bg-teal/[0.04] hover:-translate-y-0.5 hover:bg-teal/[0.07]"
              : "border-white/10 hover:-translate-y-0.5 hover:bg-white/5",
      )}
    >
      <span className={cn("font-logo text-xs font-bold uppercase tracking-wider", limeSel ? "text-on-lime/65" : "text-fg-subtle")}>
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
        <DayCell key={d.date} day={d} selected={selected === d.date} onSelect={() => onSelect(d.date)} />
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
  const isDone = d.status === "done";
  const limeSel = selected && isToday;
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative flex h-full min-h-[140px] flex-col overflow-hidden rounded-input border-[0.5px] p-3.5 text-left transition-colors",
        limeSel
          ? "border-transparent bg-lime"
          : selected
            ? "border-white/15 bg-white/10"
            : isDone
              ? "border-teal/12 bg-teal/[0.04] hover:bg-teal/[0.07]"
              : "border-white/10 bg-white/5 hover:bg-white/8",
      )}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className={cn("font-display text-lg font-bold", limeSel ? "text-on-lime" : isToday ? "text-lime" : "text-fg")}>
          {d.date}
        </span>
        {isToday ? (
          <span className={cn("font-ui text-[10px] font-bold uppercase tracking-wide", limeSel ? "text-on-lime/70" : "text-lime")}>
            Today
          </span>
        ) : isDone ? (
          <span className="grid size-[18px] place-items-center rounded-full bg-teal/15 text-teal">
            <Icons.check size={11} strokeWidth={2.6} />
          </span>
        ) : null}
      </div>
      {d.idea && (
        <span
          className={cn(
            "line-clamp-4 font-display text-[14px] font-semibold leading-snug",
            limeSel ? "text-on-lime" : isDone ? "text-fg" : "text-fg-muted",
          )}
        >
          {d.idea}
        </span>
      )}
    </button>
  );
}

function MonthGrid({
  month,
  selected,
  onSelect,
  fill,
}: {
  month: readonly MonthDay[];
  selected: number;
  onSelect: (d: number) => void;
  fill?: boolean;
}) {
  const dows = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className={cn("flex flex-col", fill && "min-h-0 flex-1")}>
      <div className="mb-2.5 grid grid-cols-7 gap-2.5">
        {dows.map((d) => (
          <span key={d} className="pl-1 text-left font-logo text-[11px] font-bold uppercase tracking-wide text-fg-subtle">
            {d}
          </span>
        ))}
      </div>
      <div className={cn("grid grid-cols-7 gap-2.5 auto-rows-[minmax(158px,auto)]", fill && "min-h-0 flex-1")}>
        {Array.from({ length: FIRST_WEEKDAY }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {month.map((d) => (
          <MonthCell key={d.date} d={d} selected={selected === d.date} onSelect={() => onSelect(d.date)} />
        ))}
      </div>
    </div>
  );
}

function ArrowButton({ dir, enabled, onClick }: { dir: "prev" | "next"; enabled: boolean; onClick: () => void }) {
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

function Segmented({ view, onView }: { view: CalendarView; onView: (v: CalendarView) => void }) {
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
            view === v ? "bg-white/10 text-fg" : hover === v ? "text-fg" : "text-fg-subtle",
          )}
        >
          {v}
        </button>
      ))}
    </div>
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
  fill,
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
  fill?: boolean;
}) {
  const canPrev = view === "week" && weekOffset > -4;
  const canNext = view === "week" && weekOffset < 0;
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-card border-[0.5px] border-white/10 bg-white/[0.03] p-5",
        fill ? "flex min-h-0 flex-1 flex-col" : "mb-6",
      )}
    >
      <div className="pointer-events-none absolute -right-10 -top-16 size-[280px] rounded-full bg-[radial-gradient(circle,rgba(184,230,68,0.06),transparent_64%)] blur-[60px]" />
      <div className="relative mb-[18px] flex flex-wrap items-center justify-between gap-3">
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
      <div className={cn("relative", fill && "flex min-h-0 flex-1 flex-col")}>
        {view === "week" ? (
          <WeekStrip week={week} selected={selected} onSelect={onSelect} />
        ) : (
          <MonthGrid month={month} selected={selected} onSelect={onSelect} fill={fill} />
        )}
      </div>
    </section>
  );
}
