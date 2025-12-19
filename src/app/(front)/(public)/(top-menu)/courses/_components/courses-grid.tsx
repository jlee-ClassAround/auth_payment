import { ResultOfCourseWithFreeCourse } from "@/actions/courses/get-all-courses-with-free-courses";
import { IGetBestCourses } from "@/actions/courses/get-best-courses";
import { IFreeCourse } from "@/actions/free-courses/get-free-courses";
import { CourseCard } from "@/components/loop-items/course-card";
import { FreeCourseCard } from "@/components/loop-items/free-course-card";

function isDefaultCourse(
  course: IGetBestCourses | IFreeCourse
): course is IGetBestCourses {
  return "originalPrice" in course;
}

interface Props {
  courses: ResultOfCourseWithFreeCourse[];
}

export function CoursesGrid({ courses }: Props) {
  return (
    <>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-7 gap-y-6 md:gap-y-12">
          {courses.map((course) =>
            course.courseType === "PAID" ? (
              <CourseCard key={course.id} course={course} />
            ) : (
              <FreeCourseCard key={course.id} course={course} />
            )
          )}
        </div>
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center border border-dashed border-foreground/20 rounded-xl md:rounded-2xl lg:rounded-[20px]">
          <p className="text-muted-foreground">클래스가 없습니다.</p>
        </div>
      )}
    </>
  );
}
