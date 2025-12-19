import { getCachedCategories } from "@/actions/categories/get-categories";
import { CategoryNavbar } from "../_components/category-navbar";
import { getCachedFaqs } from "@/actions/faqs/get-faqs";
import { FaqAccordion } from "./_components/faq-accordian";
import { PagePagination } from "@/components/global/sub-page/page-pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주묻는 질문",
};

interface Props {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}

export default async function Faqs({ searchParams }: Props) {
  const { categoryId, page = "1" } = await searchParams;
  const pageSize = 10;

  const { faqs, totalCount } = await getCachedFaqs({
    categoryId,
    currentPage: Number(page),
    pageSize,
  });
  const totalPages = Math.ceil(totalCount / pageSize);

  const categories = await getCachedCategories({ type: "FAQ" });

  return (
    <div className="fit-container max-w-[960px] py-14 md:pt-[100px] md:pb-[140px] space-y-10 md:space-y-[72px]">
      <div className="space-y-3 md:space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold !leading-tight text-center">
          자주묻는 질문
        </h1>
        <CategoryNavbar categories={categories} />
      </div>
      <FaqAccordion faqs={faqs} />

      <PagePagination totalPages={totalPages} className="pt-5 md:pt-10" />
    </div>
  );
}
