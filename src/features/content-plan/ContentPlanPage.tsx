import { useMemo, useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import {
  CalendarPanel,
  type CalendarView,
} from "@/features/content-plan/components/Calendar";
import { DayBody } from "@/features/content-plan/components/DayBody";
import { TaskDetail } from "@/features/content-plan/components/TaskDetail";
import { Paywall } from "@/features/content-plan/components/Paywall";
import { MONTH, PLAN, type Task, weekFor } from "@/features/content-plan/data";

const TODAY = 28;

export function ContentPlanPage() {
  const [view, setView] = useState<CalendarView>("week");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selected, setSelected] = useState(TODAY);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PLAN.map((t) => [t.id, t.done])),
  );
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const week = useMemo(() => weekFor(weekOffset), [weekOffset]);
  const dayMeta = MONTH.find((d) => d.date === selected);
  const isToday = selected === TODAY;
  const progress = { done: PLAN.filter((t) => doneMap[t.id]).length, total: PLAN.length };

  const toggle = (id: string) => setDoneMap((m) => ({ ...m, [id]: !m[id] }));

  if (openTask) {
    return (
      <>
        <TaskDetail task={openTask} onBack={() => setOpenTask(null)} />
        <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
      </>
    );
  }

  return (
    <div>
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
        onView={setView}
        onSelect={setSelected}
        onPrevWeek={() => setWeekOffset((o) => Math.max(o - 1, -4))}
        onNextWeek={() => setWeekOffset((o) => Math.min(o + 1, 0))}
      />

      <DayBody
        selected={selected}
        dayMeta={dayMeta}
        isToday={isToday}
        doneMap={doneMap}
        progress={progress}
        onToggle={toggle}
        onOpen={setOpenTask}
        onUnlock={() => setPaywallOpen(true)}
      />

      <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
}
