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
export type Method = "apple" | "paypal" | "card";
export type PaywallVariant = "default" | "aurora";

const PLANS: Record<PlanId, { label: string; price: string; per: string; badge?: string }> = {
  monthly: { label: "Monthly", price: "$19.99", per: "/ month" },
  yearly: { label: "Yearly", price: "$29.99", per: "/ year", badge: "SAVE 87%" },
};
const METHOD_LABEL: Record<Method, string> = {
  apple: "Pay with Apple Pay",
  paypal: "Continue with PayPal",
  card: "Pay securely",
};
const FIELD =
  "w-full rounded-input border-[0.5px] border-white/10 bg-ink-800 px-4 py-3 font-ui text-[15px] text-fg outline-none placeholder:text-fg-faint focus:border-lime/50";

function Labeled({ label, span2, children }: { label: string; span2?: boolean; children: React.ReactNode }) {
  return (
    <label className={cn("block", span2 && "col-span-2")}>
      <span className="mb-1.5 block font-ui text-[12.5px] font-semibold text-fg-muted">{label}</span>
      {children}
    </label>
  );
}

function CardFields() {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3">
      <Labeled label="Card number" span2>
        <input className={FIELD} placeholder="1234 1234 1234 1234" />
      </Labeled>
      <Labeled label="Expiry">
        <input className={FIELD} placeholder="07 / 28" />
      </Labeled>
      <Labeled label="Security code">
        <input className={FIELD} placeholder="123" />
      </Labeled>
      <Labeled label="Cardholder name" span2>
        <input className={FIELD} placeholder="Vasya Pupkin" />
      </Labeled>
    </div>
  );
}

function Segment({ value, options, onChange }: { value: Method; options: { id: Method; label: string }[]; onChange: (v: Method) => void }) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "flex-1 rounded-input border-[0.5px] px-3 py-2.5 font-ui text-[13.5px] font-semibold transition-colors",
            value === o.id ? "border-white/15 bg-white/10 text-fg" : "border-white/10 bg-white/5 text-fg-subtle hover:text-fg",
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
  variant = "default",
  initialMethod = "apple",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: PaywallVariant;
  initialMethod?: Method;
}) {
  const [plan, setPlan] = useState<PlanId>("yearly");
  const [method, setMethod] = useState<Method>(initialMethod);
  const p = PLANS[plan];
  const aurora = variant === "aurora";

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="SMMHUB Premium checkout" width={600} hideClose>
      <div className="relative p-7">
        {aurora && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_12%_6%,rgba(240,84,64,0.20),transparent_60%),radial-gradient(72%_92%_at_104%_44%,rgba(150,60,255,0.26),transparent_62%)]"
          />
        )}
        <div className="relative">
          <div
            className={cn(
              "mb-5 flex items-center gap-3 rounded-card border-[0.5px] border-white/10 px-4 py-3",
              aurora ? "bg-white/5" : "bg-[linear-gradient(100deg,rgba(78,231,255,0.16),rgba(184,230,68,0.14))]",
            )}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime/20 text-lime">
              <BrandSvg name="crown" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-display text-[15.5px] font-bold text-fg">SMMHUB Premium</div>
              <div className="font-ui text-[12.5px] text-fg-muted">Everything to plan, create and grow</div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="grid size-9 shrink-0 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/10 text-fg-muted transition-colors hover:text-fg"
            >
              <Icons.close size={16} />
            </button>
          </div>

          <h2 className="mb-2 font-display text-[26px] font-bold leading-tight">
            <span className="text-irid-h">Unlock your whole month</span>
          </h2>
          <p className="mb-5 font-ui text-[15px] leading-relaxed text-fg-muted">
            Every day planned ahead, ideas, scripts and growth tasks, ready when you wake up.
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

          <div className="mb-2 font-ui text-[12.5px] font-semibold text-fg-subtle">Payment method</div>
          <div className="mb-5">
            <Segment
              value={method}
              onChange={setMethod}
              options={[
                { id: "apple", label: "Apple Pay" },
                { id: "paypal", label: "PayPal" },
                { id: "card", label: "Credit Card" },
              ]}
            />
          </div>

          {method === "card" && <CardFields />}
          {method === "paypal" && (
            <div className="mb-5">
              <Labeled label="PayPal email">
                <input className={FIELD} placeholder="you@email.com" />
              </Labeled>
              <div className="mt-2.5 flex items-center gap-2 font-ui text-[12.5px] text-fg-subtle">
                <Icons.info size={14} /> You will be redirected to PayPal to confirm.
              </div>
            </div>
          )}

          <div className="mb-4 flex items-center justify-between border-t-[0.5px] border-white/10 pt-4">
            <span className="font-ui text-sm font-medium text-fg-muted">Total today</span>
            <span className="font-display text-xl font-extrabold text-fg">{p.price}</span>
          </div>

          <Button variant="primary" size="lg" full onClick={() => onOpenChange(false)}>
            {METHOD_LABEL[method]}
          </Button>

          <p className="mt-3 text-center font-ui text-[12px] text-fg-faint">
            Auto-renewable. Cancel anytime. Restore. Terms. Privacy.
          </p>
          <div className="mt-3 flex justify-center gap-4 opacity-50">
            {["VISA", "MC", "PayPal", "Pay"].map((m) => (
              <span key={m} className="font-ui text-xs font-extrabold uppercase tracking-wider text-fg-muted">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
