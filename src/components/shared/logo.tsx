import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  showText?: boolean;
  href?: string;
  className?: string;
};

export function Logo({
  size = 36,
  showText = true,
  href = "/",
  className,
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={siteConfig.logoSingle}
        alt={siteConfig.name}
        width={size}
        height={size}
        className="rounded-xl object-contain shrink-0"
        priority
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-heading font-black text-foreground text-lg tracking-tight">
            {siteConfig.name}
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
