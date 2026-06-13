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
        "group mb-4 flex cursor-pointer items-start gap-5 rounded-card border-[0.5px] bg-ink-700 px-6 py-[22px]",
        "border-white/10 transition-all hover:-translate-y-0.5 hover:border-white/20",
        done && !readOnly && "opacity-80",
      )}
    >
      <span
        className="grid size-[54px] shrink-0 place-items-center rounded-[15px] border-[0.5px] border-white/10 bg-ink-800"
        style={{ color: task.accent }}
      >
        <TaskGlyph name={task.glyph} size={24} />
      </span>

      <div className="min-w-0 flex-1">
        <h4
          className={cn(
            "mb-1.5 mt-0.5 font-display text-[19px] font-bold leading-tight text-fg",
            done && "line-through decoration-fg-faint",
          )}
        >
          {task.title}
        </h4>
        <p className="mb-4 max-w-[720px] font-ui text-[14.5px] font-medium leading-normal text-fg-muted">
          {task.desc}
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <PlatformRow platforms={task.platforms} size={20} />
            {task.format && (
              <span className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-white/10 bg-white/5 px-[11px] py-[5px] font-ui text-[12.5px] font-semibold text-fg">
                🗣️ {task.format}
              </span>
            )}
            <span className="font-ui text-[12.5px] font-medium text-fg-subtle">{task.eta}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-ui text-[13px] font-bold text-fg-subtle transition-colors group-hover:text-lime">
            Open <Icons.chevronRight size={16} />
          </span>
        </div>
      </div>

      <Toggle done={done} readOnly={readOnly} onToggle={onToggle} />
    </div>
  );
}
