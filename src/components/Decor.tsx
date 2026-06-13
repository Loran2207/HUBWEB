import { cn } from "@/lib/cn";

/** Decorative iridescent gradient + sparkle field — borrowed from the
 * "Explore AI Tools" illustration backdrops (the glow + stars, not the art). */

const SPARKLE_PATH =
  "M12 0c.5 5.8 6.2 11.5 12 12-5.8.5-11.5 6.2-12 12-.5-5.8-6.2-11.5-12-12C5.8 11.5 11.5 5.8 12 0Z";

type Sparkle = { x: string; y: string; s: number; o: number };

const SPARKLES: Sparkle[] = [
  { x: "16%", y: "12%", s: 16, o: 0.9 },
  { x: "42%", y: "8%", s: 9, o: 0.6 },
  { x: "70%", y: "16%", s: 13, o: 0.8 },
  { x: "86%", y: "30%", s: 8, o: 0.5 },
  { x: "24%", y: "34%", s: 10, o: 0.7 },
  { x: "58%", y: "40%", s: 14, o: 0.85 },
  { x: "12%", y: "58%", s: 11, o: 0.65 },
  { x: "78%", y: "54%", s: 9, o: 0.55 },
  { x: "38%", y: "66%", s: 13, o: 0.75 },
  { x: "64%", y: "76%", s: 8, o: 0.5 },
  { x: "22%", y: "82%", s: 12, o: 0.7 },
  { x: "88%", y: "70%", s: 10, o: 0.6 },
  { x: "50%", y: "90%", s: 9, o: 0.5 },
];

function Sparkle({ sp }: { sp: Sparkle }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={sp.s}
      height={sp.s}
      fill="white"
      aria-hidden
      className="absolute drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
      style={{ left: sp.x, top: sp.y, opacity: sp.o }}
    >
      <path d={SPARKLE_PATH} />
    </svg>
  );
}

export function DecorField({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute right-[-8%] top-[4%] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(78,231,255,0.18),transparent_60%)] blur-[60px]" />
      <div className="absolute -bottom-10 left-[6%] size-[360px] rounded-full bg-[radial-gradient(circle,rgba(184,230,68,0.14),transparent_62%)] blur-[60px]" />
      <div className="absolute right-[24%] bottom-[22%] size-[300px] rounded-full bg-[radial-gradient(circle,rgba(195,77,255,0.13),transparent_62%)] blur-[60px]" />
      {SPARKLES.map((sp, i) => (
        <Sparkle key={i} sp={sp} />
      ))}
    </div>
  );
}
