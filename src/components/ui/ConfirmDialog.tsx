import type { ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/icons";

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmLabel = "Confirm",
  icon,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  confirmLabel?: string;
  icon?: ReactNode;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title} width={440}>
      <div className="p-7 text-center">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-lime/15 text-lime">
          {icon ?? <Icons.refresh size={24} />}
        </span>
        <h2 className="font-display text-[22px] font-bold">
          <span className="text-irid-h">{title}</span>
        </h2>
        <p className="mx-auto mt-2.5 max-w-[320px] font-ui text-[14.5px] leading-relaxed text-fg-muted">
          {message}
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="ghost" full size="lg" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            full
            size="lg"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            leftIcon={<Icons.sparkle size={18} />}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
