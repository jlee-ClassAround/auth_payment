import { Button } from "@/components/ui/button";
import { isEndDateOver } from "@/utils/date-utils";
import { Loader2 } from "lucide-react";

interface Props {
  isFree: boolean;
  isLoading: boolean;
  isUpcoming: boolean;
  endDate: Date | null;
  onPurchase: () => void;
}

export const renderEbookActionButton = ({
  isFree,
  isLoading,
  isUpcoming,
  endDate,
  onPurchase,
}: Props) => {
  return (
    <Button
      disabled={
        isLoading || (isUpcoming && !!endDate && isEndDateOver(endDate))
      }
      className="font-semibold text-base p-4 h-auto w-full"
      onClick={onPurchase}
    >
      {isFree ? "지금 바로 다운받기" : "전자책 구매하기"}
      {isLoading && <Loader2 className="size-4 animate-spin" />}
    </Button>
  );
};
