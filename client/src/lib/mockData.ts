import { Task } from "./types";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Research Competitors",
    description: "Analyze top 3 competitors in the productivity space.",
    status: "Done",
    priority: "High",
    dueDate: new Date("2023-11-01"),
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Design System Draft",
    description: "Create initial color palette and typography scale.",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2023-11-15"),
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Client Meeting",
    description: "Discuss project requirements and timeline.",
    status: "To Do",
    priority: "Medium",
    dueDate: new Date("2023-11-20"),
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Update Documentation",
    description: "Reflect recent API changes in the docs.",
    status: "To Do",
    priority: "Low",
    createdAt: new Date(),
  },
];
