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

function ShotBlock({
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
    <div>
      <div className="mb-[7px] inline-flex items-center gap-1.5" style={{ color: accent }}>
        <Ic size={14} />
        <span className="font-ui text-[11px] font-extrabold uppercase tracking-[0.05em]">
          {label}
        </span>
      </div>
      <p className="font-ui text-[14.5px] leading-relaxed text-fg">{text}</p>
    </div>
  );
}

function SceneCard({ scene, last }: { scene: Scene; last: boolean }) {
  return (
    <div className="flex items-stretch gap-[22px]">
      <div className="flex flex-[0_0_40px] flex-col items-center">
        <span className="z-[1] grid size-10 shrink-0 place-items-center rounded-full border-[0.5px] border-white/10 bg-ink-800 font-display text-[15px] font-bold text-fg">
          {scene.n}
        </span>
        {!last && <span className="-mb-[18px] w-0.5 flex-1 bg-white/20 opacity-55" />}
      </div>
      <div className="mb-[18px] min-w-0 flex-1 rounded-card border-[0.5px] border-white/10 bg-ink-700 px-5 py-[18px]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-base font-bold text-fg">Scene {scene.n}</span>
            <span className="rounded-full border-[0.5px] border-white/10 bg-white/5 px-2.5 py-[3px] font-ui text-[11.5px] font-bold uppercase tracking-[0.03em] text-fg-muted">
              {scene.phase}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-ui text-[12.5px] font-semibold text-fg-subtle">
            <Icons.clock size={13} />
            {scene.time}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <ShotBlock icon="eye" label="Visual" accent="var(--color-sky)" text={scene.visual} />
          <ShotBlock icon="message" label="Script" accent="var(--color-lime)" text={scene.script} />
        </div>
      </div>
    </div>
  );
}

function Storyboard({ scenes }: { scenes: readonly Scene[] }) {
  return (
    <div>
      <h3 className="mb-[18px] font-display text-[21px] font-bold text-fg">Storyboard</h3>
      {scenes.map((s, i) => (
        <SceneCard key={s.n} scene={s} last={i === scenes.length - 1} />
      ))}
    </div>
  );
}

function PostPreview({ body, platform }: { body: string; platform: string }) {
  return (
    <div>
      <h3 className="mb-[18px] font-display text-[21px] font-bold text-fg">Ready to post</h3>
      <div className="max-w-[560px] rounded-card border-[0.5px] border-white/10 bg-ink-700 px-6 py-[22px]">
        <div className="mb-3.5 flex items-center gap-3">
          <span className="grid size-[42px] place-items-center rounded-full bg-gradient-to-br from-orange to-pink font-display text-sm font-bold text-white">
            VP
          </span>
          <div>
            <div className="font-ui text-[15px] font-bold text-fg">Vasya Pupkin</div>
            <div className="font-ui text-[13px] text-fg-subtle">@vasya_pupkin · {platform}</div>
          </div>
          <span className="ml-auto rounded-full border-[0.5px] border-white/10 bg-white/5 px-2.5 py-1 font-ui text-[11px] font-bold text-fg-subtle">
            Preview
          </span>
        </div>
        <p className="mb-4 whitespace-pre-wrap font-ui text-[15.5px] leading-relaxed text-fg">
          {body}
        </p>
        <div className="flex gap-6 border-t-[0.5px] border-white/10 pt-3.5 text-fg-subtle">
          {[
            { ic: <Icons.thumbsUp size={16} />, n: "128" },
            { ic: <Icons.message size={16} />, n: "24" },
            { ic: <Icons.refresh size={16} />, n: "12" },
            { ic: <Icons.send size={16} />, n: "" },
          ].map((a, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 font-ui text-[13px] font-semibold">
              {a.ic}
              {a.n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Checklist({ steps }: { steps: readonly { t: string; d: string }[] }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <div>
      <h3 className="mb-[18px] font-display text-[21px] font-bold text-fg">Today's mission</h3>
      <div className="flex max-w-[680px] flex-col gap-3.5">
        {steps.map((s, i) => {
          const on = !!done[i];
          return (
            <button
              key={i}
              onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
              className="flex items-start gap-4 rounded-card border-[0.5px] border-white/10 bg-ink-700 px-5 py-[18px] text-left transition-opacity"
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
    <div className="rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(120%_140%_at_0%_0%,rgba(184,230,68,0.10),transparent_60%),rgba(255,255,255,0.05)] p-5">
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
        className="grid size-[52px] place-items-center rounded-full border-[0.5px] border-white/10 transition-all"
        style={{
          background: active
            ? up
              ? "rgba(60,198,170,0.18)"
              : "rgba(240,64,44,0.16)"
            : "rgba(255,255,255,0.05)",
          color: active ? (up ? "var(--color-teal)" : "var(--color-danger)") : "var(--color-fg-muted)",
        }}
      >
        {up ? <Icons.thumbsUp size={21} /> : <Icons.thumbsDown size={21} />}
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
      <div className="flex justify-center gap-[18px]">
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
  const platformLabel = kind === "video" ? "Instagram" : "Threads";
  const primaryText =
    kind === "video"
      ? (cur && "script" in cur ? cur.script : "")
      : kind === "post"
        ? (cur && "body" in cur ? cur.body : "")
        : (cur && "body" in cur ? cur.body : "");
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
      setVIdx((i) => (i + 1) % Math.max(variants.length, 1));
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
  else if (kind === "post" && cur && "body" in cur) body = <PostPreview body={cur.body} platform={platformLabel} />;
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
        <h1 className="mb-3 mt-4 max-w-[760px] font-display text-[clamp(30px,3.2vw,42px)] font-bold leading-[1.12] tracking-[-0.011em] text-balance text-fg">
          {task.title}
        </h1>
        <p className="max-w-[680px] font-ui text-[17px] leading-normal text-fg-muted">{task.desc}</p>
      </div>
      <div className="mb-[30px] h-px bg-white/10" />

      <div className="flex flex-wrap items-start gap-10">
        <div className="min-w-0 flex-[1_1_560px]">
          {kind === "video" && (
            <div className="mb-[18px] flex flex-wrap gap-2">
              <MetaBadge icon={<Icons.film size={14} />}>
                {task.formatEmoji} {format}
              </MetaBadge>
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
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.22 }}
              >
                {body}
              </motion.div>
            </AnimatePresence>
            {gen && <GenOverlay />}
          </div>
        </div>

        <aside className="sticky top-0 flex max-w-[380px] flex-[1_1_320px] flex-col gap-[18px]">
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
