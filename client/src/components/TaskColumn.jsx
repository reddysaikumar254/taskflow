import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskColumn({ status, tasks, onDelete, onTaskClick }) {
  const statusColors = {
    "To Do": "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    "Done": "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const countColors = {
    "To Do": "bg-slate-200 text-slate-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Done": "bg-emerald-100 text-emerald-700",
  };

  const statusDotColor =
    status === "To Do"
      ? "bg-slate-500"
      : status === "In Progress"
      ? "bg-blue-500"
      : "bg-emerald-500";

  return (
    <div className="flex flex-col h-full bg-muted/30 rounded-xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusDotColor}`} />

          <h3 className="font-semibold text-sm text-foreground">{status}</h3>

          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${countColors[status]}`}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Task List */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={
              "flex-1 p-3 transition-colors duration-200 " +
              (snapshot.isDraggingOver ? "bg-muted/50" : "")
            }
          >
            <ScrollArea className="h-full pr-3 -mr-3">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={onDelete}
                  onClick={onTaskClick}
                />
              ))}
              {provided.placeholder}
            </ScrollArea>
          </div>
        )}
      </Droppable>
    </div>
  );
}
