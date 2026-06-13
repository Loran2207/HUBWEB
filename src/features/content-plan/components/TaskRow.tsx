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

function TaskIcon({ task }: { task: Task }) {
  return (
    <span
      className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-[13px] border-[0.5px] border-white/10 bg-ink-800"
      style={{ color: task.accent }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 38%, color-mix(in srgb, ${task.accent} 22%, transparent), transparent 72%)`,
        }}
      />
      <span className="relative">
        <TaskGlyph name={task.glyph} size={21} />
      </span>
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
        "group mb-4 flex cursor-pointer flex-col gap-3 rounded-card border-[0.5px] bg-ink-700 p-5",
        "border-white/10 transition-all hover:-translate-y-0.5 hover:border-white/20",
        done && !readOnly && "opacity-80",
      )}
    >
      {/* top: icon + title + checkbox (top-right) */}
      <div className="flex items-start gap-3.5">
        <TaskIcon task={task} />
        <h4
          className={cn(
            "min-w-0 flex-1 pt-0.5 font-display text-[19px] font-bold leading-tight text-fg",
            done && "line-through decoration-fg-faint",
          )}
        >
          {task.title}
        </h4>
        <Toggle done={done} readOnly={readOnly} onToggle={onToggle} />
      </div>

      <p className="font-ui text-[14.5px] font-medium leading-normal text-fg-muted">{task.desc}</p>

      {/* bottom: open arrow (bottom-left) + platforms + format */}
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen(task);
          }}
          aria-label={`Open ${task.title}`}
          className="grid size-9 shrink-0 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/5 text-fg-subtle transition-all hover:bg-white/10 hover:text-lime group-hover:border-white/20"
        >
          <Icons.chevronRight size={17} />
        </button>
        <PlatformRow platforms={task.platforms} size={20} />
        {task.format && (
          <span className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-white/10 bg-white/5 px-[11px] py-[5px] font-ui text-[12.5px] font-semibold text-fg">
            <Icons.mic size={13} /> {task.format}
          </span>
        )}
      </div>
    </div>
  );
}
