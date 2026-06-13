import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icons, PlatformRow } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { RegenModal } from "@/features/content-plan/components/RegenModal";
import { IDEA, type Task } from "@/features/content-plan/data";
import { VARIANTS, type Scene } from "@/features/content-plan/task-content";

function IconButton({
  onClick,
  children,
  label,
}: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg transition-colors hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function MetaBadge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border-[0.5px] border-white/10 bg-white/5 px-3 py-[7px] font-ui text-[13px] font-semibold text-fg">
      {icon}
      {children}
    </span>
  );
}

function ShotCard({
  icon,
  label,
  accent,
  text,
}: {
  icon: "eye" | "message";
  label: string;
  accent: string;
  text: string;
}) {
  const Ic = icon === "eye" ? Icons.eye : Icons.message;
  return (
    <div className="rounded-card border-[0.5px] border-white/10 bg-ink-700 p-4">
      <div className="mb-2.5 inline-flex items-center gap-1.5" style={{ color: accent }}>
        <Ic size={14} />
        <span className="font-ui text-[11px] font-extrabold uppercase tracking-[0.05em]">{label}</span>
      </div>
      <p className="font-ui text-[14.5px] leading-relaxed text-fg">{text}</p>
    </div>
  );
}

/** One scene = two parts split into a Visual card + a Script card. */
function SceneBlock({ scene, last }: { scene: Scene; last: boolean }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <span className="z-[1] grid size-9 shrink-0 place-items-center rounded-full border-[0.5px] border-white/10 bg-ink-800 font-display text-[14px] font-bold text-fg">
          {scene.n}
        </span>
        {!last && <span className="mt-1 w-px flex-1 bg-white/15" />}
      </div>
      <div className="min-w-0 flex-1 pb-6">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="font-display text-[15px] font-bold text-fg">Scene {scene.n}</span>
          <span className="rounded-full border-[0.5px] border-white/10 bg-white/5 px-2.5 py-[3px] font-ui text-[11px] font-bold uppercase tracking-[0.03em] text-fg-muted">
            {scene.phase}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-fg-subtle">
            <Icons.clock size={13} />
            {scene.time}
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <ShotCard icon="eye" label="Visual" accent="var(--color-sky)" text={scene.visual} />
          <ShotCard icon="message" label="Script" accent="var(--color-lime)" text={scene.script} />
        </div>
      </div>
    </div>
  );
}

function Storyboard({ scenes }: { scenes: readonly Scene[] }) {
  return (
    <div>
      <h3 className="mb-5 font-display text-[21px] font-bold text-fg">Storyboard</h3>
      {scenes.map((s, i) => (
        <SceneBlock key={s.n} scene={s} last={i === scenes.length - 1} />
      ))}
    </div>
  );
}

/** Post detail — just the content, full width, no fake social engagement. */
function PostContent({ body, platforms }: { body: string; platforms: Task["platforms"] }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-[21px] font-bold text-fg">Ready to post</h3>
        <PlatformRow platforms={platforms} size={20} />
      </div>
      <div className="rounded-card border-[0.5px] border-white/10 bg-ink-700 p-6 md:p-8">
        <p className="whitespace-pre-wrap font-ui text-[16px] leading-[1.75] text-fg">{body}</p>
      </div>
    </div>
  );
}

