import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Home, Bell, Settings, LogOut } from "lucide-react";

export default function AppSidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="font-semibold text-lg px-2">TaskFlow</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>

          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/">
                  <Home size={16} />
                  Board
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* ENABLE NOTIFICATIONS */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/notifications">
                  <Bell size={16} />
                  Notifications
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* ENABLE SETTINGS */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/settings">
                  <Settings size={16} />
                  Settings
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* USER SECTION (Updated) */}
      <SidebarFooter>
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">{username}</span>
            {/* Removed "Pro Plan" */}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
