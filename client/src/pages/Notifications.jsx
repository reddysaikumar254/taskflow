import { Bell, CheckCircle, Info, AlertTriangle } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Task Completed",
      message: "You successfully completed the task: UI Wireframes.",
      type: "success",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "New Task Assigned",
      message: "A new task was added to your board by Admin.",
      type: "info",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Upcoming Deadline",
      message: "Your task 'Client Meeting Prep' is due tomorrow.",
      type: "warning",
      time: "1 day ago",
    },
  ];

  const typeStyles = {
    success: "text-green-600 bg-green-100",
    info: "text-blue-600 bg-blue-100",
    warning: "text-yellow-600 bg-yellow-100",
  };

  const typeIcons = {
    success: <CheckCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-semibold">Notifications</h1>
      </div>

      <div className="space-y-4 max-w-3xl">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`p-2 rounded-full ${typeStyles[n.type]}`}
            >
              {typeIcons[n.type]}
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{n.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
