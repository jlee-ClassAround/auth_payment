"use client";

import { Ebook } from "@prisma/client";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";

interface Props {
  ebooks: Ebook[];
}

export function EbookFeature({ ebooks }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const router = useRouter();

  return (
    <div className="flex gap-x-8 md:gap-x-12 lg:gap-x-64 items-end w-full">
      <div className="w-[150px] md:w-[260px]">
        <Swiper
          className="ebook-swiper"
          modules={[Autoplay, EffectFade, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 4000,
          }}
          loop
          effect="fade"
          pagination={{
            clickable: true,
            renderBullet: () => "",
          }}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
          }}
        >
          {ebooks.map((ebook) => (
            <SwiperSlide key={ebook.id}>
              <div className="aspect-[2/3] relative w-full">
                <Image
                  fill
                  src={ebook.thumbnail || ""}
                  alt={"Ebook Thumbnail"}
                  className="object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        {ebooks.map((ebook, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={ebook.id}
              type="button"
              className={cn(
                "transition-all flex items-center gap-x-5 md:gap-x-10 lg:gap-x-20 py-4 md:py-7 border-b  border-foreground/20 text-foreground/50",
                isActive && "text-primary"
              )}
              onMouseEnter={() => {
                const swiperEl = document.querySelector(
                  ".ebook-swiper"
                ) as HTMLElement & { swiper: SwiperType };
                swiperEl?.swiper?.slideToLoop(index);
              }}
              onClick={() => router.push(`/ebooks/${ebook.id}`)}
            >
              <span className="md:text-xl lg:text-2xl">0{index + 1}.</span>
              <h3
                className={cn(
                  "md:text-xl lg:text-[28px] !leading-tight font-medium text-left truncate",
                  isActive && "font-semibold"
                )}
              >
                {ebook.title}
              </h3>
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 md:size-7 ml-auto shrink-0"
              >
                <path d="M14.192 15.788L12.848 14.472L18.392 8.872H0.0240001V6.996H18.364L12.848 1.452L14.192 0.136L21.976 7.92L14.192 15.788Z" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
