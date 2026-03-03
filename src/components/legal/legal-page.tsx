import Link from "next/link";
import { siteConfig } from "@/constants";
import type { LegalSection } from "@/constants/legal";

function LegalContent({ section }: { section: LegalSection }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-heading font-bold text-foreground">
        {section.title}
      </h2>
      {section.content.map((block, i) =>
        typeof block === "string" ? (
          <p key={i} className="text-muted-foreground text-sm leading-relaxed">
            {block}
          </p>
        ) : (
          <ul key={i} className="flex flex-col gap-2 pl-4">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  contact?: boolean;
};

export function LegalPage({
  title,
  description,
  lastUpdated,
  sections,
  contact = true,
}: LegalPageProps) {
  return (
    <div className="bg-background">
      {/* ── Header ── */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Last updated: {lastUpdated}
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-16">
        <div className="flex flex-col gap-10">
          {/* ── Sections ── */}
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-4">
              <LegalContent section={section} />
              {i < sections.length - 1 && (
                <div className="border-b border-border pt-2" />
              )}
            </div>
          ))}

          {/* ── Contact Block ── */}
          {contact && (
            <div className="rounded-2xl border border-border bg-muted/30 p-6 flex flex-col gap-3">
              <h3 className="font-heading font-bold text-foreground">
                Questions?
              </h3>
              <p className="text-sm text-muted-foreground">
                If you have any questions about this policy, reach out to us:
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-primary hover:underline w-fit"
                >
                  ✉️ {siteConfig.contact.email}
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline w-fit"
                >
                  💬 WhatsApp: {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
