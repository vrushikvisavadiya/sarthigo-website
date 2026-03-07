import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// ─── Dummy credentials ────────────────────────────────────────
export const DUMMY_CREDENTIALS = [
  {
    email: "admin@sarthigo.com",
    password: "Admin@1234",
    role: "admin",
    name: "Sarthak Admin",
    redirect: "/admin",
  },
  {
    email: "driver@sarthigo.com",
    password: "Driver@1234",
    role: "driver",
    name: "Ravi Sharma",
    redirect: "/driver",
  },
] as const;
