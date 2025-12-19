import { cn } from "@/lib/utils";

interface Props {
  displayDiscount: string | null;
  cancelPrice?: string | null;
  displayPrice: string;
  isInstallment: boolean;
  theme?: "light" | "dark";
}

export function PriceDisplay({
  displayDiscount,
  cancelPrice,
  displayPrice,
  isInstallment,
  theme = "light",
}: Props) {
  return (
    <div className="space-y-1 w-full">
      <div className="flex items-center justify-between gap-x-4 flex-wrap">
        {displayDiscount && (
          <div className="text-[#E51715] font-semibold text-[22px]">
            {displayDiscount}
          </div>
        )}
        <div className="flex items-end gap-1 ml-auto">
          {cancelPrice && (
            <div className="text-foreground/50 line-through">{cancelPrice}</div>
          )}
          <div
            className={cn(
              "text-[22px] font-bold",
              theme === "dark" && "text-foreground"
            )}
          >
            {displayPrice}원
          </div>
        </div>
      </div>
      {isInstallment && displayPrice !== "0" && (
        <div className="text-[#CBCBCB] font-medium text-right">
          12개월 할부 시
        </div>
      )}
    </div>
  );
}
