"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  loginWithFacebook,
  loginWithGoogle,
  signinWithCredentials,
} from "@/app/api/users";
import Link from "next/link";
import { toast } from "sonner";

export function LoginForm({ className }: { className?: string }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: GoogleLogin, isPending: isGoogle } = useMutation({
    mutationKey: ["google-login"],
    mutationFn: () => loginWithGoogle(),
  });
  const { mutateAsync: FacebookLogin, isPending: isMeta } = useMutation({
    mutationKey: ["facebook-login"],
    mutationFn: () => loginWithFacebook(),
  });

  const { mutateAsync: Login, isPending: isLoggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => signinWithCredentials(user.email, user.password),
    onSuccess: () => toast.success("Logged in successfully!"),
    onError: (error) => toast.error(error.message || "Login failed"),
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Login();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  autoComplete="email"
                  autoFocus
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  isLoading={isLoggingIn}
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  isLoading={isGoogle}
                  onClick={() => GoogleLogin()}
                >
                  Login with Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  isLoading={isMeta}
                  onClick={() => FacebookLogin()}
                >
                  Login with Meta
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signin" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
