"use client";

import { useEffect, useRef, useState } from "react";

import { CountdownDisplay } from "@/components/global/countdown-display";

import { ProductBadge } from "@/components/global/product-badge";
import { Separator } from "@/components/ui/separator";
import { useNavigateWithParams } from "@/hooks/use-navigate-with-params";
import { courseDisplayPrice } from "@/utils/course-display-price";
import { isEndDateOver } from "@/utils/date-utils";
import { ProductBadge as ProductBadgeType } from "@prisma/client";
import { FloatingActionButton } from "../floating-action-button";
import { PriceDisplay } from "../price-display";
import { renderEbookActionButton } from "../render-action-button";

interface Props {
  originalPrice: number;
  discountedPrice: number | null;
  isInstallment: boolean;
  productBadge: ProductBadgeType[];
  ebookId: string;
  title: string;
  isUpcoming: boolean;
  endDate: Date | null;
}

export function DefaultEbookAction({
  discountedPrice,
  isInstallment,
  originalPrice,
  ebookId,
  title,
  isUpcoming,
  endDate,
  productBadge,
}: Props) {
  const navigateWithParams = useNavigateWithParams();
  const [isLoading, setIsLoading] = useState(false);
  const { displayDiscount, displayPrice, cancelPrice } = courseDisplayPrice({
    discountedPrice,
    isInstallment,
    originalPrice,
  });

  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 버튼이 보이지 않을 때 floating 버튼 표시
        setShowFloatingButton(!entry.isIntersecting);
      },
      {
        threshold: 0, // 완전히 보이지 않을 때
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const onPurchase = () => {
    setIsLoading(true);
    return navigateWithParams(`/ebook-checkout?ebookId=${ebookId}`);
  };

  const actionButton = () =>
    renderEbookActionButton({
      isFree: originalPrice === 0 || discountedPrice === 0,
      isLoading,
      isUpcoming,
      endDate,
      onPurchase,
    });

  return (
    <>
      <div className="flex flex-col gap-3 p-5 lg:p-0">
        <div className="flex flex-col gap-y-7">
          {/* Action Header */}
          <div className="flex flex-col gap-2">
            {productBadge.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {productBadge.map((badge) => (
                  <ProductBadge
                    key={badge.id}
                    label={badge.name}
                    backgroundColor={badge.color || "#000"}
                    textColor={badge.textColor || "#fff"}
                  />
                ))}
              </div>
            )}
            <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
          </div>

          <Separator />

          {/* Action Footer */}
          <div className="flex flex-col gap-5">
            {/* 가격 */}
            <PriceDisplay
              displayDiscount={displayDiscount}
              cancelPrice={cancelPrice}
              displayPrice={displayPrice}
              isInstallment={isInstallment}
              theme="dark"
            />

            {/* 카운트다운 */}
            {isUpcoming && endDate && (
              <>
                {isEndDateOver(endDate) ? (
                  <div className="text-center text-foreground/50 font-medium bg-foreground/10 p-3 rounded-md cursor-not-allowed">
                    신청이 마감되었습니다 😭
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CountdownDisplay endDate={endDate} color="black" />
                  </div>
                )}
              </>
            )}

            {/* 버튼 */}
            <div ref={buttonRef} className="flex flex-col gap-y-4">
              {actionButton()}
            </div>
          </div>
        </div>
      </div>

      <FloatingActionButton
        actionButton={actionButton}
        showFloatingButton={showFloatingButton}
        cancelPrice={cancelPrice}
        displayDiscount={displayDiscount}
        displayPrice={displayPrice}
        isInstallment={isInstallment}
      />
    </>
  );
}
