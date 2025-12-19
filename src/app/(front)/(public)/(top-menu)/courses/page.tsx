import { getCachedCourses } from "@/actions/courses/get-courses";
import { PagePagination } from "@/components/global/sub-page/page-pagination";
import { SubPageHeader } from "@/components/global/sub-page/sub-page-header";
import { CoursesGrid } from "./_components/courses-grid";
import { getCachedCategories } from "@/actions/categories/get-categories";
import { Metadata } from "next";
import { getCachedFreeCourses } from "@/actions/free-courses/get-free-courses";
import {
  getAllCoursesWithFreeCourses,
  getCachedAllCoursesWithFreeCourses,
} from "@/actions/courses/get-all-courses-with-free-courses";

export const metadata: Metadata = {
  title: "클래스",
};

interface Props {
  searchParams: Promise<{
    categoryId?: string | undefined;
    courseType?: "FREE" | "PAID" | undefined;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: Props) {
  const { categoryId, courseType, page = "1" } = await searchParams;
  const pageSize = 9;

  const { courses, totalCount } = await getCachedAllCoursesWithFreeCourses({
    currentPage: Number(page),
    pageSize,
    categoryId,
    courseType,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  const categories = await getCachedCategories({ type: "COURSE" });

  return (
    <div className="fit-container py-10 md:pt-24 md:pb-36 space-y-8">
      <SubPageHeader
        title="클래스"
        description="모든 클래스를 살펴보세요"
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description || "",
        }))}
      />
      <CoursesGrid courses={courses} />
      <PagePagination totalPages={totalPages} className="pt-5 md:pt-10" />
    </div>
  );
}
