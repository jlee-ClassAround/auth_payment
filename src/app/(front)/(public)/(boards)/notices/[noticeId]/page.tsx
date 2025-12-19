import { increaseView } from "@/actions/increase-view";
import { getCachedSingleNotice } from "@/actions/notices/get-single-notice";
import { TiptapViewer } from "@/components/tiptap/tiptap-viewer";
import { Button } from "@/components/ui/button";
import { dateFormat } from "@/utils/formats";
import { Eye, User2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ noticeId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { noticeId } = await params;
  const notice = await getCachedSingleNotice(Number(noticeId));
  return {
    title: notice?.title ?? "공지사항",
    description: notice?.content ?? "",
  };
}

export default async function NoticeIdPage({ params }: Props) {
  const { noticeId } = await params;

  const notice = await getCachedSingleNotice(Number(noticeId));
  if (!notice) return notFound();
  if (notice.createdAt) {
    notice.createdAt = new Date(notice.createdAt);
  }

  await increaseView(noticeId, "notice");

  return (
    <div className="fit-container max-w-[960px] py-14 md:pt-[100px] md:pb-[140px] space-y-10 md:space-y-[72px]">
      <div className="space-y-3 md:space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-[56px] font-nexonWarhaven !leading-tight text-center">
          {notice.title}
        </h1>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <div className="bg-foreground/10 rounded-full p-2">
              <User2 className="size-5 md:size-7 text-primary" />
            </div>
            <div>
              <p className="font-medium md:text-lg">관리자</p>
              <p className="text-foreground/70 text-sm md:text-base">
                {dateFormat(notice.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base text-foreground/70">
            <Eye className="size-4 md:size-5" />
            <span>{notice.view}</span>
          </div>
        </div>
        <TiptapViewer
          content={notice.content}
          className="border-t border-b py-6 min-h-[300px] border-foreground/20"
        />
        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="lg"
            className="md:text-lg md:h-12"
            asChild
          >
            <Link href="/support/notices">목록으로</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
