"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "motion/react";
import { Eye, EyeOff, Loader2, LogIn, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/constants";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginForm = z.infer<typeof loginSchema>;

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "";
  const errorParam = searchParams.get("error");
  const [showPwd, setShowPwd] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError("");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    // Get user role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    const role = profile?.role;

    if (redirect) {
      router.push(redirect);
    } else if (role === "admin") {
      router.push("/admin");
    } else if (role === "driver") {
      router.push("/driver");
    } else {
      router.push("/");
    }

    router.refresh();
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-brand-primary-dark flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl">🛕</div>
            <h1 className="text-4xl font-heading font-black text-white">{siteConfig.name}</h1>
            <p className="text-white/70 text-lg max-w-sm leading-relaxed">
              Manage your taxi platform — packages, drivers, testimonials and bookings all in one place.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {[
              { icon: "📦", label: "Packages", sub: "Manage tours" },
              { icon: "🚗", label: "Drivers", sub: "Approve & track" },
              { icon: "💬", label: "Reviews", sub: "Testimonials" },
              { icon: "📩", label: "Contacts", sub: "Inquiries" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1 rounded-2xl bg-white/10 p-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-white font-semibold text-sm">{item.label}</span>
                <span className="text-white/60 text-xs">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Logo on mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="text-3xl">🛕</div>
            <span className="text-xl font-heading font-bold text-foreground">{siteConfig.name}</span>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground">Sign In</h2>
            <p className="text-muted-foreground">
              Admin & driver portal for {siteConfig.name}
            </p>
          </div>

          {/* Error alerts */}
          {errorParam === "unauthorized" && (
            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 mb-5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              You don&apos;t have permission to access that page.
            </div>
          )}
          {serverError && (
            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 mb-5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input {...register("email")} type="email" placeholder="admin@sarthigo.com" className="h-11 rounded-xl" autoFocus />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 rounded-xl pr-11"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 rounded-xl gap-2 font-bold text-base">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : <><LogIn className="h-4 w-4" /> Sign In</>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Are you a driver?{" "}
              <Link href="/drivers/register" className="text-primary font-medium hover:underline">
                Register here
              </Link>
            </p>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Back to website
            </Link>
          </div>
        </m.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
      <LoginFormContent />
    </Suspense>
  );
}
