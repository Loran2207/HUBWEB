import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STEPS = [
  {
    sel: "idea",
    title: "Meet your daily idea",
    body: "Every day starts with one ready-to-shoot idea, tuned to your niche. Tap regenerate for a fresh angle.",
  },
  {
    sel: "video",
    title: "Film today's video",
    body: "Open the task for a scene-by-scene script you can shoot in minutes, with the platforms picked for you.",
  },
  {
    sel: "post",
    title: "Publish a micro post",
    body: "Copy the pre-written post and keep your feed alive on Threads and X between videos.",
  },
  {
    sel: "engage",
    title: "Time to connect",
    body: "Leave a few thoughtful comments to put your profile in front of new people in your niche.",
  },
];

const SCRIM = "absolute bg-black/75";

/** Onboarding spotlight: dims the screen with four bands and highlights one element. */
export function CoachOverlay({ step, onNext }: { step: number; onNext: () => void }) {
  const cfg = STEPS[step - 1];
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector('[data-coach="' + cfg.sel + '"]');
      if (el) {
        el.scrollIntoView({ block: "nearest" });
        setRect(el.getBoundingClientRect());
      }
    };
    const t = window.setTimeout(measure, 70);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [cfg.sel]);

  if (!rect) return null;
  const pad = 8;
  const box = {
    top: rect.top - pad,
    left: rect.left - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  };
  const below = box.top + box.height + 230 < window.innerHeight;
  const tipTop = below ? box.top + box.height + 14 : Math.max(box.top - 210, 16);
  const tipLeft = Math.min(Math.max(box.left, 24), window.innerWidth - 360);

  return (
    <div className="fixed inset-0 z-[60]">
      <span className={SCRIM + " inset-x-0 top-0"} style={{ height: Math.max(box.top, 0) }} />
      <span className={SCRIM + " inset-x-0 bottom-0"} style={{ top: box.top + box.height }} />
      <span className={SCRIM + " left-0"} style={{ top: box.top, width: Math.max(box.left, 0), height: box.height }} />
      <span className={SCRIM + " right-0"} style={{ top: box.top, left: box.left + box.width, height: box.height }} />
      <span
        className="absolute rounded-card ring-2 ring-lime/70"
        style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
      />

      <div
        className="absolute w-[336px] rounded-card border-[0.5px] border-white/12 bg-ink-800 p-5"
        style={{ top: tipTop, left: tipLeft }}
      >
        <div className="mb-1.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-lime">
          Step {step} of {STEPS.length}
        </div>
        <h4 className="mb-1.5 font-display text-[18px] font-bold text-fg">{cfg.title}</h4>
        <p className="mb-4 font-ui text-[13.5px] leading-relaxed text-fg-muted">{cfg.body}</p>
        <div className="flex items-center justify-between">
          <span className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className="size-1.5 rounded-full"
                style={{ background: i === step - 1 ? "var(--color-lime)" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </span>
          <Button variant="primary" size="md" onClick={onNext}>
            {step < STEPS.length ? "Next" : "Got it"}
          </Button>
        </div>
      </div>
    </div>
  );
}
