import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/formats";

interface Props {
  displayDiscount: string | null;
  cancelPrice: string | null;
  displayPrice: string;
  isInstallment: boolean;
  originalPrice: number;
  discountedPrice: number | null;
}

type PriceInfo = {
  label: string;
  value: (originalPrice: number, discountedPrice: number) => string;
  className: string;
  isBold?: boolean;
};

const PRICE_INFO: PriceInfo[] = [
  {
    label: "판매금액",
    value: (originalPrice) => formatPrice(originalPrice || 0),
    className: "mb-2",
  },
  {
    label: "할인금액",
    value: (originalPrice, discountedPrice: number | null) =>
      discountedPrice
        ? formatPrice((originalPrice ?? 0) - (discountedPrice ?? 0))
        : "0",
    className: "mb-5",
  },
  {
    label: "총 결제금액",
    value: (originalPrice, discountedPrice: number | null) =>
      discountedPrice
        ? formatPrice(discountedPrice)
        : formatPrice(originalPrice ?? 0),
    className: "",
    isBold: true,
  },
];

export function PriceDisplay({
  displayDiscount,
  cancelPrice,
  displayPrice,
  isInstallment,
  originalPrice,
  discountedPrice,
}: Props) {
  return (
    <>
      <div className="space-y-1 w-full">
        <div className="flex items-center justify-between gap-x-4 flex-wrap">
          {displayDiscount && (
            <div className="text-[#E51715] font-semibold text-[22px]">
              {displayDiscount}
            </div>
          )}
          <div className="flex items-end gap-1 ml-auto">
            {cancelPrice && (
              <div className="text-foreground/50 line-through">
                {cancelPrice}
              </div>
            )}
            <div className={cn("text-[22px] font-bold")}>{displayPrice}원</div>
          </div>
        </div>
        {isInstallment && displayPrice !== "0" && (
          <div className="text-[#CBCBCB] font-medium text-right">
            12개월 할부 시
          </div>
        )}
      </div>

      <div className="w-full rounded-lg bg-foreground/5 p-4 leading-[1.5]">
        {PRICE_INFO.map(({ label, value, className, isBold }) => (
          <div
            key={label}
            className={cn("flex justify-between items-center", className)}
          >
            <span className="text-foreground/75 text-sm">{label}</span>
            <span className={cn(isBold && "font-bold")}>
              {value(originalPrice, discountedPrice ?? 0)}원
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
