import { getCachedFeatureEbooks } from "@/actions/ebooks/get-feature-ebooks";
import { SectionHeader } from "@/components/global/section-header";
import { EbookFeature } from "./ebook-feature";

export async function EbookSection() {
  const ebooks = await getCachedFeatureEbooks();
  if (!ebooks.length) return null;

  return (
    <section className="py-10 md:py-20">
      <div className="space-y-4 md:space-y-8 md:fit-container">
        <div className="flex items-center justify-between">
          <SectionHeader
            title="전자책"
            description="요즘 가장 핫한! 차원이 다른 전자책"
          />
        </div>
        <div>
          <EbookFeature ebooks={ebooks} />
        </div>
      </div>
    </section>
  );
}
