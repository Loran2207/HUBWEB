// SMMHUB, Content Plan task bodies: storyboards, scripts, posts, engage notes,
// and Regenerate field configs. Ported from the mobile feature.
import type { TaskKind } from "@/features/content-plan/data";

export interface Scene {
  readonly n: number;
  readonly time: string;
  readonly phase: string;
  readonly visual: string;
  readonly script: string;
}

export interface VideoVariant {
  readonly scenes: readonly Scene[];
  readonly script: string;
  readonly duration: string;
  readonly format: string;
}

export interface PostVariant {
  readonly body: string;
}

export interface EngageStep {
  readonly t: string;
  readonly d: string;
}

export interface EngageVariant {
  readonly body: string;
  readonly steps: readonly EngageStep[];
}

export interface Variants {
  readonly video: readonly VideoVariant[];
  readonly post: readonly PostVariant[];
  readonly engage: readonly EngageVariant[];
}

export type RegenFieldType = "textarea" | "select" | "segment" | "text";

export interface RegenField {
  readonly key: string;
  readonly type: RegenFieldType;
  readonly label: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly options?: readonly string[];
}

export interface RegenConfig {
  readonly title: string;
  readonly cta: string;
  readonly fields: readonly RegenField[];
}

const SCENES_A: readonly Scene[] = [
  { n: 1, time: "0-4 sec", phase: "Hook", visual: "Talking head straight to camera. Soft morning light, plain background.", script: "Be honest. When was the last time you finished a book?" },
  { n: 2, time: "4-7 sec", phase: "B-roll", visual: "Wide shot: a person in their 30s rushing through a kitchen, grabbing keys and a coffee mug, sun through the window.", script: "No voiceover, let the visual breathe." },
  { n: 3, time: "7-10 sec", phase: "Voiceover", visual: "Close-up of a phone: an endless 'saved' list, thumb scrolling past it.", script: "You keep saving recommendations, but never turn them into a real plan." },
  { n: 4, time: "10-14 sec", phase: "CTA", visual: "Text on screen “7 minutes a day” over B-roll of opening a book at a café.", script: "So here's the reset: just 7 minutes a day." },
];

const SCRIPT_A = `[0-4s · Hook]
Be honest, when was the last time you finished a book?

[4-7s · B-roll, no VO]
Person rushing through the kitchen, grabbing keys and a coffee mug.

[7-10s · Voiceover]
You keep saving recommendations, but never turn them into a real plan.

[10-14s · CTA]
So here's the reset: just 7 minutes a day. Two pages, three times a day, that's it.`;

const SCENES_B: readonly Scene[] = [
  { n: 1, time: "0-3 sec", phase: "Hook", visual: "Fast push-in on talking head, punchy energy, bold caption.", script: "Stop scrolling. This 7-minute habit will out-read 90% of people this year." },
  { n: 2, time: "3-7 sec", phase: "B-roll", visual: "Phone face-down next to an open book and a steaming coffee cup.", script: "Beat, visual only." },
  { n: 3, time: "7-11 sec", phase: "Voiceover", visual: "Three quick cuts: coffee, commute, bedside lamp.", script: "You don't need more time. You need three tiny windows in the day you already have." },
  { n: 4, time: "11-15 sec", phase: "CTA", visual: "On-screen list of the 3 windows; end card with your handle.", script: "Coffee. Commute. Bedtime. Two pages each, and you're a reader again." },
];

const SCRIPT_B = `[0-3s · Hook]
Stop scrolling. This 7-minute habit will out-read 90% of people this year.

[3-7s · B-roll]
Phone face-down next to an open book and a steaming coffee cup.

[7-11s · Voiceover]
You don't need more time. You need three tiny windows in the day you already have.

[11-15s · CTA]
Coffee. Commute. Bedtime. Two pages each, and you're a reader again.`;

