import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  icon?: boolean;
  badge?: string;
  size?: "sm" | "lg";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  align = "left",
  icon = false,
  badge,
  size = "lg",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-1",
        align === "center" && "items-center",
        align === "right" && "items-end",
        className
      )}
    >
      {badge && (
        <div className="text-primary md:text-lg font-semibold">{badge}</div>
      )}
      <div className="flex items-center gap-x-2">
        <h2
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-bold !leading-snug whitespace-pre-line break-keep",
            size === "sm" && "text-lg md:text-xl lg:text-2xl"
          )}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={cn(
            "md:text-lg text-foreground/50 whitespace-pre-line break-keep",
            align === "center" && "text-center",
            align === "right" && "text-right"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
