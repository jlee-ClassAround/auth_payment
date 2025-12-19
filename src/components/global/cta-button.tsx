import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  label: string;
  link: string;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export function CTAButton({ label, link, className, target = "_self" }: Props) {
  return (
    <Link
      href={link}
      target={target}
      className={cn(
        "py-4 px-6",
        "rounded-xl bg-primary flex items-center gap-x-2 hover:opacity-80 transition-opacity",
        className
      )}
    >
      <span className="font-semibold text-background text-nowrap">{label}</span>
      <ChevronRight className={cn("size-4 stroke-[2px] text-black")} />
    </Link>
  );
}
