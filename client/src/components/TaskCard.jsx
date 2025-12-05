import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const priorityColors = {
  Low: "bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200",
  Medium: "bg-amber-100 text-amber-700 hover:bg-amber-100/80 border-amber-200",
  High: "bg-red-100 text-red-700 hover:bg-red-100/80 border-red-200",
};

export function TaskCard({ task, index, onDelete, onClick }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3 group"
          onClick={() => onClick(task)}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <Card
            className={cn(
              "cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md border-l-4",
              snapshot.isDragging
                ? "shadow-lg scale-105 rotate-2 ring-2 ring-primary/20 z-50"
                : "shadow-sm",
              task.priority === "High"
                ? "border-l-red-500"
                : task.priority === "Medium"
                ? "border-l-amber-500"
                : "border-l-blue-500"
            )}
          >
            <CardHeader className="p-4 pb-2 space-y-0 flex flex-row items-start justify-between">
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-2 py-0.5 font-medium border",
                      priorityColors[task.priority]
                    )}
                  >
                    {task.priority}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <CardTitle className="text-sm font-semibold leading-tight pt-2 text-foreground/90">
                  {task.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-2">
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {task.description}
              </p>

              {task.dueDate && (
                <div className="flex items-center text-[11px] text-muted-foreground font-medium bg-muted/50 w-fit px-2 py-1 rounded-md">
                  <CalendarIcon className="mr-1.5 h-3 w-3" />
                  {format(new Date(task.dueDate), "MMM d")}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
