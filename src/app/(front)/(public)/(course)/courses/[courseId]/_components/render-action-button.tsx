import { Button } from "@/components/ui/button";
import { isEndDateOver } from "@/utils/date-utils";
import { Loader2 } from "lucide-react";

interface Props {
  isLoading: boolean;
  isUpcoming: boolean;
  isEnrollment: boolean;
  endDate: Date | null;
  firstLessonId: string | null;
  onWatchCourse: () => void;
  onPurchase: () => void;
}

export const renderActionButton = ({
  isLoading,
  isUpcoming,
  isEnrollment,
  endDate,
  firstLessonId,
  onWatchCourse,
  onPurchase,
}: Props) => {
  if (isEnrollment) {
    return (
      <Button
        className="font-semibold text-[16px] p-[14px] h-auto w-full"
        onClick={onWatchCourse}
        disabled={!firstLessonId}
      >
        {firstLessonId ? "강의보러가기" : "준비 중..."}
      </Button>
    );
  }

  return (
    <Button
      className="font-semibold text-[16px] p-[14px] h-auto w-full"
      disabled={
        isLoading || (isUpcoming && !!endDate && isEndDateOver(endDate))
      }
      onClick={onPurchase}
    >
      강의 구매하기
      {isLoading && <Loader2 className="size-4 animate-spin" />}
    </Button>
  );
};
