import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Premium dialog shell, modeled on the SMMHUB checkout / survey dialogs:
 * a frosted black backdrop, a dark plate with soft iridescent glows clipped
 * inside, and a round close button top-right. Radix handles focus trap, Esc
 * and scroll lock; motion gives a soft spring entrance.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  children,
  className,
  width = 560,
  hideClose = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
  width?: number;
  hideClose?: boolean;
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
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[3px]"
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
                    "relative max-h-[92vh] overflow-hidden rounded-modal border-[0.5px] border-white/10 bg-ink-700",
                    className,
                  )}
                >
                  {/* soft iridescent glows clipped inside the plate */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-24 -top-28 h-[320px] w-[360px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(78,231,255,0.13), transparent 66%)" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-28 -right-20 h-[300px] w-[340px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(184,230,68,0.10), transparent 66%)" }}
                  />
                  <Dialog.Title className="sr-only">{title}</Dialog.Title>
                  {!hideClose && (
                    <button
                      onClick={() => onOpenChange(false)}
                      aria-label="Close"
                      className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-[14px] border-[0.5px] border-white/10 bg-white/10 text-fg-muted transition-colors hover:bg-white/15 hover:text-fg"
                    >
                      <Icons.close size={17} />
                    </button>
                  )}
                  <div className="relative">{children}</div>
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
