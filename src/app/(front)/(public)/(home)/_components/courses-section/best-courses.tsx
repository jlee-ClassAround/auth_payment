import { getCachedAllCoursesWithFreeCourses } from "@/actions/courses/get-all-courses-with-free-courses";
import { CoursesSwiper } from "@/components/global/courses-swiper";
import { CTAButton } from "@/components/global/cta-button";
import { SectionHeader } from "@/components/global/section-header";

export async function BestCourses() {
  const { courses } = await getCachedAllCoursesWithFreeCourses({
    currentPage: 1,
    pageSize: 10,
    courseType: "PAID",
  });
  if (!courses.length) return null;

  return (
    <section className="py-10 md:py-20">
      <div className="space-y-4 md:space-y-8 md:fit-container">
        <div className="flex items-center justify-between px-5 md:px-0">
          <SectionHeader
            title="얼리버드 할인 중"
            description="마감임박! 곧 신청 마감될 강의"
          />
        </div>
        <div>
          <CoursesSwiper courses={courses} slidesPerView={2} />
        </div>
      </div>
    </section>
  );
}
