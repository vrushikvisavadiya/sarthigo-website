"use client";

import { useState, useRef } from "react";
import { m, AnimatePresence, useInView } from "motion/react";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQ_CATEGORIES, whatsappBookingUrl } from "@/constants";
import type { FaqCategory } from "@/constants";
import { cn } from "@/lib/utils";

// ── Single Accordion Item ──────────────────────
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-background hover:bg-muted/40 transition-colors"
      >
        <span className="font-medium text-foreground text-sm md:text-base leading-snug">
          {question}
        </span>
        <m.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </m.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
              {answer}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Category Block ─────────────────────────────
function FaqCategory({
  category,
  searchQuery,
}: {
  category: FaqCategory;
  searchQuery: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = searchQuery.trim()
    ? category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : category.questions;

  if (filtered.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Category Header */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">{category.icon}</span>
        <h2 className="font-heading font-bold text-foreground text-xl">
          {category.label}
        </h2>
        <Badge variant="secondary" className="rounded-full text-xs ml-1">
          {filtered.length}
        </Badge>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-2">
        {filtered.map((faq, i) => (
          <FaqItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Content ───────────────────────────────
export function FaqPageContent() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const tabs = [
    { id: "all", label: "All", icon: "✦" },
    ...FAQ_CATEGORIES.map((c) => ({ id: c.id, label: c.label, icon: c.icon })),
  ];

  const visibleCategories =
    activeTab === "all"
      ? FAQ_CATEGORIES
      : FAQ_CATEGORIES.filter((c) => c.id === activeTab);

  const totalResults = visibleCategories.reduce((acc, cat) => {
    const filtered = search.trim()
      ? cat.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(search.toLowerCase()) ||
            q.answer.toLowerCase().includes(search.toLowerCase()),
        )
      : cat.questions;
    return acc + filtered.length;
  }, 0);

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-14 md:py-20 flex flex-col items-center text-center gap-6">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
            >
              ❓ Help Center
            </Badge>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
              Frequently Asked
              <span className="text-primary"> Questions</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Everything you need to know about booking taxis, tour packages and
              joining as a driver on Sarthigo.
            </p>
          </m.div>

          {/* Search */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative w-full max-w-lg"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="pl-11 h-12 rounded-xl border-border bg-background text-sm"
            />
            {search && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {totalResults} result{totalResults !== 1 ? "s" : ""}
              </span>
            )}
          </m.div>
        </div>
      </div>

      <div ref={ref} className="mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-16">
        {/* ── Category Tabs ── */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </m.div>

        {/* ── FAQ Categories ── */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-12"
        >
          {totalResults === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <span className="text-5xl">🔍</span>
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold text-foreground">
                  No results for &quot;{search}&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  Try different keywords or ask us directly on WhatsApp
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="rounded-xl gap-2 mt-2"
              >
                <a
                  href={whatsappBookingUrl(`Hi! I have a question: ${search}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-4 w-4 text-green-500" />
                  Ask on WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            visibleCategories.map((category) => (
              <FaqCategory
                key={category.id}
                category={category}
                searchQuery={search}
              />
            ))
          )}
        </m.div>

        {/* ── Still Have Questions CTA ── */}
        {totalResults > 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-heading font-bold text-foreground">
                  Still have a question?
                </p>
                <p className="text-sm text-muted-foreground">
                  We reply on WhatsApp within 5 minutes
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button
                asChild
                className="rounded-xl gap-2 font-semibold bg-green-500 hover:bg-green-600 text-white"
              >
                <a
                  href={whatsappBookingUrl(
                    "Hi! I have a question about Sarthigo.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Ask on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl gap-2">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </m.div>
        )}
      </div>
    </div>
  );
}
