import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/cn";
import { REGEN, type RegenField } from "@/features/content-plan/task-content";
import type { TaskKind } from "@/features/content-plan/data";

function FieldShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-ui text-sm font-semibold text-fg-muted">{label}</span>
      {children}
    </label>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: RegenField;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.type === "segment") {
    return (
      <FieldShell label={field.label}>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-input border-[0.5px] px-4 py-2.5 font-ui text-sm font-semibold transition-colors",
                value === opt
                  ? "border-transparent bg-lime text-on-lime"
                  : "border-white/10 bg-white/5 text-fg hover:bg-white/10",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </FieldShell>
    );
  }
  if (field.type === "select") {
    return (
      <FieldShell label={field.label}>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none rounded-input border-[0.5px] border-white/10 bg-tile px-4 py-3 pr-10 font-ui text-[15px] text-fg outline-none transition-colors focus:border-lime/50"
          >
            {field.options?.map((opt) => (
              <option key={opt} value={opt} className="bg-ink-800 text-fg">
                {opt}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 -rotate-90 text-fg-subtle">
            <Icons.chevronRight size={16} />
          </span>
        </div>
      </FieldShell>
    );
  }
  if (field.type === "textarea") {
    return (
      <FieldShell label={field.label}>
        <textarea
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-input border-[0.5px] border-white/10 bg-tile px-4 py-3 font-ui text-[15px] leading-relaxed text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-lime/50"
        />
      </FieldShell>
    );
  }
  return (
    <FieldShell label={field.label}>
      <input
        type="text"
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-input border-[0.5px] border-white/10 bg-tile px-4 py-3 font-ui text-[15px] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-lime/50"
      />
    </FieldShell>
  );
}

function initialValues(kind: TaskKind): Record<string, string> {
  const cfg = REGEN[kind];
  const v: Record<string, string> = {};
  for (const f of cfg.fields) v[f.key] = f.value ?? f.options?.[0] ?? "";
  return v;
}

export function RegenModal({
  kind,
  open,
  onOpenChange,
  onApply,
}: {
  kind: TaskKind;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (values: Record<string, string>) => void;
}) {
  const cfg = REGEN[kind];
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(kind));

  const apply = () => onApply(values);

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={cfg.title} width={520}>
      <div className="p-7">
        <div className="mb-1 flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-input bg-lime/15 text-lime">
            <Icons.wand size={18} />
          </span>
          <h2 className="font-display text-[22px] font-bold">
            <span className="text-irid-h">{cfg.title}</span>
          </h2>
        </div>
        <p className="mb-6 font-ui text-sm leading-relaxed text-fg-muted">
          Tweak the inputs and the AI rewrites this task to match.
        </p>

        <div className="flex flex-col gap-5">
          {cfg.fields.map((f) => (
            <Field
              key={f.key}
              field={f}
              value={values[f.key] ?? ""}
              onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
            />
          ))}
        </div>

        <div className="mt-7 flex gap-3">
          <Button variant="ghost" full size="lg" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" full size="lg" onClick={apply} leftIcon={<Icons.sparkle size={18} />}>
            {cfg.cta}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
