// SMMHUB — Content Plan domain data. Ported from the mobile feature.
// Logic preserved 1:1; presentation lives in the components.

export type Platform = "instagram" | "tiktok" | "youtube" | "threads" | "x";
export type TaskKind = "video" | "post" | "engage";
export type GlyphName = "film" | "edit" | "message";

/** Day lifecycle in the plan. `out` = padding cell outside the month. */
export type DayStatus =
  | "today"
  | "done"
  | "locked"
  | "rest"
  | "upcoming"
  | "out";

export interface Task {
  readonly id: string;
  readonly kind: TaskKind;
  readonly step: string;
  readonly glyph: GlyphName;
  /** CSS custom-property reference, e.g. "var(--color-lime)". */
  readonly accent: string;
  readonly eta: string;
  readonly title: string;
  readonly desc: string;
  readonly platforms: readonly Platform[];
  readonly format: string | null;
  readonly done: boolean;
  readonly duration?: string;
  readonly formatName?: string;
  readonly formatEmoji?: string;
  readonly formatInfo?: string;
}

export interface PlanGroup {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  /** CSS custom-property reference for the section accent. */
  readonly accent: string;
  readonly tasks: readonly Task[];
}

export interface WeekDay {
  readonly dow: string;
  readonly date: number;
  readonly status: DayStatus;
}

export interface MonthDay {
  readonly date: number;
  readonly idea: string | null;
  readonly status: DayStatus;
  readonly tasks: number;
}

export const IDEA = {
  label: "Idea of the day",
  title: "From zero to reading habit in 7 minutes a day",
  desc: "Show a realistic micro-reading routine for busy adults, with a timer, locations, and how to sneak books into existing habits like coffee, commute, or lunch.",
} as const;

const TASK_VIDEO: Task = {
  id: "video",
  kind: "video",
  step: "Create",
  glyph: "film",
  accent: "var(--color-lime)",
  eta: "≈ 20 min",
  title: "Create & post a short video",
  desc: "Use today's ready-made script to film your video and post it on Instagram, TikTok, and YouTube Shorts.",
  platforms: ["instagram", "tiktok", "youtube"],
  format: "Talking Head",
  done: true,
  duration: "15 sec",
  formatName: "B-roll + voiceover",
  formatEmoji: "🎥",
  formatInfo:
    "Record your narration first, then shoot supporting footage — hands, screens, objects, anything visual — and lay it over the voice in editing. No need to speak on camera.",
};

const TASK_POST: Task = {
  id: "post",
  kind: "post",
  step: "Publish",
  glyph: "edit",
  accent: "var(--color-sky)",
  eta: "≈ 5 min",
  title: "Publish a micro post",
  desc: "Copy today's pre-written post and share it on Threads and X to keep your feed alive between videos.",
  platforms: ["threads", "x"],
  format: null,
  done: false,
};

const TASK_ENGAGE: Task = {
  id: "engage",
  kind: "engage",
  step: "Grow",
  glyph: "message",
  accent: "var(--color-teal)",
  eta: "≈ 10 min",
  title: "Engage with 3 creators",
  desc: "Find three creators in your niche and leave a few meaningful comments on their recent posts to grow your reach.",
  platforms: ["threads", "x"],
  format: null,
  done: true,
};

export const PLAN: readonly Task[] = [TASK_VIDEO, TASK_POST, TASK_ENGAGE];

/** Exactly two home sections — no Create/Publish/Grow tags. */
export const GROUPS: readonly PlanGroup[] = [
  {
    id: "today",
    eyebrow: "Idea of the day",
    title: IDEA.title,
    accent: "var(--color-lime)",
    tasks: [TASK_VIDEO, TASK_POST],
  },
  {
    id: "growth",
    eyebrow: "Growth Boost",
    title: "Audience Engagement",
    accent: "var(--color-teal)",
    tasks: [TASK_ENGAGE],
  },
];

// Jan 2026 — Jan 1 is a Thursday, Jan 28 (Wed) is "today".
export const FIRST_WEEKDAY = 4;

const MONTH_IDEAS: Record<number, string> = {
  1: "New year, new niche — introduce yourself in 15 seconds",
  2: "3 myths beginners believe about going viral",
  3: "A day in my creator life",
  4: "Rest day — save ideas for the week ahead",
  5: "5 hooks that stop the scroll in 2 seconds",
  6: "Turn one long video into a week of clips",
  7: "The one tool I can't create without",
  8: "What I'd tell my beginner self",
  9: "React to a trend in your niche",
  10: "Mistakes that quietly kill your reach",
  11: "Rest day — recharge and reflect",
  12: "Your origin story in 30 seconds",
  13: "A quick win your audience can copy today",
  14: "Myth vs reality in your field",
  15: "Show your process, start to finish",
  16: "The 2-minute habit that builds focus",
  17: "Answer your 3 most-asked questions",
  18: "Rest day — plan the week ahead",
  19: "Before & after of your work",
  20: "A hot take your niche needs to hear",
  21: "Behind the scenes of your setup",
  22: "Recommend 3 creators worth following",
  23: "Tell a small failure and its lesson",
  24: "Tutorials that take only 20 seconds",
  25: "Rest day — save ideas for the week ahead",
  26: "5 hooks that stop the scroll in 2 seconds",
  27: "Turn one long video into a week of clips",
  28: IDEA.title,
  29: "Tools to optimize your content strategy",
  30: "Design systems for consistent branding",
  31: "Prototyping tools for rapid iteration",
};

const REST_DAYS = new Set([4, 11, 18, 25]);
const TODAY = 28;

export const MONTH: readonly MonthDay[] = Array.from({ length: 31 }, (_, i) => {
  const date = i + 1;
  let status: DayStatus;
  if (date === TODAY) status = "today";
  else if (REST_DAYS.has(date)) status = "rest";
  else if (date < TODAY) status = "done";
  else status = "locked";
  return {
    date,
    idea: MONTH_IDEAS[date] ?? null,
    status,
    tasks: status === "today" || status === "done" ? 3 : 0,
  };
});

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Build a 7-day strip. offset 0 = the week containing "today" (Jan 25–31). */
export function weekFor(offset: number): readonly WeekDay[] {
  const sunday = 25 + offset * 7;
  return DOW.map((dow, i) => {
    const n = sunday + i;
    if (n < 1) return { dow, date: n + 31, status: "out" as DayStatus };
    if (n > 31) return { dow, date: n - 31, status: "locked" as DayStatus };
    const m = MONTH.find((d) => d.date === n);
    return { dow, date: n, status: m ? m.status : "done" };
  });
}

export const MONTH_LABEL = "January";
export const YEAR_LABEL = "2026";
