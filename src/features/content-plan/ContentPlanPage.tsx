import { useMemo, useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import {
  CalendarPanel,
  type CalendarView,
} from "@/features/content-plan/components/Calendar";
import { DayBody } from "@/features/content-plan/components/DayBody";
import { SideRail } from "@/features/content-plan/components/SideRail";
import {
  LayoutSwitcher,
  type Layout,
} from "@/features/content-plan/components/LayoutSwitcher";
import { TaskDetail } from "@/features/content-plan/components/TaskDetail";
import { Paywall } from "@/features/content-plan/components/Paywall";
import { MONTH, PLAN, type Task, weekFor } from "@/features/content-plan/data";

const TODAY = 28;

export function ContentPlanPage() {
  const [view, setView] = useState<CalendarView>("week");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selected, setSelected] = useState(TODAY);
  const [layout, setLayout] = useState<Layout>("focused");
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PLAN.map((t) => [t.id, t.done])),
  );
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const week = useMemo(() => weekFor(weekOffset), [weekOffset]);
  const dayMeta = MONTH.find((d) => d.date === selected);
  const isToday = selected === TODAY;
  const isMonth = view === "month";

  const toggle = (id: string) => setDoneMap((m) => ({ ...m, [id]: !m[id] }));

  if (openTask) {
    return (
      <>
        <TaskDetail task={openTask} onBack={() => setOpenTask(null)} />
        <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
      </>
    );
  }

  const body = (
    <DayBody
      selected={selected}
      dayMeta={dayMeta}
      isToday={isToday}
      doneMap={doneMap}
      onToggle={toggle}
      onOpen={setOpenTask}
      onUnlock={() => setPaywallOpen(true)}
    />
  );

  let dayLayout = body;
  if (layout === "rail") {
    dayLayout = (
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-[880px]">{body}</div>
        <SideRail onUnlock={() => setPaywallOpen(true)} />
      </div>
    );
  }

  return (
    <div className={isMonth ? "flex h-full flex-col pb-2" : undefined}>
      <ScreenHeader
        title="Content"
        accentWord="Plan"
        subtitle="Your daily roadmap to create, post and grow — one task at a time."
        hero
        orb
      />

      <CalendarPanel
        week={week}
        month={MONTH}
        selected={selected}
        view={view}
        weekOffset={weekOffset}
        fill={isMonth}
        onView={setView}
        onSelect={(d) => {
          setSelected(d);
          if (isMonth) setView("week");
        }}
        onPrevWeek={() => setWeekOffset((o) => Math.max(o - 1, -4))}
        onNextWeek={() => setWeekOffset((o) => Math.min(o + 1, 0))}
      />

      {!isMonth && dayLayout}
      {!isMonth && <LayoutSwitcher value={layout} onChange={setLayout} />}
      <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
}
