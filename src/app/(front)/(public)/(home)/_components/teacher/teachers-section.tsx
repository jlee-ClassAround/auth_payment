import { getCachedMainTeachers } from "@/actions/teachers/get-main-teachers";
import { SectionHeader } from "@/components/global/section-header";
import { TeachersSwiper } from "./teachers-swiper";

export async function TeachersSection() {
  const teachers = await getCachedMainTeachers();
  if (!teachers.length) return null;

  return (
    <section className="py-10 md:py-20 lg:py-24">
      <div className="fit-container">
        <div className="flex flex-col gap-y-5 md:gap-y-8 w-full">
          <SectionHeader
            align="center"
            title={`비교불가 강사진`}
            description={`최고의 강사들이 전하는 차원이 다른 수익화 이야기!`}
            className="space-y-2 md:space-y-3"
          />
          <TeachersSwiper teachers={teachers} />
        </div>
      </div>
    </section>
  );
}
