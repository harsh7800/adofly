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
  signupWithCredentials,
} from "@/app/api/users";
import Link from "next/link";
import { toast } from "sonner";

export function SignInForm({ className }: { className?: string }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { mutateAsync: GoogleLogin, isPending: isGoogle } = useMutation({
    mutationKey: ["google-signin"],
    mutationFn: () => loginWithGoogle(),
  });

  const { mutateAsync: FacebookLogin, isPending: isMeta } = useMutation({
    mutationKey: ["facebook-login"],
    mutationFn: () => loginWithFacebook(),
  });

  const { mutateAsync: SignIn, isPending: isSignIn } = useMutation({
    mutationKey: ["signin"],
    mutationFn: () =>
      signupWithCredentials(user.email, user.name, user.password),
    onSuccess: () => toast.success("Signed up successfully!"),
    onError: (error) => {
      toast.error(error.message || "Signup failed");
      console.error("Error signing in:", error);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>SignUp to Adofly</CardTitle>
          <CardDescription>Enter your email below to signup</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              SignIn();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  value={user.name}
                  id="name"
                  type="name"
                  placeholder="Peter Griffin"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  id="email"
                  type="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
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
                  autoComplete="new-password"
                  placeholder="********"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  disabled={isSignIn || isGoogle}
                  isLoading={isSignIn}
                  type="submit"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isSignIn || isGoogle}
                  isLoading={isGoogle}
                  type="button"
                  onClick={() => GoogleLogin()}
                >
                  Sign In with Google
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
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
