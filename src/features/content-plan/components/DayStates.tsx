import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export function LockedDay({
  date,
  idea,
  onUnlock,
}: {
  date: number;
  idea: string | null;
  onUnlock: () => void;
}) {
  return (
    <div className="grid place-items-center pb-2 pt-5">
      <div className="w-full max-w-[600px] text-center">
        <div className="overflow-hidden rounded-card border-[0.5px] border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(0,166,255,0.12),transparent_60%)] px-8 py-9">
          <span className="mx-auto mb-[18px] grid size-16 place-items-center rounded-[18px] border-[0.5px] border-white/10 bg-tile text-gold">
            <Icons.lock size={26} strokeWidth={1.8} />
          </span>
          <h3 className="mb-2 font-display text-[23px] font-bold text-fg">
            Jan {date} is part of Premium
          </h3>
          <p className="mb-5 font-ui text-[15.5px] leading-relaxed text-fg-muted">
            Your free plan covers today. Unlock the full month and we'll plan every day
            ahead, ideas, scripts and growth tasks, ready when you wake up.
          </p>
          {idea && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-[0.5px] border-white/10 bg-white/5 px-3.5 py-2">
              <span className="select-none font-ui text-[13.5px] font-semibold text-fg-muted blur-[3px]">
                {idea}
              </span>
              <Icons.lock size={13} />
            </div>
          )}
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={onUnlock}
              leftIcon={<Icons.sparkle size={18} />}
            >
              Unlock Premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
