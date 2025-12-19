import { getCachedSingleTeacher } from "@/actions/teachers/get-single-teacher";
import { CoursesSwiper } from "@/components/global/courses-swiper";
import { TiptapViewer } from "@/components/tiptap/tiptap-viewer";
import { Separator } from "@/components/ui/separator";
import { User2Icon } from "lucide-react";
import Image from "next/image";

interface Props {
  params: Promise<{
    teacherId: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { teacherId } = await params;
  const teacher = await getCachedSingleTeacher(teacherId);
  return {
    title: `${teacher?.name}`,
  };
}

export default async function TeacherPage({ params }: Props) {
  const { teacherId } = await params;

  const teacher = await getCachedSingleTeacher(teacherId);

  const courses = [
    ...(teacher?.courses?.map((course) => ({
      ...course,
      courseType: "PAID" as const,
    })) || []),
    ...(teacher?.freeCourses?.map((course) => ({
      ...course,
      originalPrice: null,
      courseType: "FREE" as const,
    })) || []),
  ];

  return (
    <div className="fit-container py-10 md:pt-24 md:pb-36 space-y-10 md:space-y-16">
      <h1 className="text-3xl md:text-5xl lg:text-[56px] !leading-tight font-nexonWarhaven">
        {teacher?.name}
      </h1>
      <div className="flex gap-x-14 flex-col md:flex-row gap-y-10">
        <div className="relative aspect-[4/5] w-[300px] rounded-xl overflow-hidden">
          {teacher?.profile ? (
            <Image
              src={teacher?.profile}
              alt={teacher?.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-foreground/10 flex items-center justify-center">
              <User2Icon className="size-10 text-foreground/50" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-6 flex-1">
          <h2 className="text-2xl md:text-[28px] leading-tight font-semibold">
            {teacher?.name}
          </h2>
          <Separator className="bg-foreground/20" />
          <TiptapViewer
            content={teacher?.info || ""}
            className="text-foreground/80"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-6 w-full">
        <h2 className="text-2xl md:text-[28px] leading-tight font-semibold">
          강의 목록
        </h2>
        {courses.length > 0 ? (
          <CoursesSwiper courses={courses} />
        ) : (
          <p className="text-lg text-foreground/70 flex items-center justify-center h-[260px] bg-foreground/10 rounded-2xl">
            강의가 없습니다. 조금만 기다려주세요.
          </p>
        )}
      </div>
    </div>
  );
}
