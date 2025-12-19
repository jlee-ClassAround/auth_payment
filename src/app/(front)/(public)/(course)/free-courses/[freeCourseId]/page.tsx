import { getAppliedFreeCourse } from "@/actions/free-courses/get-applied-free-course";
import { getCachedFreeCourse } from "@/actions/free-courses/get-free-course";
import { getSession } from "@/lib/session";
import { getCachedSiteSetting } from "@/queries/global/site-setting";
import { notFound } from "next/navigation";
import { ApplyCompleteDialog } from "./_components/apply-complete-dialog";
import { DefaultCourse } from "./_components/default-course/default-course";
import { CheckCookie } from "@/components/global/check-cookie";
import ViewContentTracker from "@/meta-pixel/view-content-tracker";

interface Props {
  params: Promise<{ freeCourseId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { freeCourseId } = await params;
  const course = await getCachedFreeCourse(freeCourseId);
  return {
    title: `${course?.title ?? "무료강의"}`,
    description: course?.description ?? "",
  };
}

export default async function FreeCourseIdPage({ params }: Props) {
  const { freeCourseId } = await params;
  const course = await getCachedFreeCourse(freeCourseId);
  if (!course) return notFound();
  if (course.endDate) {
    course.endDate = new Date(course.endDate);
  }

  const session = await getSession();
  const applyCourse = session?.id
    ? await getAppliedFreeCourse(session.id, course.id)
    : null;

  const siteSetting = await getCachedSiteSetting();

  return (
    <>
      <DefaultCourse
        course={course}
        isLoggedIn={!!session?.id}
        isApplied={!!applyCourse}
        siteSetting={siteSetting}
      />
      <ApplyCompleteDialog
        kakaoRoomLink={course.kakaoRoomLink ?? "링크가 없습니다."}
        kakaoRoomPassword={course.kakaoRoomPassword ?? "비밀번호가 없습니다."}
      />
      <ViewContentTracker contentId={course.id} contentName={course.title} />
      <CheckCookie />
    </>
  );
}
