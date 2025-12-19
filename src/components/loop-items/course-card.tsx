"use client";

import Image from "next/image";
import Link from "next/link";

import { ResultOfCourseWithFreeCourse } from "@/actions/courses/get-all-courses-with-free-courses";
import { ProductBadge } from "../global/product-badge";

interface Props {
  course: ResultOfCourseWithFreeCourse;
}

export function CourseCard({ course }: Props) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="flex flex-col gap-y-3 md:gap-y-5 md:hover:-translate-y-1 md:transition-transform md:pt-1">
        <div className="relative aspect-video bg-foreground/10 rounded-xl overflow-hidden">
          <Image
            fill
            src={course.thumbnail || ""}
            alt="Course Thumbnail"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          {course.productBadge && course.productBadge.length > 0 && (
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
          <h3 className="text-lg md:text-xl font-semibold line-clamp-2 mb-3 !leading-snug">
            {course.title}
          </h3>
          <div className="flex items-center gap-x-2">
            {course.teachers.length > 0 && (
              <>
                <span className="text-foreground/70 text-nowrap">
                  {course.teachers[0].name}
                </span>
                <div className="w-px h-3 bg-foreground/50 rounded-full" />
              </>
            )}
            {course.category && (
              <span className="text-foreground/70 text-nowrap">
                {course.category.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
