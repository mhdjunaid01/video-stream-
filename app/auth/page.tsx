"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthPage = () => {
  const { login, register, user, loading } = useAuth();
  const router = useRouter();

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", password: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [loading, user, router]);

  if (loading) return <p className="p-8">Loading…</p>;

  const handleLoginData = (e: ChangeEvent<HTMLInputElement>) =>
    setSignInData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignUpData = (e: ChangeEvent<HTMLInputElement>) =>
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(signInData.email, signInData.password);
      setSignInData({ email: "", password: "" });
      toast.success("Login successful!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(registerData.email, registerData.password);
      setRegisterData({ email: "", password: "" });
      toast.success("Registration successful! You can now sign in.");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs defaultValue="signIn" className="w-full max-w-sm">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In */}
          <TabsContent value="signIn">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your email and password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      value={signInData.email}
                      onChange={handleLoginData}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      value={signInData.password}
                      onChange={handleLoginData}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <CardFooter className="mt-4">
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register */}
          <TabsContent value="register">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Enter your email and password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      value={registerData.email}
                      onChange={handleSignUpData}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      value={registerData.password}
                      onChange={handleSignUpData}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <CardFooter className="mt-4">
                    <Button type="submit" className="w-full">
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
