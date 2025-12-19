import { getCachedAllCoursesWithFreeCourses } from "@/actions/courses/get-all-courses-with-free-courses";
import { CoursesSwiper } from "@/components/global/courses-swiper";
import { CTAButton } from "@/components/global/cta-button";
import { SectionHeader } from "@/components/global/section-header";

export async function FreeCourses() {
  const { courses: freeCourses } = await getCachedAllCoursesWithFreeCourses({
    currentPage: 1,
    pageSize: 10,
    courseType: "FREE",
  });
  if (!freeCourses.length) return null;

  return (
    <section className="py-10 md:py-20">
      <div className="space-y-4 md:space-y-8 md:fit-container">
        <div className="flex items-center justify-between px-5 md:px-0">
          <SectionHeader
            title="무료강의"
            description="0원으로 모집 중인 라이브 강의"
          />
        </div>
        <div>
          <CoursesSwiper courses={freeCourses} slidesPerView={3} />
        </div>
      </div>
    </section>
  );
}
