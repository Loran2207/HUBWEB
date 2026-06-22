import { SkeletonBar, SkeletonLines } from "@/components/ui/Skeleton";
import type { TaskKind } from "@/features/content-plan/data";

/** Loading placeholder for a task-detail body while the AI streams content. */
export function DetailSkeleton({ kind }: { kind: TaskKind }) {
  if (kind === "video") {
    return (
      <div>
        <h3 className="mb-5 font-display text-[21px] font-bold text-fg">Storyboard</h3>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="size-9 shrink-0 rounded-full cp-shimmer" />
              {i < 3 && <span className="mt-1.5 w-px flex-1 bg-white/10" />}
            </div>
            <div className="min-w-0 flex-1 pb-7">
              <SkeletonBar w={120} h={16} />
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-card border-[0.5px] border-white/10 bg-ink-700 p-4">
                  <SkeletonLines lines={3} />
                </div>
                <div className="rounded-card border-[0.5px] border-white/10 bg-ink-700 p-4">
                  <SkeletonLines lines={3} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "post") {
    return (
      <div>
        <h3 className="mb-4 font-display text-[21px] font-bold text-fg">Ready to post</h3>
        <div className="rounded-card border-[0.5px] border-white/10 bg-ink-700 p-6 md:p-8">
          <SkeletonLines lines={7} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h3 className="mb-5 font-display text-[21px] font-bold text-fg">Today's mission</h3>
      <div className="flex flex-col gap-3.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-card border-[0.5px] border-white/10 bg-ink-700 px-6 py-5">
            <SkeletonLines lines={2} />
          </div>
        ))}
      </div>
    </div>
  );
}
