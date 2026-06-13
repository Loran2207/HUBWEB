import { Icons, PlatformRow, TaskGlyph } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { Task } from "@/features/content-plan/data";

function Toggle({
  done,
  readOnly,
  onToggle,
}: {
  done: boolean;
  readOnly: boolean;
  onToggle: () => void;
}) {
  if (readOnly) {
    return (
      <span
        className={cn(
          "grid size-[30px] shrink-0 place-items-center rounded-full",
          done ? "bg-teal text-[#06231c]" : "border-[1.5px] border-white/20",
        )}
      >
        {done && <Icons.check size={16} strokeWidth={2.5} />}
      </span>
    );
  }
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      title={done ? "Mark as not done" : "Mark as done"}
      className={cn(
        "group/toggle grid size-[30px] shrink-0 place-items-center rounded-full transition-all",
        done
          ? "bg-teal text-[#06231c]"
          : "border-[1.5px] border-white/20 text-fg-faint hover:bg-white/10",
      )}
    >
      <span className={cn(done ? "opacity-100" : "opacity-0 group-hover/toggle:opacity-100")}>
        <Icons.check size={16} strokeWidth={2.5} />
      </span>
    </button>
  );
}

function TaskArt({ task }: { task: Task }) {
  return (
    <span className="relative grid size-[84px] shrink-0 place-items-center overflow-hidden rounded-[18px] border-[0.5px] border-white/10 bg-ink-800">
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 42%, color-mix(in srgb, ${task.accent} 26%, transparent), transparent 70%)`,
        }}
      />
      {task.illo ? (
        <img
          src={`/illos/${task.illo}.webp`}
          alt=""
          aria-hidden
          draggable={false}
          className="relative size-[74px] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
        />
      ) : (
        <span className="relative" style={{ color: task.accent }}>
          <TaskGlyph name={task.glyph} size={28} />
        </span>
      )}
    </span>
  );
}

export function TaskRow({
  task,
  done,
  readOnly,
  onToggle,
  onOpen,
}: {
  task: Task;
  done: boolean;
  readOnly: boolean;
  onToggle: () => void;
  onOpen: (task: Task) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(task)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(task)}
      className={cn(
        "group mb-4 flex cursor-pointer items-center gap-5 rounded-card border-[0.5px] bg-ink-700 px-5 py-5",
        "border-white/10 transition-all hover:-translate-y-0.5 hover:border-white/20",
        done && !readOnly && "opacity-80",
      )}
    >
      <TaskArt task={task} />

      <div className="min-w-0 flex-1">
        <h4
          className={cn(
            "mb-1.5 font-display text-[19px] font-bold leading-tight text-fg",
            done && "line-through decoration-fg-faint",
          )}
        >
          {task.title}
        </h4>
        <p className="mb-3.5 max-w-[660px] font-ui text-[14.5px] font-medium leading-normal text-fg-muted">
          {task.desc}
        </p>
        <div className="flex items-center gap-3">
          <PlatformRow platforms={task.platforms} size={20} />
          {task.format && (
            <span className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-white/10 bg-white/5 px-[11px] py-[5px] font-ui text-[12.5px] font-semibold text-fg">
              🗣️ {task.format}
            </span>
          )}
        </div>
      </div>

      <span className="hidden shrink-0 items-center gap-1.5 self-end whitespace-nowrap font-ui text-[13px] font-bold text-fg-subtle transition-colors group-hover:text-lime sm:inline-flex">
        Open <Icons.chevronRight size={16} />
      </span>

      <Toggle done={done} readOnly={readOnly} onToggle={onToggle} />
    </div>
  );
}
