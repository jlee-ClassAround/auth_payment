import { getCachedCategories } from "@/actions/categories/get-categories";
import { getCachedEbooks } from "@/actions/ebooks/get-ebooks";
import { PagePagination } from "@/components/global/sub-page/page-pagination";
import { SubPageHeader } from "@/components/global/sub-page/sub-page-header";
import { EbooksGrid } from "./_components/ebooks-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "전자책",
};

interface Props {
  searchParams: Promise<{
    categoryId?: string;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: Props) {
  const { categoryId, page = "1" } = await searchParams;
  const pageSize = 9;

  const { ebooks, totalCount } = await getCachedEbooks({
    categoryId,
    currentPage: Number(page),
    pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  const categories = await getCachedCategories({ type: "EBOOK" });

  return (
    <div className="fit-container py-10 md:pt-24 md:pb-36 space-y-8">
      <SubPageHeader
        title="전자책"
        description="모든 전자책을 살펴보세요"
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description || "",
        }))}
      />
      <EbooksGrid ebooks={ebooks} />
      <PagePagination totalPages={totalPages} className="pt-5 md:pt-10" />
    </div>
  );
}
