import { getCachedSingleCourse } from "@/actions/courses/get-single-course";
import { getIsEnrollment } from "@/actions/enrollments/get-is-enrollment";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import { DefaultCourse } from "./_components/default-course/default-course";
import ViewContentTracker from "@/meta-pixel/view-content-tracker";
import { getCachedSiteSetting } from "@/queries/global/site-setting";
import { CheckCookie } from "@/components/global/check-cookie";

interface Props {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { courseId } = await params;
  const course = await getCachedSingleCourse(courseId);
  return {
    title: `${course?.title ?? "유료강의"}`,
    description: course?.description ?? "",
  };
}

export default async function CourseIdPage({ params }: Props) {
  const { courseId } = await params;
  const course = await getCachedSingleCourse(courseId);
  if (!course) return notFound();
  if (course.endDate) {
    course.endDate = new Date(course.endDate);
  }

  const session = await getSession();

  const isEnrollment = await getIsEnrollment(course.id, session.id);
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session?.id || "",
        courseId: course.id,
      },
    },
    select: {
      courseOptionId: true,
    },
  });

  const siteSetting = await getCachedSiteSetting();

  return (
    <>
      <DefaultCourse
        course={course}
        isLoggedIn={!!session?.id}
        isEnrollment={isEnrollment}
        enrolledOptionId={enrollment?.courseOptionId || null}
        siteSetting={siteSetting}
      />
      <ViewContentTracker contentId={course.id} contentName={course.title} />
      <CheckCookie />
    </>
  );
}
