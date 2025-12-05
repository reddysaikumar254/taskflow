import { useState } from "react";
import { Settings, User, ShieldCheck, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();

  // --------------------------
  // Safe user parse (robust)
  // --------------------------
  const user = (() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw || raw === "undefined") return {};
      return JSON.parse(raw);
    } catch {
      return {};
    }
  })();

  const fullName = user.fullName || user.name || user.username || "User";

  // Password states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle password update
  const handleUpdatePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in both password fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    // Ensure user exists before saving
    if (!user || Object.keys(user).length === 0) {
      toast({
        title: "Not signed in",
        description: "No user found. Please login or register first.",
        variant: "destructive",
      });
      return;
    }

    // Mock async update
    setLoading(true);
    setTimeout(() => {
      const updatedUser = { ...user, password: newPassword };
      try {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (e) {
        console.error("Failed to save user to localStorage", e);
      }

      setLoading(false);
      setNewPassword("");
      setConfirmPassword("");

      toast({
        title: "Password Updated Successfully",
        description: "Your password has been changed.",
      });
    }, 1000);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Settings className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Profile */}
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input defaultValue={fullName} className="mt-1" disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                defaultValue={user.email || ""}
                placeholder="email@example.com"
                className="mt-1"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                placeholder="Enter new password"
                className="mt-1"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm password"
                className="mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full mt-2"
              onClick={handleUpdatePassword}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Notifications Preferences</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Choose which notifications you want to receive.
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="h-4 w-4" />
              Task reminders
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="h-4 w-4" />
              Task updates
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4" />
              Marketing emails
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
