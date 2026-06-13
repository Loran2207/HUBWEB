import { cn } from "@/lib/cn";

export type Layout = "wide" | "focused" | "rail";

const OPTIONS: { id: Layout; label: string }[] = [
  { id: "wide", label: "Wide" },
  { id: "focused", label: "Focused" },
  { id: "rail", label: "Rail" },
];

/** Floating layout switcher (bottom-center) so the team can compare and pick. */
export function LayoutSwitcher({
  value,
  onChange,
}: {
  value: Layout;
  onChange: (v: Layout) => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border-[0.5px] border-white/10 bg-ink-800/90 p-1 pl-3 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <span className="mr-1 font-ui text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-fg-faint">
          Layout
        </span>
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "rounded-full px-4 py-2 font-ui text-[13px] font-semibold transition-colors",
              value === o.id ? "bg-lime text-on-lime" : "text-fg-subtle hover:text-fg",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
