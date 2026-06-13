import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { BrandSvg, Icons } from "@/components/icons";

const INCLUDED = [
  { icon: "💡", label: "Daily viral content ideas" },
  { icon: "🎬", label: "Professional video scripts" },
  { icon: "✍️", label: "Ready-to-post captions & posts" },
  { icon: "📈", label: "Personalized growth tasks" },
  { icon: "🗓️", label: "A full month, planned ahead" },
];

export function Paywall({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="SMMHUB Premium"
      width={560}
      className="bg-[radial-gradient(120%_80%_at_50%_0%,rgba(184,230,68,0.12),transparent_55%),var(--color-ink-800)]"
    >
      <div className="p-8">
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute right-[18px] top-[18px] grid size-[34px] place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg-muted transition-colors hover:bg-white/10"
        >
          <Icons.close size={16} />
        </button>

        <div className="mb-[18px] inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 font-ui text-xs font-extrabold uppercase tracking-wide text-on-lime">
          <BrandSvg name="crown" size={15} /> SMMHUB Premium
        </div>

        <h2 className="mb-2 font-display text-[28px] font-bold leading-tight text-fg">
          Your whole month, planned for you
        </h2>
        <p className="mb-6 font-ui text-[15.5px] leading-relaxed text-fg-muted">
          Premium turns your Content Plan into a daily growth engine — every task ready
          before you start.
        </p>

        <div className="mb-7 flex flex-col gap-3">
          {INCLUDED.map((f) => (
            <div key={f.label} className="flex items-center gap-3.5">
              <span className="grid size-[38px] shrink-0 place-items-center rounded-input border-[0.5px] border-white/10 bg-tile text-lg">
                {f.icon}
              </span>
              <span className="font-ui text-[15.5px] font-semibold text-fg">{f.label}</span>
              <span className="ml-auto text-teal">
                <Icons.check size={18} strokeWidth={2.4} />
              </span>
            </div>
          ))}
        </div>

        <div className="mb-[18px] flex items-baseline gap-2.5">
          <span className="font-display text-[34px] font-extrabold text-fg">$29.99</span>
          <span className="font-ui text-[15px] font-semibold text-fg-muted">
            / month · cancel anytime
          </span>
        </div>

        <Button variant="primary" size="lg" full onClick={() => onOpenChange(false)}>
          Subscribe with Apple Pay
        </Button>
        <button
          onClick={() => onOpenChange(false)}
          className="mt-3 w-full rounded-input border-[0.5px] border-white/10 bg-white/5 px-4 py-3.5 font-display text-[15px] font-bold text-fg transition-colors hover:bg-white/10"
        >
          Other payment methods
        </button>

        <div className="mt-[18px] flex justify-center gap-4 opacity-50">
          {["VISA", "MC", "PayPal", "Pay"].map((m) => (
            <span key={m} className="font-ui text-xs font-extrabold uppercase tracking-wider text-fg-muted">
              {m}
            </span>
          ))}
        </div>
      </div>
    </Modal>
  );
}
