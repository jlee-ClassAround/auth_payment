"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import { useRef, useState } from "react";
import { HeroSlider } from "@prisma/client";
import { HeroSliderPagination } from "./hero-slider-pagination";

import "swiper/css";
import "swiper/css/effect-fade";

interface Props {
  slides: HeroSlider[];
}

export function HeroSliderFirst({ slides }: Props) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const swiperRef = useRef<any>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const onPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const onNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPaused) {
        swiperRef.current.autoplay.start();
        setIsPaused(false);
      } else {
        swiperRef.current.autoplay.stop();
        setIsPaused(true);
      }
    }
  };

  return (
    <>
      {slides.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          slidesPerView={1}
          spaceBetween={-1}
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={600}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex + 1);
          }}
          onAutoplayTimeLeft={(swiper, time, progress) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${(1 - progress) * 100}%`;
            }
          }}
          onSlideChangeTransitionStart={() => {
            if (progressRef.current) {
              progressRef.current.style.width = "0%";
            }
          }}
          className="h-full relative"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {slide.link ? (
                <Link href={slide.link}>
                  <HeroSliderSlide slide={slide} />
                </Link>
              ) : (
                <HeroSliderSlide slide={slide} />
              )}
            </SwiperSlide>
          ))}
          <HeroSliderPagination
            onPrev={onPrev}
            onNext={onNext}
            currentSlide={currentSlide}
            progressRef={progressRef}
            slidesLength={slides.length}
            isPaused={isPaused}
            toggleAutoplay={toggleAutoplay}
          />
        </Swiper>
      ) : (
        <div className="w-full h-full bg-foreground/10 flex items-center justify-center">
          <p className="text-lg font-semibold text-foreground/50">
            준비중 입니다.
          </p>
        </div>
      )}
    </>
  );
}

function HeroSliderSlide({ slide }: { slide: HeroSlider }) {
  return (
    <div className="relative h-full">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background to-background/50 to-60% z-10 pointer-events-none" />
      <Image
        fill
        src={slide.image}
        alt="slide image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {slide.isShowTitle && (
        <div className="absolute w-full left-0 bottom-20 md:bottom-24 z-20">
          <div className="flex flex-col items-start gap-y-3 md:gap-y-5 fit-container">
            <div className="border border-foreground/20 rounded-full py-1 md:py-2 px-4 md:px-5 font-semibold text-sm text-foreground/75">
              {slide.badge || "무료강의"}
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-6xl leading-[1.3] font-bold whitespace-pre-line"
              style={{
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {slide.title}
            </h2>
            {/* <div className="flex items-center gap-x-4 md:text-xl text-foreground/50">
              <span>{slide.teacherName || "강사"}</span>
              <div className="w-[2px] h-4 bg-foreground/30 rounded-full" />
              <span>
                {slide.openDate
                  ? slide.openDate.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      weekday: "short",
                    })
                  : "오픈일 예정"}
              </span>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
