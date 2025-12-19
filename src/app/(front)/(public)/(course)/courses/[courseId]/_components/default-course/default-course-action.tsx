"use client";

import { GetSingleCourse } from "@/actions/courses/get-single-course";
import { CountdownDisplay } from "@/components/global/countdown-display";
import { ProductBadge } from "@/components/global/product-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigateWithParams } from "@/hooks/use-navigate-with-params";
import { cn } from "@/lib/utils";
import { courseDisplayPrice } from "@/utils/course-display-price";
import { isEndDateOver } from "@/utils/date-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FloatingActionButton } from "../floating-action-button";
import { PriceDisplay } from "../price-display";
import { renderActionButton } from "../render-action-button";

interface DefaultCourseActionProps {
  course: GetSingleCourse;
  firstLessonId: string;
  isEnrollment: boolean;
  isLoggedIn: boolean;
  enrolledOptionId: string | null;
}

export function DefaultCourseAction({
  course,
  firstLessonId,
  isEnrollment,
  isLoggedIn,
  enrolledOptionId,
}: DefaultCourseActionProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const navigateWithParams = useNavigateWithParams();

  const {
    productType,
    options: courseOptions,
    originalPrice,
    discountedPrice,
    showInInstallment: isInstallment,
    isUpcoming,
    endDate,
    id: courseId,
    title,
    teachers,
    productBadge,
    maxPurchaseCount,
  } = course;

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  useEffect(() => {
    if (productType === "OPTION") {
      setSelectedOptionId(enrolledOptionId || courseOptions[0].id);
    }
  }, [productType, enrolledOptionId]);

  const selectedOption = courseOptions.find(
    (opt) => opt.id === selectedOptionId
  );
  const coursePrice = selectedOption
    ? {
        originalPrice: selectedOption.originalPrice,
        discountedPrice: selectedOption.discountedPrice,
      }
    : {
        originalPrice: originalPrice ?? 0,
        discountedPrice,
      };

  const { displayDiscount, displayPrice, cancelPrice } = courseDisplayPrice({
    originalPrice: coursePrice.originalPrice,
    discountedPrice: coursePrice.discountedPrice,
    isInstallment,
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

  const onWatchCourse = () => {
    setIsLoading(true);
    return router.push(`/courses/${courseId}/lessons/${firstLessonId}`);
  };

  const onPurchase = () => {
    setIsLoading(true);
    if (productType === "OPTION") {
      if (!selectedOptionId) return;
      if (
        selectedOption?.maxPurchaseCount &&
        selectedOption._count.enrollments >= selectedOption.maxPurchaseCount
      ) {
        toast.error("더 이상 구매할 수 없어요 ㅠㅠ");
        setIsLoading(false);
        return;
      }
      return navigateWithParams(
        `/checkout?courseId=${courseId}&optId=${selectedOptionId}`
      );
    }
    return navigateWithParams(`/checkout?courseId=${courseId}`);
  };

  const actionButton = () =>
    renderActionButton({
      isLoading,
      isUpcoming,
      isEnrollment,
      endDate,
      firstLessonId,
      onWatchCourse,
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
            <div className="text-foreground/50 font-medium">
              {teachers.map((teacher) => teacher.name).join(", ")}
            </div>
          </div>

          <Separator />

          {productType === "OPTION" && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">강의 옵션</h2>
              <div className="flex flex-col gap-2">
                {courseOptions.map((opt) => {
                  const isActive = opt.id === selectedOptionId;
                  const isEnrolled = opt.id === enrolledOptionId;
                  return (
                    <Button
                      key={opt.id}
                      variant="ghost"
                      size="lg"
                      type="button"
                      className={cn(
                        "border text-base p-4 h-14 flex justify-between gap-x-5 transition",
                        isActive && "ring-2 ring-foreground"
                      )}
                      disabled={isEnrollment}
                      onClick={() => setSelectedOptionId(opt.id)}
                    >
                      <div className="font-medium">{opt.name}</div>
                      <div className="flex flex-col gap-y-2">
                        {isEnrolled && (
                          <span className="text-xs text-foreground/50">
                            구매됨
                          </span>
                        )}
                        {opt.maxPurchaseCount && (
                          <span className="text-xs text-foreground/50">
                            {opt.maxPurchaseCount - opt._count.enrollments >
                            0 ? (
                              <span>
                                {Math.max(
                                  opt.maxPurchaseCount - opt._count.enrollments,
                                  0
                                )}
                                개 남았어요!
                              </span>
                            ) : (
                              <span>품절이에요 ㅠㅠ</span>
                            )}
                          </span>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col gap-5">
            {/* 가격 */}
            <PriceDisplay
              displayDiscount={displayDiscount}
              cancelPrice={cancelPrice}
              displayPrice={displayPrice}
              isInstallment={isInstallment}
              originalPrice={coursePrice.originalPrice}
              discountedPrice={coursePrice.discountedPrice}
            />

            {/* 카운트다운 */}
            {isUpcoming &&
              endDate &&
              (isEndDateOver(endDate) ? (
                <div className="text-center text-foreground/50 font-medium bg-foreground/10 p-3 rounded-md cursor-not-allowed">
                  신청이 마감되었습니다 😭
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CountdownDisplay endDate={endDate} />
                </div>
              ))}

            {/* 버튼 */}
            <div ref={buttonRef} className="flex flex-col gap-y-4">
              {actionButton()}
            </div>
          </div>
        </div>
        {/* <div className="p-5 rounded-lg border border-slate-200 text-sm text-gray-500">
          Messages...
        </div> */}
      </div>
      <FloatingActionButton
        showFloatingButton={showFloatingButton}
        actionButton={actionButton}
        cancelPrice={cancelPrice}
        displayDiscount={displayDiscount}
        displayPrice={displayPrice}
        isInstallment={isInstallment}
        isUpcoming={isUpcoming}
        endDate={endDate}
      />
    </>
  );
}
