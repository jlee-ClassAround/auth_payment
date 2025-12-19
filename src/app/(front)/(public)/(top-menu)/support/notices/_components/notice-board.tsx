import { NoticeWithCategory } from "@/actions/notices/get-notices";
import Link from "next/link";

interface Props {
  notices: NoticeWithCategory[];
}

export function NoticeBoard({ notices }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-foreground/20">
          <th className="py-3 md:py-5 text-lg md:text-xl text-foreground/70 text-left font-normal">
            제목
          </th>
          <th className="py-3 md:py-5 w-[220px] shrink-0 text-lg md:text-xl text-foreground/70 text-center font-normal">
            작성일
          </th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice) => (
          <tr key={notice.id} className="border-b border-foreground/20">
            <td className="py-5 md:py-[30px] text-lg md:text-2xl font-semibold text-left ">
              <Link
                href={`/notices/${notice.id}`}
                className="hover:underline hover:text-primary transition-colors"
              >
                <h2 className="line-clamp-1">{notice.title}</h2>
              </Link>
            </td>
            <td className="py-5 md:py-[30px] text-lg md:text-[20px] text-center">
              {notice.createdAt.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
