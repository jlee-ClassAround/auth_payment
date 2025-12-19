"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SupportHeader() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center gap-x-5 md:gap-x-8 border-t border-b border-foreground/10">
      <Link
        href="/support/faqs"
        className={cn(
          "py-5 md:py-7 text-lg border-b-[2px] border-foreground/0 transition",
          pathname.includes("/faqs") && "font-bold border-foreground"
        )}
      >
        자주묻는질문
      </Link>
      <Link
        href="/support/notices"
        className={cn(
          "py-5 md:py-7 text-lg border-b-[2px] border-foreground/0 transition",
          pathname.includes("/notices") && "font-bold border-foreground"
        )}
      >
        공지사항
      </Link>
    </div>
  );
}
