import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/api";

export default function AuthPage() {
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await apiRequest("/auth/login", "POST", { email, password });
    if (!res || !res.success) {
      alert(res?.message || "Login failed");
      setIsLoading(false);
      return;
    }
    if (res.user) localStorage.setItem("user", JSON.stringify(res.user));
    setIsLoading(false);
    setLocation("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fullName = e.target.name.value;
    const email = e.target["new-email"].value;
    const password = e.target["new-password"].value;

    const res = await apiRequest("/auth/register", "POST", { fullName, email, password });
    if (!res || !res.success) {
      alert(res?.message || "Registration failed");
      setIsLoading(false);
      return;
    }
    if (res.user) localStorage.setItem("user", JSON.stringify(res.user));
    setIsLoading(false);
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg mb-2">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">TaskFlow</h1>
          <p className="text-muted-foreground">Manage your projects with elegance and speed.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-muted/50">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-none shadow-xl">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Enter your credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={isLoading}>{isLoading ? "Signing in..." : "Sign In"}</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-none shadow-xl">
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><Label>Full Name</Label><Input id="name" required /></div>
                  <div><Label>Email</Label><Input id="new-email" type="email" required /></div>
                  <div><Label>Password</Label><Input id="new-password" type="password" required /></div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={isLoading}>{isLoading ? "Creating..." : "Create Account"}</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
