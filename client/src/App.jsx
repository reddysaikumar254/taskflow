import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import { useEffect } from "react";
import Notifications from "@/pages/Notifications";
import SettingsPage from "@/pages/Settings";


function ProtectedRoute({ component }) {
  const ComponentType = component;

  const [location, setLocation] = useLocation();
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/auth");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <ComponentType />;   // ✅ FIXED HERE
}

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />

      {/* NEW ROUTES */}
      <Route path="/notifications">
        <ProtectedRoute component={Notifications} />
      </Route>

      <Route path="/settings">
        <ProtectedRoute component={SettingsPage} />
      </Route>

      {/* Dashboard */}
      <Route path="/">
        <ProtectedRoute component={Dashboard} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
