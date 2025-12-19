import { CTAButton } from "@/components/global/cta-button";
import { SectionHeader } from "@/components/global/section-header";
import { FaqAccordion } from "./faq-accordion";
import { getCachedMainFaqs } from "@/actions/faqs/get-main-faqs";

export async function FaqSection() {
  const faqs = await getCachedMainFaqs();
  if (!faqs.length) return null;

  return (
    <section className="py-10 md:py-20">
      <div className="flex flex-col gap-y-10 fit-container max-w-4xl">
        <SectionHeader
          title="자주묻는질문"
          description="자주 묻는 질문에 답해드립니다. 여러분의 수익화를 위해
                함께하겠습니다"
          align="center"
        />
        <div className="flex-1">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
