"use client";

import { cn } from "@/lib/utils";
import { JSX } from "react";

interface Props {
  showFloatingButton: boolean;
  actionButton: () => JSX.Element;
  cancelPrice: string | null;
  displayDiscount: string | null;
  displayPrice: string;
  isInstallment: boolean;
}

export function FloatingActionButton({
  showFloatingButton,
  actionButton,
  cancelPrice,
  displayDiscount,
  displayPrice,
  isInstallment,
}: Props) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-3 z-20 opacity-0 transition duration-500 translate-y-6",
        showFloatingButton && "opacity-100 translate-y-0"
      )}
    >
      <div className="max-w-[900px] mx-auto w-full bg-[#121212] shadow-md md:p-[10px] md:pl-[30px] flex items-center justify-between rounded-xl md:border border-neutral-800">
        <div className="hidden md:flex items-end gap-x-5">
          {displayDiscount && (
            <span className="text-red-500 font-semibold text-lg">
              {displayDiscount}
            </span>
          )}
          <div className="flex items-end gap-x-2">
            {cancelPrice && (
              <span className="text-neutral-300 line-through text-sm">
                {cancelPrice}
              </span>
            )}
            <span className="text-white font-semibold text-lg leading-tight">
              {displayPrice}원
            </span>
            {isInstallment && (
              <span className="text-sm text-neutral-400">12개월 할부 시</span>
            )}
          </div>
        </div>
        <div className="w-full md:w-[300px]">{actionButton()}</div>
      </div>
    </div>
  );
}
