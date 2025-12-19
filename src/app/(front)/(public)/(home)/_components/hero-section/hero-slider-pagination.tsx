import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Props {
  onPrev: () => void;
  onNext: () => void;
  currentSlide: number;
  progressRef: React.RefObject<HTMLDivElement | null>;
  slidesLength: number;
  isPaused: boolean;
  toggleAutoplay: () => void;
}

export function HeroSliderPagination({
  onPrev,
  onNext,
  currentSlide,
  progressRef,
  slidesLength,
  isPaused,
  toggleAutoplay,
}: Props) {
  return (
    <div className="absolute left-0 bottom-10 z-10 w-full">
      <div className="fit-container space-y-10 md:space-y-14">
        <div className="flex items-center gap-x-2 text-foreground/70 justify-start">
          {/* Prev Button */}
          <button
            onClick={onPrev}
            className="hover:text-primary transition-colors"
          >
            <ChevronLeft className="size-4 md:size-6" />
          </button>
          {/* Current Slide */}
          <div className="flex items-center gap-x-3 md:text-lg">
            <span className="font-semibold text-foreground">
              {String(currentSlide).padStart(2, "0")}
            </span>
            {/* Progress Bar */}
            <div className="relative w-40 h-[2px] bg-foreground/10 rounded overflow-hidden">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full bg-foreground/30"
                style={{ width: "0%" }}
              ></div>
            </div>
            <span className="">{String(slidesLength).padStart(2, "0")}</span>
          </div>
          {/* Next Button */}
          <button
            onClick={onNext}
            className="hover:text-primary transition-colors"
          >
            <ChevronRight className="size-4 md:size-6" />
          </button>
          {/* Play Toggle */}
          <button
            onClick={toggleAutoplay}
            className="hover:text-primary transition-colors"
          >
            {isPaused ? (
              <Play className="fill-current stroke-none size-4 md:size-6" />
            ) : (
              <Pause className="fill-current stroke-none size-4 md:size-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
