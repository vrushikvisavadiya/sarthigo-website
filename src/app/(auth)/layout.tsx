import Image from "next/image";
import { siteConfig } from "@/constants/site";

// ─── Left Branding Panel (shared across auth pages) ───────────
export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
      {/* BG Blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <Image
          src={siteConfig.logoSingle}
          alt={siteConfig.name}
          width={36}
          height={36}
          className="brightness-0 invert"
        />
        <span className="text-2xl font-bold text-white">{siteConfig.name}</span>
      </div>

      {/* Center */}
      <div className="relative z-10 space-y-6">
        <h1 className="text-4xl font-bold text-white leading-tight">
          Manage your drivers
          <br />
          smarter & faster
        </h1>
        <p className="text-white/70 text-lg leading-relaxed">
          {siteConfig.description}
        </p>
        <div className="grid grid-cols-3 gap-4 pt-4">
          {[
            { value: "500+", label: "Drivers" },
            { value: "12k+", label: "Trips" },
            { value: "99%", label: "Uptime" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-white/60 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-white/40 text-sm">
        © {new Date().getFullYear()} {siteConfig.fullName}
      </p>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      <AuthBrandPanel />
      {/* Right panel — each page renders its own form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
