import { cn } from "@/lib/cn";

/** A single shimmering placeholder bar used while content streams in. */
export function SkeletonBar({
  w = "100%",
  h = 14,
  className,
}: {
  w?: string | number;
  h?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("block rounded-full cp-shimmer", className)}
      style={{ width: w, height: h }}
    />
  );
}

/** A stack of skeleton lines, last line shortened, for a text block. */
export function SkeletonLines({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <span className={cn("flex flex-col gap-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBar key={i} w={i === lines - 1 ? "62%" : "100%"} />
      ))}
    </span>
  );
}
