import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/motion-provider";

const fontHeading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const fontBase = Inter({
  variable: "--font-base",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sarthigo – Taxi & Tour Booking for Pilgrimage Cities",
    template: "%s | Sarthigo",
  },
  description:
    "Pre-book verified local taxis and multi-day tour packages in Somnath, Dwarka, Gir, Junagadh and across Gujarat's pilgrimage cities.",
  icons: {
    icon: "/favicon.ico", // put a 32x32 version here
    apple: "/apple-touch-icon.png", // 180x180 version
  },
  openGraph: {
    images: ["/og-image.png"], // 1200x630 banner for WhatsApp/social sharing
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontBase.variable} font-base antialiased`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
