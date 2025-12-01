import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { INITIAL_TASKS } from "@/lib/mockData";
import { Task, Status } from "@/lib/types";
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
  UserCircle,
  Plus
} from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [search, setSearch] = useState("");
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = tasks.find((t) => t.id === draggableId);
    if (!draggedTask) return;

    const newStatus = destination.droppableId as Status;
    
    // Create new array to avoid mutation
    const newTasks = tasks.map(t => 
      t.id === draggableId ? { ...t, status: newStatus } : t
    );
    
    setTasks(newTasks);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } as Task : t));
      toast({
        title: "Task updated",
        description: "Changes saved successfully.",
      });
    } else {
      // Create new
      const task: Task = {
        ...taskData as Task,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
      };
      setTasks([...tasks, task]);
      toast({
        title: "Task created",
        description: "Your new task has been added to the board.",
      });
    }
    setEditingTask(null);
  };

  const handleCreateClick = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/auth");
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            TaskFlow
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          <Button variant="secondary" className="w-full justify-start font-medium">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Board
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs" onClick={handleLogout}>
            <LogOut className="mr-2 h-3 w-3" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tasks..." 
                className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={handleCreateClick}>
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              <TaskColumn 
                status="To Do" 
                tasks={filteredTasks.filter(t => t.status === "To Do")} 
                onDelete={handleDeleteTask}
                onTaskClick={handleTaskClick}
              />
              <TaskColumn 
                status="In Progress" 
                tasks={filteredTasks.filter(t => t.status === "In Progress")}
                onDelete={handleDeleteTask}
                onTaskClick={handleTaskClick}
              />
              <TaskColumn 
                status="Done" 
                tasks={filteredTasks.filter(t => t.status === "Done")}
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
