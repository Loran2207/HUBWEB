import { useEffect, useMemo, useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import {
  CalendarPanel,
  type CalendarView,
} from "@/features/content-plan/components/Calendar";
import { DayBody } from "@/features/content-plan/components/DayBody";
import { TaskDetail } from "@/features/content-plan/components/TaskDetail";
import { Paywall } from "@/features/content-plan/components/Paywall";
import { GeneratingBody } from "@/features/content-plan/components/GeneratingState";
import { NextPlanTimer } from "@/features/content-plan/components/NextPlanTimer";
import { PlanReady } from "@/features/content-plan/components/PlanReady";
import { LockedPlanBody } from "@/features/content-plan/components/LockedPlan";
import { CoachOverlay } from "@/features/content-plan/components/CoachOverlay";
import { MONTH, PLAN, type Task, weekFor } from "@/features/content-plan/data";

const TODAY = 28;
type Special = "generating" | "timer" | "planready" | "locked" | "coach" | null;

export function ContentPlanPage() {
  const [view, setView] = useState<CalendarView>("week");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selected, setSelected] = useState(TODAY);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PLAN.map((t) => [t.id, t.done])),
  );
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [forceRegen, setForceRegen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [special, setSpecial] = useState<Special>(null);
  const [coachStep, setCoachStep] = useState(0);
  const [initialFb, setInitialFb] = useState<"up" | "down" | undefined>(undefined);

  // Deep-link each state for design capture: /?state=video|month|generating|...
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("state");
    if (!s) return;
    setOpenTask(null);
    setPaywallOpen(false);
    setForceRegen(false);
    setDetailLoading(false);
    setSpecial(null);
    setCoachStep(0);
    setInitialFb(undefined);
    if (s === "month") setView("month");
    else if (s === "video") setOpenTask(PLAN[0]);
    else if (s === "post") setOpenTask(PLAN[1]);
    else if (s === "engage") setOpenTask(PLAN[2]);
    else if (s === "liked") {
      setOpenTask(PLAN[1]);
      setInitialFb("up");
    } else if (s === "disliked") {
      setOpenTask(PLAN[1]);
      setInitialFb("down");
    }
    else if (s === "videoload") {
      setOpenTask(PLAN[0]);
      setDetailLoading(true);
    } else if (s === "postload") {
      setOpenTask(PLAN[1]);
      setDetailLoading(true);
    } else if (s === "regen") {
      setOpenTask(PLAN[0]);
      setForceRegen(true);
    } else if (s === "paywall") setPaywallOpen(true);
    else if (s === "generating") setSpecial("generating");
    else if (s === "timer") setSpecial("timer");
    else if (s === "planready") setSpecial("planready");
    else if (s === "locked") setSpecial("locked");
    else if (/^coach[1-4]$/.test(s)) {
      setSpecial("coach");
      setCoachStep(Number(s.slice(5)));
    }
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
        <TaskDetail
          task={openTask}
          onBack={() => setOpenTask(null)}
          forceRegen={forceRegen}
          loading={detailLoading}
          initialFeedback={initialFb}
        />
        <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
      </>
    );
  }

  if (special === "planready") return <PlanReady onGo={() => setSpecial(null)} />;

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

      {!isMonth && special === "generating" && <GeneratingBody percent={20} />}
      {!isMonth && special === "timer" && <NextPlanTimer />}
      {!isMonth && special === "locked" && (
        <LockedPlanBody endedOn="Aug 26" onRenew={() => setPaywallOpen(true)} />
      )}
      {!isMonth && (!special || special === "coach") && (
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
      {special === "coach" && coachStep > 0 && (
        <CoachOverlay
          step={coachStep}
          onNext={() => (coachStep < 4 ? setCoachStep(coachStep + 1) : setSpecial(null))}
        />
      )}
      <Paywall open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
}
