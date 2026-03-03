import { z } from "zod";

export const driverRegisterSchema = z.object({
  // Personal Info
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name too long"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),

  // ── Zod v4 fix: errorMap → error ──
  city: z.enum(["somnath", "dwarka", "gir", "junagadh", "ambaji", "kutch"], {
    error: "Please select your operating city",
  }),

  vehicleType: z.enum(["sedan", "suv", "innova", "tempo"], {
    error: "Please select your vehicle type",
  }),

  vehicleModel: z
    .string()
    .min(2, "Enter your vehicle model")
    .max(40, "Vehicle model too long"),

  vehicleNumber: z
    .string()
    .regex(
      /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
      "Enter valid vehicle number (e.g. GJ12AB1234)",
    ),

  experience: z.enum(["0-1", "1-3", "3-5", "5+"], {
    error: "Please select your experience",
  }),

  // Documents
  hasLicense: z
    .boolean()
    .refine((v) => v === true, "Valid driving license is required"),

  hasRC: z.boolean().refine((v) => v === true, "Valid RC book is required"),

  hasInsurance: z
    .boolean()
    .refine((v) => v === true, "Valid insurance is required"),

  // Agreement
  agreeToTerms: z
    .boolean()
    .refine((v) => v === true, "You must agree to terms"),
});

export type DriverRegisterFormData = z.infer<typeof driverRegisterSchema>;
