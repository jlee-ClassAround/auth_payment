"use client";

import { Teacher } from "@prisma/client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { TeacherCard } from "@/components/loop-items/teacher-card";
import { CoursesSwiperSkeleton } from "@/components/skeletons/courses-swiper-skeleton";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  teachers: Teacher[];
}

export function TeachersSwiper({ teachers }: Props) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return <CoursesSwiperSkeleton />;

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView="auto"
      spaceBetween={12}
      autoplay={{
        delay: 3000,
      }}
      loop
      lazyPreloadPrevNext={10}
      breakpoints={{
        768: {
          spaceBetween: 16,
        },
        1024: {
          spaceBetween: 20,
        },
      }}
      className="w-full !py-4 !pl-5"
      onSlideChange={(swiper) => {
        const slides = swiper.slides;
        slides.forEach((slide, index) => {
          if (index === swiper.activeIndex) {
            slide.style.transform = "scale(1.06)";
            slide.style.opacity = "1";
          } else {
            slide.style.transform = "scale(1)";
            slide.style.opacity = "0.5";
          }
        });
      }}
    >
      {teachers.map((teacher) => {
        return (
          <SwiperSlide
            key={teacher.id}
            className="group !w-[280px] md:!w-[320px] transition-transform"
          >
            <Link href={`/teachers/${teacher.id}`}>
              <TeacherCard teacher={teacher} />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
