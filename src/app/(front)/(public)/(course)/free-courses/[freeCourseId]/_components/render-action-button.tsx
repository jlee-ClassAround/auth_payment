import { Button } from "@/components/ui/button";
import { isEndDateOver } from "@/utils/date-utils";
import { Loader2 } from "lucide-react";

interface Props {
  isLoading: boolean;
  isApplied: boolean;
  isUpcoming: boolean;
  endDate: Date | null;
  onApplyCourse: () => Promise<void>;
}

export const renderActionButton = ({
  isLoading,
  isApplied,
  isUpcoming,
  endDate,
  onApplyCourse,
}: Props) => {
  return (
    <Button
      id="apply-course-button"
      className="font-semibold text-[16px] p-[14px] h-auto w-full"
      disabled={
        isLoading ||
        isApplied ||
        (isUpcoming && !!endDate && isEndDateOver(endDate))
      }
      onClick={onApplyCourse}
    >
      {isApplied ? "신청완료" : "무료강의 신청하기"}
      {isLoading && <Loader2 className="size-4 animate-spin" />}
    </Button>
  );
};
