import { cn } from "@/lib/cn";
import { BrandSvg, LogoMark } from "@/components/icons";

export type NavId =
  | "content-plan"
  | "assistant"
  | "apps"
  | "templates"
  | "academy"
  | "challenges";

interface NavItem {
  id: NavId;
  label: string;
  /** exact Figma glyph file in /public/icons */
  icon: string;
  isNew?: boolean;
}

const NAV: readonly NavItem[] = [
  { id: "content-plan", label: "Content Plan", icon: "nav-content-plan", isNew: true },
  { id: "assistant", label: "AI Assistant", icon: "nav-assistant" },
  { id: "apps", label: "AI Apps Library", icon: "nav-apps" },
  { id: "templates", label: "Templates", icon: "nav-templates" },
  { id: "academy", label: "Growth Academy", icon: "nav-academy" },
  { id: "challenges", label: "Challenges", icon: "nav-challenges" },
];

function NavRow({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 p-[9px] text-left transition-colors",
        active ? "rounded-card bg-white/10" : "rounded-tile hover:bg-white/5",
      )}
    >
      <span className="grid size-[30px] shrink-0 place-items-center rounded-tile bg-tile">
        <BrandSvg name={item.icon} size={18} />
      </span>
      <span
        className={cn(
          "flex-1 font-display text-sm font-semibold",
          active ? "text-irid" : "text-fg",
        )}
      >
        {item.label}
      </span>
      {item.isNew && (
        <span className="rounded-full bg-lime px-2 py-[3px] font-ui text-[10px] font-extrabold uppercase tracking-wide text-on-lime">
          New
        </span>
      )}
    </button>
  );
}

function UserCard() {
  return (
    <button className="flex w-full items-center gap-3 rounded-card border-[0.5px] border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/8">
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-orange to-pink font-display text-base font-bold text-white">
        VP
      </span>
      <span className="min-w-0">
        <span className="block font-user text-sm font-medium text-fg">Vasya Pupkin</span>
        <span className="block truncate font-user text-xs text-fg-subtle">
          vasily_pupkin@gmail.com
        </span>
      </span>
    </button>
  );
}

export function Sidebar({
  active,
  onNavigate,
}: {
  active: NavId;
  onNavigate: (id: NavId) => void;
}) {
  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col gap-1 p-4">
      <div className="flex min-h-0 flex-1 flex-col rounded-card border-[0.5px] border-white/10 bg-white/10 px-3 py-5 backdrop-blur-[var(--blur-glass)]">
        <div className="flex items-center gap-3 border-b-[0.5px] border-white/10 px-1 pb-[18px]">
          <span className="grid size-[42px] place-items-center rounded-tile border-[0.5px] border-white/20 bg-white/5">
            <LogoMark size={26} />
          </span>
          <span className="font-logo text-xl font-bold tracking-wide text-fg">SMMHUB</span>
        </div>
        <nav className="flex flex-col gap-1 pt-5">
          {NAV.map((item) => (
            <NavRow
              key={item.id}
              item={item}
              active={active === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>
      </div>
      <UserCard />
    </aside>
  );
}
