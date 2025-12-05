import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { INITIAL_TASKS } from "@/lib/mockData";
import { TaskColumn } from "@/components/TaskColumn";
import { TaskDialog } from "@/components/TaskDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  LogOut,
  LayoutDashboard,
  Settings,
  Bell,
  Plus,
} from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  // -----------------------------------------------------
  // SAFE PARSING FOR LOCALSTORAGE TASKS
  // -----------------------------------------------------
  let savedTasks = [];
  try {
    const raw = localStorage.getItem("tasks");
    savedTasks = raw ? JSON.parse(raw) : [];
  } catch {
    savedTasks = [];
    localStorage.setItem("tasks", "[]");
  }

  const [tasks, setTasks] = useState(savedTasks.length ? savedTasks : INITIAL_TASKS);
  const [search, setSearch] = useState("");

  // Save tasks anytime they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // -----------------------------------------------------
  // SAFE USER INFO PARSING (THIS FIXES YOUR ERROR)
  // -----------------------------------------------------
  let user = {};
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch {
    user = {};
    localStorage.setItem("user", "{}");
  }

  const fullName =
    user.fullName || user.name || user.username || "User";

  const avatarLetter = fullName.charAt(0).toUpperCase();

  // -----------------------------------------------------
  // TASK DIALOG STATE
  // -----------------------------------------------------
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Generate ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // -----------------------------------------------------
  // DRAG AND DROP HANDLER
  // -----------------------------------------------------
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = tasks.map((t) =>
      t.id === draggableId
        ? { ...t, status: destination.droppableId }
        : t
    );

    setTasks(updatedTasks);
  };

  // -----------------------------------------------------
  // SAVE TASK
  // -----------------------------------------------------
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id ? { ...t, ...taskData } : t
        )
      );

      toast({ title: "Task updated", description: "Changes saved." });
    } else {
      const newTask = {
        ...taskData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };

      setTasks([...tasks, newTask]);

      toast({ title: "Task created", description: "Task added to board." });
    }

    setEditingTask(null);
  };

  const handleCreateClick = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const handleTaskClick = (task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));

    toast({ title: "Task deleted", description: "Task has been removed." });
  };

  // -----------------------------------------------------
  // LOGOUT
  // -----------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/auth");
  };

  // -----------------------------------------------------
  // SEARCH FILTER
  // -----------------------------------------------------
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------
  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-card flex-col hidden md:flex">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            TaskFlow
          </div>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1">
          <Button variant="secondary" className="w-full justify-start" onClick={() => setLocation("/")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Board
          </Button>

          <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("/notifications")}>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>

          <Button variant="ghost" className="w-full justify-start" onClick={() => setLocation("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {avatarLetter}
            </div>

            <p className="text-sm font-medium truncate">{fullName}</p>
          </div>

          <Button variant="outline" className="w-full text-xs" onClick={handleLogout}>
            <LogOut className="mr-2 h-3 w-3" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9 bg-muted/50 border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button className="bg-primary text-white shadow-sm" onClick={handleCreateClick}>
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        </header>

        <div className="flex-1 overflow-hidden p-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              <TaskColumn
                status="To Do"
                tasks={filteredTasks.filter((t) => t.status === "To Do")}
                onDelete={handleDeleteTask}
                onTaskClick={handleTaskClick}
              />

              <TaskColumn
                status="In Progress"
                tasks={filteredTasks.filter((t) => t.status === "In Progress")}
                onDelete={handleDeleteTask}
                onTaskClick={handleTaskClick}
              />

              <TaskColumn
                status="Done"
                tasks={filteredTasks.filter((t) => t.status === "Done")}
                onDelete={handleDeleteTask}
                onTaskClick={handleTaskClick}
              />
            </div>
          </DragDropContext>
        </div>
      </main>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
