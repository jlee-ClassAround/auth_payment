import { GetFreeCourse } from "@/actions/free-courses/get-free-course";
import Image from "next/image";
import { CourseContent } from "../course-content";
import { CourseNavbar } from "../course-navbar";
import { DefaultCourseAction } from "./default-course-action";
import { SiteSetting } from "@prisma/client";

interface Props {
  course: GetFreeCourse;
  isLoggedIn: boolean;
  isApplied: boolean;
  siteSetting: SiteSetting | null;
}

export async function DefaultCourse({
  course,
  isLoggedIn,
  isApplied,
  siteSetting,
}: Props) {
  return (
    <div className="max-w-[1200px] mx-auto w-full h-full">
      <div className="flex flex-col-reverse lg:flex-row gap-x-10 lg:px-5">
        <div className="flex flex-col w-full px-5 lg:px-0">
          {course.thumbnail && (
            <div className="relative aspect-video hidden lg:block">
              <Image
                fill
                src={course.thumbnail}
                alt="Course Thumbnail"
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <div className="sticky top-[72px] lg:top-[80px] z-10">
            <CourseNavbar />
          </div>

          <CourseContent
            description={course.description}
            detailImages={course.detailImages}
            teachers={course.teachers}
            siteSetting={siteSetting}
          />
        </div>
        <div className="w-full lg:w-[380px] flex flex-col shrink-0 lg:pb-5">
          <div className="md:sticky md:top-[150px]">
            <DefaultCourseAction
              course={course}
              isApplied={isApplied}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
        <div className="lg:hidden">
          {course.thumbnail && (
            <div className="relative aspect-video">
              <Image
                fill
                src={course.thumbnail}
                alt="Course Thumbnail"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
