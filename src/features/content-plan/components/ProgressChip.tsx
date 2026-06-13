export function ProgressChip({ done, total }: { done: number; total: number }) {
  const pct = total ? done / total : 0;
  const r = 13;
  const c = 2 * Math.PI * r;
  return (
    <div className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border-[0.5px] border-white/10 bg-white/5 py-2 pl-2.5 pr-[18px]">
      <span className="relative grid size-8 place-items-center">
        <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90">
          <circle cx="16" cy="16" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" />
          <circle
            cx="16"
            cy="16"
            r={r}
            fill="none"
            stroke="var(--color-lime)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            style={{ transition: "stroke-dashoffset .45s ease" }}
          />
        </svg>
        <span className="absolute font-display text-[11px] font-extrabold text-fg">
          {done}/{total}
        </span>
      </span>
      <span className="font-ui text-sm font-semibold text-fg-muted">tasks done today</span>
    </div>
  );
}
