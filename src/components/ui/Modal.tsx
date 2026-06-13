import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Accessible modal (focus trap, Esc, scroll lock via Radix) with a soft
 * spring entrance via motion. `title` is read by screen readers.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  children,
  className,
  width = 560,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
  width?: number;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[6px]"
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-6">
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  style={{ width: `min(${width}px, 100%)` }}
                  className={cn(
                    "relative max-h-[92vh] overflow-y-auto rounded-modal border-[0.5px] border-white/10 bg-ink-800 shadow-[0_16px_48px_rgba(0,0,0,0.45)]",
                    className,
                  )}
                >
                  <Dialog.Title className="sr-only">{title}</Dialog.Title>
                  {children}
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export const DialogClose = Dialog.Close;
