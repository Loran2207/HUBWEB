import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { BrandSvg, Icons } from "@/components/icons";
import { cn } from "@/lib/cn";

const INCLUDED = [
  "Daily viral content ideas",
  "Professional video scripts",
  "Ready-to-post captions & posts",
  "Personalized growth tasks",
  "A full month, planned ahead",
];

type PlanId = "monthly" | "yearly";
type Method = "apple" | "paypal" | "card";

const PLANS: Record<PlanId, { label: string; price: string; per: string; total: number; badge?: string }> = {
  monthly: { label: "Monthly", price: "$19.99", per: "/ month", total: 19.99 },
  yearly: { label: "Yearly", price: "$29.99", per: "/ year", total: 29.99, badge: "SAVE 87%" },
};

const METHOD_LABEL: Record<Method, string> = {
  apple: "Pay with Apple Pay",
  paypal: "Continue with PayPal",
  card: "Pay by card",
};

function Segment<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "flex-1 rounded-input border-[0.5px] px-3 py-2.5 font-ui text-[13.5px] font-semibold transition-colors",
            value === o.id
              ? "border-white/15 bg-white/10 text-fg"
              : "border-white/10 bg-white/5 text-fg-subtle hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Paywall({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [plan, setPlan] = useState<PlanId>("yearly");
  const [method, setMethod] = useState<Method>("apple");
  const p = PLANS[plan];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="SMMHUB Premium checkout"
      width={520}
      className="bg-[radial-gradient(120%_80%_at_50%_0%,rgba(184,230,68,0.12),transparent_55%),var(--color-ink-800)]"
    >
      <div className="p-7">
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute right-[18px] top-[18px] grid size-[34px] place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg-muted transition-colors hover:bg-white/10"
        >
          <Icons.close size={16} />
        </button>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 font-ui text-xs font-extrabold uppercase tracking-wide text-on-lime">
          <BrandSvg name="crown" size={15} /> SMMHUB Premium
        </div>

        <h2 className="mb-2 font-display text-[26px] font-bold leading-tight text-fg">
          Unlock your whole month
        </h2>
        <p className="mb-5 font-ui text-[15px] leading-relaxed text-fg-muted">
          Every day planned ahead — ideas, scripts and growth tasks, ready when you wake up.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {INCLUDED.map((f) => (
            <div key={f} className="flex items-center gap-2.5">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                <Icons.check size={12} strokeWidth={2.6} />
              </span>
              <span className="font-ui text-[13.5px] font-medium text-fg">{f}</span>
            </div>
          ))}
        </div>

        {/* plan */}
        <div className="mb-2 font-ui text-[12.5px] font-semibold text-fg-subtle">Choose a plan</div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          {(Object.keys(PLANS) as PlanId[]).map((id) => {
            const pl = PLANS[id];
            const on = plan === id;
            return (
              <button
                key={id}
                onClick={() => setPlan(id)}
                className={cn(
                  "relative rounded-card border px-4 py-3.5 text-left transition-colors",
                  on ? "border-lime bg-lime/[0.07]" : "border-white/10 bg-white/5 hover:bg-white/8",
                )}
              >
                {pl.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-pink px-2 py-0.5 font-ui text-[10px] font-extrabold uppercase tracking-wide text-white">
                    {pl.badge}
                  </span>
                )}
                <div className="font-display text-[15px] font-bold text-fg">{pl.label}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display text-xl font-extrabold text-fg">{pl.price}</span>
                  <span className="font-ui text-[12px] font-medium text-fg-subtle">{pl.per}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* payment method */}
        <div className="mb-2 font-ui text-[12.5px] font-semibold text-fg-subtle">Payment method</div>
        <div className="mb-5">
          <Segment<Method>
            value={method}
            onChange={setMethod}
            options={[
              { id: "apple", label: "Apple Pay" },
              { id: "paypal", label: "PayPal" },
              { id: "card", label: "Credit Card" },
            ]}
          />
        </div>

        <div className="mb-4 flex items-center justify-between border-t-[0.5px] border-white/10 pt-4">
          <span className="font-ui text-sm font-medium text-fg-muted">Total today</span>
          <span className="font-display text-xl font-extrabold text-fg">{p.price}</span>
        </div>

        <Button variant="primary" size="lg" full onClick={() => onOpenChange(false)}>
          {METHOD_LABEL[method]}
        </Button>

        <p className="mt-3 text-center font-ui text-[12px] text-fg-faint">
          Auto-renewable. Cancel anytime · Restore · Terms · Privacy
        </p>
        <div className="mt-3 flex justify-center gap-4 opacity-50">
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
