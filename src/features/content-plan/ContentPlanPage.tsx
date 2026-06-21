import { useEffect, useMemo, useState } from "react";
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
  const [forceRegen, setForceRegen] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  // Deep-link each state for design capture: /?state=video|month|paywall|...
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("state");
    if (!s) return;
    setOpenTask(null);
    setPaywallOpen(false);
    setForceRegen(false);
    if (s === "month") setView("month");
    else if (s === "completed") {
      setView("week");
      setSelected(26);
    } else if (s === "locked") {
      setView("week");
      setSelected(29);
    } else if (s === "rest") {
      setView("week");
      setSelected(25);
    } else if (s === "video") setOpenTask(PLAN[0]);
    else if (s === "post") setOpenTask(PLAN[1]);
    else if (s === "engage") setOpenTask(PLAN[2]);
    else if (s === "regen") {
      setOpenTask(PLAN[0]);
      setForceRegen(true);
    } else if (s === "paywall") setPaywallOpen(true);
    else {
      setView("week");
      setSelected(TODAY);
    }
  }, []);

  const week = useMemo(() => weekFor(weekOffset), [weekOffset]);
  const dayMeta = MONTH.find((d) => d.date === selected);
  const isToday = selected === TODAY;
  const isMonth = view === "month";

  const toggle = (id: string) => setDoneMap((m) => ({ ...m, [id]: !m[id] }));

  if (openTask) {
    return (
      <>
        <TaskDetail task={openTask} onBack={() => setOpenTask(null)} forceRegen={forceRegen} />
        <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
      </>
    );
  }

  return (
    <div className={isMonth ? "flex h-full flex-col pb-2" : undefined}>
      <ScreenHeader
        title="Content"
        accentWord="Plan"
        subtitle="Your daily roadmap to create, post and grow, one task at a time."
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

      {!isMonth && (
        <DayBody
          selected={selected}
          dayMeta={dayMeta}
          isToday={isToday}
          doneMap={doneMap}
          onToggle={toggle}
          onOpen={setOpenTask}
          onUnlock={() => setPaywallOpen(true)}
        />
      )}
      <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
}
