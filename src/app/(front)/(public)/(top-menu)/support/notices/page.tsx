import { getCachedNotices } from "@/actions/notices/get-notices";
import { PagePagination } from "@/components/global/sub-page/page-pagination";
import { NoticeBoard } from "./_components/notice-board";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
};

interface Props {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}

export default async function Notices({ searchParams }: Props) {
  const { categoryId, page = "1" } = await searchParams;
  const pageSize = 10;

  const { notices, totalCount } = await getCachedNotices({
    categoryId,
    currentPage: Number(page),
    pageSize,
  });
  const totalPages = Math.ceil(totalCount / pageSize);

  notices.forEach((notice) => {
    notice.createdAt = new Date(notice.createdAt);
  });

  return (
    <div className="fit-container max-w-[960px] py-14 md:pt-[100px] md:pb-[140px] space-y-10 md:space-y-[72px]">
      <div className="space-y-3 md:space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold !leading-tight text-center">
          공지사항
        </h1>
      </div>
      <NoticeBoard notices={notices} />

      <PagePagination totalPages={totalPages} className="pt-5 md:pt-10" />
    </div>
  );
}
