import { DetailImage, Ebook, ProductBadge, SiteSetting } from "@prisma/client";
import { EbookContent } from "../ebook-content";
import { EbookNavbar } from "../ebook-navbar";
import { DefaultEbookHeader } from "./default-ebook-header";
import { DefaultEbookAction } from "./default-ebook-action";
import Image from "next/image";

interface Props {
  ebook: Ebook & { detailImages: DetailImage[]; productBadge: ProductBadge[] };
  siteSetting: SiteSetting | null;
}

export function DefaultEbook({ ebook, siteSetting }: Props) {
  return (
    <div className="max-w-[1200px] mx-auto w-full h-full">
      <div className="flex flex-col-reverse lg:flex-row gap-x-10 lg:px-5">
        <div className="flex flex-col w-full px-5 lg:px-0">
          {ebook.thumbnail && (
            <div className="relative aspect-[2/3] hidden lg:block">
              <Image
                fill
                src={ebook.thumbnail}
                alt="전자책 대표이미지"
                className="object-cover md:rounded-xl md:border border-[#4E4E4E] shadow-sm"
              />
            </div>
          )}
          <div className="sticky top-[70px] md:top-[87px] z-10">
            <EbookNavbar />
          </div>
          <div>
            <EbookContent
              description={ebook.description}
              detailImages={ebook.detailImages}
              siteSetting={siteSetting}
            />
          </div>
        </div>
        <div className="w-full lg:w-[380px] flex flex-col shrink-0 lg:pb-5">
          <div className="md:sticky md:top-[150px]">
            <DefaultEbookAction
              originalPrice={ebook.originalPrice || 0}
              discountedPrice={ebook.discountedPrice}
              isInstallment={ebook.showInInstallment}
              ebookId={ebook.id}
              title={ebook.title}
              isUpcoming={ebook.isUpcoming}
              endDate={ebook.endDate}
              productBadge={ebook.productBadge}
            />
          </div>
        </div>
        <div className="lg:hidden">
          {ebook.thumbnail && (
            <div className="relative aspect-video">
              <DefaultEbookHeader image={ebook.thumbnail} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
