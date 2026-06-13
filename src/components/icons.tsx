import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  Film,
  Info,
  Lock,
  MessageCircle,
  Mic,
  PenLine,
  RefreshCw,
  Search,
  Send,
  Sliders,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Wand2,
  X,
  type LucideIcon,
} from "lucide-react";
import type { GlyphName, Platform } from "@/features/content-plan/data";

export const Icons = {
  check: Check,
  lock: Lock,
  chevronRight: ChevronRight,
  arrowLeft: ArrowLeft,
  sparkle: Sparkles,
  refresh: RefreshCw,
  film: Film,
  edit: PenLine,
  message: MessageCircle,
  mic: Mic,
  clock: Clock,
  copy: Copy,
  wand: Wand2,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  close: X,
  info: Info,
  eye: Eye,
  send: Send,
  sliders: Sliders,
  search: Search,
} satisfies Record<string, LucideIcon>;

const GLYPHS: Record<GlyphName, LucideIcon> = {
  film: Film,
  edit: PenLine,
  message: MessageCircle,
};

export function TaskGlyph({ name, size = 24 }: { name: GlyphName; size?: number }) {
  const Glyph = GLYPHS[name];
  return <Glyph size={size} strokeWidth={1.9} />;
}

/** Renders an exact brand SVG exported from Figma (lives in /public/icons). */
export function BrandSvg({
  name,
  size = 18,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt=""
      aria-hidden
      draggable={false}
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

/** SMMHUB "S" wordmark glyph — exact Figma vector (metallic white gradient). */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/icons/logo-s.svg"
      alt="SMMHUB"
      draggable={false}
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}

const PLATFORM_PATHS: Record<Platform, string> = {
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  tiktok:
    "M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.74a5.7 5.7 0 0 0-.78-.05 5.7 5.7 0 1 0 5.7 5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-.86.04-1.33.18-1.64.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.78-.3 1.64-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.86.18 1.33.3 1.64.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.78.26 1.64.3 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.86-.04 1.33-.18 1.64-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.78.3-1.64.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.86-.18-1.33-.3-1.64a2.7 2.7 0 0 0-.66-1.01 2.7 2.7 0 0 0-1.01-.66c-.31-.12-.78-.26-1.64-.3-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92zm0 1.62a3.84 3.84 0 1 0 0 7.68 3.84 3.84 0 0 0 0-7.68zm5.65-2.9a1.28 1.28 0 1 1 0 2.56 1.28 1.28 0 0 1 0-2.56z",
  youtube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z",
  threads:
    "M16.7 11.2c-.09-.04-.18-.08-.28-.12-.17-3.07-1.85-4.83-4.66-4.85h-.04c-1.68 0-3.08.72-3.94 2.02l1.54 1.06c.64-.97 1.65-1.18 2.4-1.18h.03c.94 0 1.64.27 2.1.81.33.39.55.93.66 1.62a11.7 11.7 0 0 0-2.62-.13c-2.64.15-4.33 1.69-4.22 3.83.06 1.08.6 2.02 1.51 2.63.78.52 1.78.77 2.82.71 1.38-.07 2.46-.6 3.21-1.56.57-.73.94-1.68 1.1-2.87.66.4 1.15.92 1.42 1.55.46 1.08.49 2.85-.96 4.29-1.27 1.27-2.8 1.82-5.1 1.84-2.55-.02-4.49-.84-5.75-2.44C5.46 16.4 4.86 14.3 4.84 12c.02-2.3.62-4.4 1.79-5.91C7.9 4.49 9.83 3.67 12.38 3.65c2.57.02 4.53.85 5.83 2.46.64.79 1.12 1.79 1.43 2.93l1.7-.46c-.38-1.4-.98-2.62-1.79-3.62C17.93 2.93 15.45 1.83 12.39 1.8h-.01c-3.06.02-5.41 1.13-6.98 3.29C4.02 7.06 3.3 9.4 3.28 11.99v.02c.02 2.59.74 4.93 2.12 6.9 1.57 2.16 3.92 3.27 6.98 3.29h.01c2.72-.02 4.64-.73 6.22-2.31 2.07-2.07 2.01-4.66 1.32-6.25-.49-1.14-1.42-2.07-2.69-2.69z",
};

export function PlatformBadge({
  platform,
  size = 22,
}: {
  platform: Platform;
  size?: number;
}) {
  return (
    <span
      className="grid place-items-center rounded-tile bg-white/5 text-fg-muted ring-[0.5px] ring-white/10"
      style={{ width: size + 12, height: size + 12 }}
      title={platform}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={PLATFORM_PATHS[platform]} />
      </svg>
    </span>
  );
}

export function PlatformRow({
  platforms,
  size = 22,
}: {
  platforms: readonly Platform[];
  size?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {platforms.map((p) => (
        <PlatformBadge key={p} platform={p} size={size} />
      ))}
    </div>
  );
}
