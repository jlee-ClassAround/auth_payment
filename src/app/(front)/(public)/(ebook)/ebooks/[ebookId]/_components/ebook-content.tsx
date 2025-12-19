import { TiptapViewer } from "@/components/tiptap/tiptap-viewer";
import { DetailImage, SiteSetting } from "@prisma/client";
import Image from "next/image";

interface Props {
  description: string | null;
  detailImages: DetailImage[];
  siteSetting: SiteSetting | null;
}

export function EbookContent({
  description,
  detailImages,
  siteSetting,
}: Props) {
  return (
    <>
      <div id="ebook-info" className="py-10">
        <h2 className="text-xl lg:text-2xl font-semibold pb-5">전자책 소개</h2>
        {!!description && <div>{description}</div>}
        <div className="relative">
          {detailImages.map((image) => (
            <Image
              key={image.id}
              width={720}
              height={720}
              src={image.imageUrl}
              alt="Detail Image"
              className="w-full"
            />
          ))}
        </div>
      </div>

      <div id="refund-policy" className="py-10">
        <h2 className="text-xl lg:text-2xl font-semibold pb-5">환불정책</h2>
        <div className="text-[15px] text-foreground/50 leading-7 whitespace-pre-line">
          <TiptapViewer
            content={siteSetting?.ebookRefundPolicy || ""}
            className="text-foreground/50 leading-[1.75]"
          />
        </div>
      </div>
    </>
  );
}
