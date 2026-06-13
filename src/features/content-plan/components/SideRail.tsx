import { BrandSvg, Icons } from "@/components/icons";
import { Button } from "@/components/ui/Button";

/** Right-rail composition for the "rail" layout — a clean premium upsell
 * filling the freed space (single soft glow, no busy decoration). */
export function SideRail({ onUnlock }: { onUnlock: () => void }) {
  return (
    <aside className="sticky top-2 hidden min-h-[460px] overflow-hidden rounded-card border-[0.5px] border-white/10 bg-white/[0.03] p-7 backdrop-blur-[var(--blur-glass)] xl:flex xl:flex-col">
      <div className="pointer-events-none absolute -right-10 -top-16 size-[320px] rounded-full bg-[radial-gradient(circle,rgba(184,230,68,0.14),transparent_62%)] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 size-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,166,255,0.10),transparent_64%)] blur-[60px]" />
      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lime/15 px-3 py-1.5 font-ui text-[11px] font-extrabold uppercase tracking-wide text-lime">
          <BrandSvg name="crown" size={14} /> Premium
        </span>
        <h3 className="mt-5 max-w-[260px] font-display text-[26px] font-bold leading-[1.15] text-fg">
          Your whole month, planned for you
        </h3>
        <p className="mt-3 max-w-[260px] font-ui text-[14px] font-medium leading-relaxed text-fg-muted">
          Unlock daily ideas, ready-made scripts and growth tasks — every day prepared
          before you wake up.
        </p>

        <ul className="mt-6 flex flex-col gap-2.5">
          {["A full month, planned ahead", "Daily viral content ideas", "Pro video scripts & posts"].map(
            (f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                  <Icons.check size={12} strokeWidth={2.6} />
                </span>
                <span className="font-ui text-[13.5px] font-medium text-fg">{f}</span>
              </li>
            ),
          )}
        </ul>

        <div className="mt-auto pt-7">
          <Button variant="primary" full size="lg" onClick={onUnlock} leftIcon={<Icons.sparkle size={18} />}>
            Unlock Premium
          </Button>
        </div>
      </div>
    </aside>
  );
}
