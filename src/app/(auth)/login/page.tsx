"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/constants/site";
import {
  loginSchema,
  type LoginSchema,
  DUMMY_CREDENTIALS,
} from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // ─── Submit ─────────────────────────────────────────────────
  const onSubmit = async (data: LoginSchema) => {
    console.log("data: ", data);
    setServerError("");

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));

    const match = DUMMY_CREDENTIALS.find(
      (c) => c.email === data.email && c.password === data.password,
    );

    if (!match) {
      setServerError(
        "Invalid email or password. Use the demo credentials below.",
      );
      return;
    }

    router.push(match.redirect);
  };

  // ─── Quick fill helpers ──────────────────────────────────────
  const fillCreds = (role: "admin" | "driver") => {
    const cred = DUMMY_CREDENTIALS.find((c) => c.role === role)!;
    setValue("email", cred.email, { shouldValidate: true });
    setValue("password", cred.password, { shouldValidate: true });
  };

  return (
    <div className="w-full max-w-md space-y-7 py-8">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center gap-2 justify-center">
        <Image
          src={siteConfig.logoSingle}
          alt={siteConfig.name}
          width={32}
          height={32}
        />
        <span className="text-2xl font-bold text-primary">
          {siteConfig.name}
        </span>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="text-muted-foreground text-sm">
          Sign in to your account to continue
        </p>
      </div>

      {/* Demo Creds Banner */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          Demo Credentials — click to auto-fill
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fillCreds("admin")}
            className="flex-1 text-left bg-background border border-border rounded-lg px-3 py-2 text-xs hover:border-primary/50 transition-colors"
          >
            <p className="font-semibold text-foreground">Admin</p>
            <p className="text-muted-foreground">admin@sarthigo.com</p>
            <p className="text-muted-foreground">Admin@1234</p>
          </button>
          <button
            type="button"
            onClick={() => fillCreds("driver")}
            className="flex-1 text-left bg-background border border-border rounded-lg px-3 py-2 text-xs hover:border-primary/50 transition-colors"
          >
            <p className="font-semibold text-foreground">Driver</p>
            <p className="text-muted-foreground">driver@sarthigo.com</p>
            <p className="text-muted-foreground">Driver@1234</p>
          </button>
        </div>
      </div>

      {/* Server Error */}
      {serverError && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {serverError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@sarthigo.com"
            autoComplete="email"
            {...register("email")}
            className={
              errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
            }
          />
          {errors.email && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password")}
              className={`pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      {/* Google */}
      <Button variant="outline" className="w-full gap-2" type="button">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      {/* Register */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
