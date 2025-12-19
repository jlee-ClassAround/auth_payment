import { getCachedCategories } from "@/actions/categories/get-categories";
import { getCachedTeachers } from "@/actions/teachers/get-teachers";
import { PagePagination } from "@/components/global/sub-page/page-pagination";
import { SubPageHeader } from "@/components/global/sub-page/sub-page-header";
import { TeachersGrid } from "./_components/teachers-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "강사소개",
};

interface Props {
  searchParams: Promise<{
    categoryId?: string;
    page?: string;
  }>;
}

export default async function TeachersPage({ searchParams }: Props) {
  const { categoryId, page = "1" } = await searchParams;
  const pageSize = 12;

  const { teachers, totalCount } = await getCachedTeachers({
    categoryId,
    currentPage: Number(page),
    pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  const categories = await getCachedCategories({ type: "TEACHER" });

  return (
    <div className="fit-container py-10 md:pt-24 md:pb-36 space-y-8">
      <SubPageHeader
        title="강사소개"
        description="모든 강사를 살펴보세요"
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description || "",
        }))}
      />
      <TeachersGrid teachers={teachers} />
      <PagePagination totalPages={totalPages} className="pt-5 md:pt-10" />
    </div>
  );
}
