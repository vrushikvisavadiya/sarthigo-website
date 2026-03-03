"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import { X, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappBookingUrl, siteConfig } from "@/constants";
import Image from "next/image";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* ── Popup Card ── */}
          <AnimatePresence>
            {isOpen && (
              <m.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-72 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 bg-green-500 px-4 py-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                      <Image
                        src={siteConfig.logoSingle}
                        alt={siteConfig.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-green-500 bg-green-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {siteConfig.name} Support
                    </span>
                    <span className="text-xs text-white/80">
                      Typically replies instantly
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto text-white/70 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Chat Bubble */}
                <div className="p-4 bg-muted/30">
                  <div className="rounded-xl rounded-tl-none bg-background border border-border px-4 py-3 text-sm text-foreground shadow-sm max-w-[85%]">
                    👋 Hi! Planning a trip to{" "}
                    <span className="font-semibold text-primary">Somnath</span>?
                    Get instant quotes from verified local drivers!
                  </div>
                  <span className="mt-1 block text-xs text-muted-foreground pl-1">
                    {siteConfig.name} · Just now
                  </span>
                </div>

                {/* Quick Options */}
                <div className="flex flex-col gap-2 px-4 pb-4">
                  {[
                    {
                      label: "🛕 Book Somnath Taxi",
                      msg: "Hi! I want to book a taxi in Somnath.",
                    },
                    {
                      label: "📦 Ask About Packages",
                      msg: "Hi! I want to know about tour packages from Somnath.",
                    },
                    {
                      label: "🚖 Register as Driver",
                      msg: "Hi! I'm a driver in Somnath and want to join Sarthigo.",
                    },
                  ].map((opt) => (
                    <a
                      key={opt.label}
                      href={whatsappBookingUrl(opt.msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground hover:border-green-500/50 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all"
                    >
                      {opt.label}
                    </a>
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* ── Pulse Ring ── */}
          {!isOpen && (
            <span className="absolute bottom-0 right-0 h-14 w-14 animate-ping rounded-full bg-green-400 opacity-20" />
          )}

          {/* ── Main FAB Button ── */}
          <m.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-200"
            aria-label="Chat on WhatsApp"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <m.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-6 w-6" />
                </m.span>
              ) : (
                <m.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FaWhatsapp className="h-7 w-7" />
                </m.span>
              )}
            </AnimatePresence>

            {/* Unread dot */}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                1
              </span>
            )}
          </m.button>
        </div>
      )}
    </AnimatePresence>
  );
}
