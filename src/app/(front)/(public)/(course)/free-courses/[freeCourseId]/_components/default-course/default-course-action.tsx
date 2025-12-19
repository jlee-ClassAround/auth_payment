"use client";

import { GetFreeCourse } from "@/actions/free-courses/get-free-course";
import { CountdownDisplay } from "@/components/global/countdown-display";
import { ProductBadge } from "@/components/global/product-badge";
import { Separator } from "@/components/ui/separator";
import { fbqTrack } from "@/meta-pixel/meta-pixel-event";
import { useApplyCourseDialog } from "@/store/use-apply-course-dialog";
import { isEndDateOver } from "@/utils/date-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FloatingActionButton } from "../floating-action-button";
import { PriceDisplay } from "../price-display";
import { renderActionButton } from "../render-action-button";

interface DefaultCourseActionProps {
  course: GetFreeCourse;
  isLoggedIn: boolean;
  isApplied: boolean;
}

export function DefaultCourseAction({
  course,
  isLoggedIn,
  isApplied,
}: DefaultCourseActionProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { onOpen } = useApplyCourseDialog();

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

  const onApplyCourse = async () => {
    try {
      setIsLoading(true);
      if (!isLoggedIn) {
        localStorage.setItem("applyCourse", course.id);

        router.push(`/login?redirect=/free-courses/${course.id}`);
        return;
      }
      if (isApplied) return;

      await axios.post(`/api/free-courses/${course.id}/apply`);
      router.refresh();
      // 신청 완료 팝업
      sendGTMEvent({
        event: "applyCourse",
      });

      // fbqTrack({
      //   eventName: "StartTrial",
      //   options: {
      //     value: 0.0,
      //     currency: "KRW",
      //   },
      // });

      onOpen();
      toast.success("신청이 완료되었습니다!");
    } catch {
      toast.error("신청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const actionButton = () =>
    renderActionButton({
      isLoading,
      isApplied,
      isUpcoming: course.isUpcoming,
      endDate: course.endDate,
      onApplyCourse,
    });

  useEffect(() => {
    const applyCourse = localStorage.getItem("applyCourse");
    if (applyCourse && applyCourse === course.id) {
      onApplyCourse();
      localStorage.removeItem("applyCourse");
    }
  }, [course.id, onApplyCourse]);

  return (
    <>
      <div className="flex flex-col gap-3 p-5 lg:p-0">
        <div className="flex flex-col gap-y-7">
          {/* Action Header */}
          <div className="flex flex-col gap-2">
            {course.productBadge.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {course.productBadge.map((badge) => (
                  <ProductBadge
                    key={badge.id}
                    label={badge.name}
                    backgroundColor={badge.color || "#000"}
                    textColor={badge.textColor || "#fff"}
                  />
                ))}
              </div>
            )}
            <h1 className="text-xl lg:text-2xl font-bold">{course.title}</h1>
            <div className="text-foreground/50 font-medium">
              {course.teachers.map((teacher) => teacher.name).join(", ")}
            </div>
          </div>

          <Separator />

          {/* Action Footer */}
          <div className="flex flex-col gap-5">
            {/* 가격 */}
            <PriceDisplay
              displayDiscount={"무료"}
              displayPrice={"0"}
              isInstallment={false}
              theme="light"
            />

            {/* 카운트다운 */}
            {course.isUpcoming &&
              course.endDate &&
              (isEndDateOver(course.endDate) ? (
                <div className="text-center text-foreground/50 font-medium bg-foreground/10 p-3 rounded-md cursor-not-allowed">
                  신청이 마감되었습니다 😭
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CountdownDisplay endDate={course.endDate} />
                </div>
              ))}

            {/* 버튼 */}
            <div ref={buttonRef} className="flex flex-col gap-y-4">
              {actionButton()}
            </div>
          </div>
        </div>
      </div>
      <FloatingActionButton
        showFloatingButton={showFloatingButton}
        actionButton={actionButton}
        displayDiscount={"무료"}
        displayPrice={"0"}
        isUpcoming={course.isUpcoming}
        endDate={course.endDate}
      />
    </>
  );
}