function Checklist({ steps }: { steps: readonly { t: string; d: string }[] }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <div>
      <h3 className="mb-5 font-display text-[21px] font-bold text-fg">Today's mission</h3>
      <div className="flex flex-col gap-3.5">
        {steps.map((s, i) => {
          const on = !!done[i];
          return (
            <button
              key={i}
              onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
              className="flex items-start gap-4 rounded-card border-[0.5px] border-white/10 bg-ink-700 px-6 py-5 text-left transition-opacity"
              style={{ opacity: on ? 0.6 : 1 }}
            >
              <span
                className="grid size-7 shrink-0 place-items-center rounded-full font-display text-sm font-bold"
                style={{
                  background: on ? "var(--color-teal)" : "transparent",
                  border: on ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                  color: on ? "#06231c" : "var(--color-fg-muted)",
                }}
              >
                {on ? <Icons.check size={15} strokeWidth={2.6} /> : i + 1}
              </span>
              <span className="flex-1">
                <span
                  className="mb-1 block font-display text-[16.5px] font-bold text-fg"
                  style={{ textDecoration: on ? "line-through" : "none" }}
                >
                  {s.t}
                </span>
                <span className="block font-ui text-sm leading-relaxed text-fg-muted">{s.d}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function IdeaCard() {
  return (
    <div className="rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(120%_140%_at_0%_0%,rgba(184,230,68,0.10),transparent_60%),rgba(255,255,255,0.04)] p-5">
      <span className="inline-flex items-center gap-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.04em] text-lime">
        <Icons.sparkle size={13} /> Idea of the day
      </span>
      <h4 className="mb-2 mt-2.5 font-display text-lg font-bold leading-snug text-fg">{IDEA.title}</h4>
      <p className="font-ui text-[13.5px] leading-relaxed text-fg-muted">{IDEA.desc}</p>
    </div>
  );
}

function Feedback() {
  const [v, setV] = useState<"up" | "down" | null>(null);
  const Thumb = ({ val, up }: { val: "up" | "down"; up: boolean }) => {
    const active = v === val;
    return (
      <button
        onClick={() => setV(val)}
        className="grid size-12 place-items-center rounded-full border-[0.5px] border-white/10 transition-all"
        style={{
          background: active
            ? up
              ? "rgba(60,198,170,0.18)"
              : "rgba(240,64,44,0.16)"
            : "rgba(255,255,255,0.05)",
          color: active ? (up ? "var(--color-teal)" : "var(--color-danger)") : "var(--color-fg-muted)",
        }}
      >
        {up ? <Icons.thumbsUp size={19} /> : <Icons.thumbsDown size={19} />}
      </button>
    );
  };
  return (
    <div className="rounded-card border-[0.5px] border-white/10 bg-white/5 p-5 text-center">
      <h4 className="mb-1 font-display text-base font-bold text-fg">
        {v ? "Thanks for the feedback!" : "Did this work for you?"}
      </h4>
      <p className="mb-4 font-ui text-[13px] leading-snug text-fg-subtle">
        {v ? "Your AI learns your style and writes better next time." : "Your feedback helps our AI match your style."}
      </p>
      <div className="flex justify-center gap-4">
        <Thumb val="down" up={false} />
        <Thumb val="up" up />
      </div>
    </div>
  );
}

function InfoCard({ title, body, onClose }: { title: string; body: string; onClose: () => void }) {
  return (
    <div className="mb-[22px] flex gap-3.5 rounded-input border border-blue/45 bg-blue/10 px-[18px] py-4">
      <span className="mt-px shrink-0 text-blue">
        <Icons.info size={20} />
      </span>
      <div className="flex-1">
        <div className="mb-1 font-ui text-[15px] font-bold text-fg">{title}</div>
        <div className="font-ui text-sm leading-relaxed text-fg-muted">{body}</div>
      </div>
      <button onClick={onClose} aria-label="Dismiss" className="shrink-0 text-fg-subtle hover:text-fg">
        <Icons.close size={16} />
      </button>
    </div>
  );
}

function GenOverlay() {
  return (
    <div className="absolute inset-0 z-[5] grid place-items-center rounded-card bg-ink-900/60 backdrop-blur-[3px]">
      <div className="inline-flex items-center gap-2.5 rounded-full border-[0.5px] border-white/10 bg-ink-800 px-[22px] py-3 font-ui text-[15px] font-bold text-lime">
        <span className="cp-spin grid place-items-center">
          <Icons.refresh size={18} />
        </span>
        Generating a fresh version…
      </div>
    </div>
  );
}

export function TaskDetail({
  task,
  onBack,
  forceRegen = false,
}: {
  task: Task;
  onBack: () => void;
  forceRegen?: boolean;
}) {
  const kind = task.kind;
  const variants = VARIANTS[kind] ?? [];
  const [vIdx, setVIdx] = useState(0);
  const [over, setOver] = useState<{ format?: string; tone?: string; duration?: string }>({});
  const [regenOpen, setRegenOpen] = useState(forceRegen);
  const [gen, setGen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const cur = variants[vIdx] as (typeof variants)[number] | undefined;
  const format = over.format ?? task.formatName ?? "";
  const duration = over.duration ?? task.duration ?? "";
  const primaryText =
    cur && "script" in cur ? cur.script : cur && "body" in cur ? cur.body : "";
  const copyLabel = kind === "video" ? "Copy script" : kind === "post" ? "Copy post" : "Copy notes";

  const doCopy = () => {
    try {
      navigator.clipboard?.writeText(primaryText || "");
    } catch {
      /* clipboard may be unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const applyRegen = (vals: Record<string, string>) => {
    setRegenOpen(false);
    setGen(true);
    setTimeout(() => {
      setVIdx((idx) => (idx + 1) % Math.max(variants.length, 1));
      setOver({
        format: vals.format,
        duration: vals.length && /sec/.test(vals.length) ? vals.length : over.duration,
        tone: vals.tone,
      });
      setGen(false);
    }, 1400);
  };

  let body: React.ReactNode = null;
  if (kind === "video" && cur && "scenes" in cur) body = <Storyboard scenes={cur.scenes} />;
  else if (kind === "post" && cur && "body" in cur)
    body = <PostContent body={cur.body} platforms={task.platforms} />;
  else if (kind === "engage" && cur && "steps" in cur) body = <Checklist steps={cur.steps} />;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3.5">
        <IconButton onClick={onBack} label="Back">
          <Icons.arrowLeft size={20} />
        </IconButton>
        <span className="font-ui text-sm font-semibold text-fg-subtle">
          Content Plan&nbsp;&nbsp;·&nbsp;&nbsp;Wed, Jan 28
        </span>
      </div>

      <div className="mb-[26px]">
        <PlatformRow platforms={task.platforms} size={26} />
        <h1 className="mb-3 mt-4 max-w-[820px] font-display text-[clamp(30px,3.2vw,42px)] font-bold leading-[1.1] tracking-[-0.011em] text-balance">
          <span className="text-irid-h">{task.title}</span>
        </h1>
        <p className="max-w-[680px] font-ui text-[17px] leading-normal text-fg-muted">{task.desc}</p>
      </div>
      <div className="mb-[30px] h-px bg-white/10" />

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          {kind === "video" && (
            <div className="mb-[18px] flex flex-wrap gap-2">
              <MetaBadge icon={<Icons.film size={14} />}>{format}</MetaBadge>
              <MetaBadge icon={<Icons.clock size={14} />}>{duration}</MetaBadge>
              {over.tone && <MetaBadge icon={<Icons.sliders size={14} />}>{over.tone}</MetaBadge>}
            </div>
          )}
          {kind === "video" && showInfo && task.formatInfo && (
            <InfoCard
              title={`What is ${format} format?`}
              body={task.formatInfo}
              onClose={() => setShowInfo(false)}
            />
          )}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={vIdx}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                {body}
              </motion.div>
            </AnimatePresence>
            {gen && <GenOverlay />}
          </div>
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-4 lg:sticky lg:top-2 lg:w-[360px]">
          <IdeaCard />
          <Feedback />
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              full
              size="lg"
              onClick={doCopy}
              leftIcon={copied ? <Icons.check size={18} strokeWidth={2.4} /> : <Icons.copy size={18} />}
            >
              {copied ? "Copied!" : copyLabel}
            </Button>
            <Button variant="ghost" full size="lg" onClick={() => setRegenOpen(true)} leftIcon={<Icons.wand size={18} />}>
              Regenerate
            </Button>
          </div>
        </aside>
      </div>

      <RegenModal kind={kind} open={regenOpen} onOpenChange={setRegenOpen} onApply={applyRegen} />
    </div>
  );
}