const POST_A = `Think you're too busy to read? It only takes 7 minutes to reignite your curiosity. ✨

Here's the micro-reading routine 👇

⏰ Set 3 mini-timers
• Coffee (2 min): two pages instead of scrolling
• Commute (2 min): a page or an audiobook
• Wind-down (3 min): swap the feed for a few pages

📚 Make books impossible to miss
Keep one on your desk, in your bag, in the car.

🎯 Celebrate small wins
2 pages a day = 730 a year, that's 2-4 books.

Start small. Stay consistent. Reignite the reader in you. 🌟`;

const POST_B = `You don't have a reading problem. You have a "where do I even start" problem.

So here's the 7-minute fix 👇

1. Coffee = 2 pages. No phone.
2. Commute = 1 page or an audiobook.
3. Bed = 3 minutes, lights low.

That's 7 minutes. 2-4 books a year. Zero pressure.

Save this and try it tomorrow. Your future self reads. 📚`;

const ENGAGE_STEPS: readonly EngageStep[] = [
  { t: "Find 3 creators", d: "Accounts roughly your size who post about your topics. Their audience is your future audience." },
  { t: "Leave meaningful comments", d: "Skip \"Nice post!\". Add a thought, a question or a small story, 2-3 sentences." },
  { t: "Show up again tomorrow", d: "Same 3 creators, a few days in a row. That's how you land on their radar." },
];

const ENGAGE_BODY = `Growth is a two-way street. Today's mission: become a familiar face in your niche.

🔎 Find 3 creators roughly your size who post about your topics, their audience is your future audience.

💬 Leave meaningful comments. Skip "Nice post!". Add a thought, a question, or a small story. 2-3 sentences is plenty.

🤝 Show up again tomorrow. The same 3 creators, a few days in a row, and you'll be on their radar.`;

export const VARIANTS: Variants = {
  video: [
    { scenes: SCENES_A, script: SCRIPT_A, duration: "15 sec", format: "B-roll + voiceover" },
    { scenes: SCENES_B, script: SCRIPT_B, duration: "15 sec", format: "B-roll + voiceover" },
  ],
  post: [{ body: POST_A }, { body: POST_B }],
  engage: [{ body: ENGAGE_BODY, steps: ENGAGE_STEPS }],
};

export const REGEN: Record<TaskKind, RegenConfig> = {
  video: {
    title: "Regenerate script",
    cta: "Confirm & Regenerate",
    fields: [
      { key: "requests", type: "textarea", label: "Requests for improvement", placeholder: "Make shorter" },
      { key: "format", type: "segment", label: "Format", options: ["Talking head", "Voice-over + B-roll"], value: "Talking head" },
      { key: "duration", type: "segment", label: "Duration", options: ["30 sec", "1 min", "1.5 min", "2 min"], value: "1.5 min" },
      { key: "tone", type: "select", label: "Tone of voice", options: ["Friendly", "Bold", "Educational", "Inspirational"], value: "Friendly" },
      { key: "cta", type: "textarea", label: "Call to Action", placeholder: "What do you want viewers to do? e.g. Follow for more tips, or Save this for later." },
    ],
  },
  post: {
    title: "Regenerate post",
    cta: "Confirm & Regenerate",
    fields: [
      { key: "requests", type: "textarea", label: "Requests for improvement", placeholder: "Make shorter" },
      { key: "tone", type: "select", label: "Tone of voice", options: ["Friendly", "Bold", "Educational", "Inspirational"], value: "Friendly" },
      { key: "purpose", type: "select", label: "Content purpose", placeholder: "Select content purpose", options: ["Educate", "Entertain", "Inspire", "Promote"], value: "" },
      { key: "cta", type: "textarea", label: "Call to Action", placeholder: "What do you want viewers to do? e.g. Follow for more tips, or Save this for later." },
    ],
  },
  engage: {
    title: "Regenerate task",
    cta: "Confirm & Regenerate",
    fields: [
      { key: "requests", type: "textarea", label: "Requests for improvement", placeholder: "Make shorter" },
      { key: "tone", type: "select", label: "Comment style", options: ["Friendly", "Curious", "Bold", "Supportive"], value: "Friendly" },
    ],
  },
};
