"use client";

import { FaqWithCategory } from "@/actions/faqs/get-faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  faqs: FaqWithCategory[];
}

export function FaqAccordion({ faqs }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={`${faq.id}`}
          className="border-foreground/20"
        >
          <CustomAccordionTrigger className="text-left text-xl md:text-2xl leading-normal py-5 md:py-7 data-[state=open]:text-primary">
            {faq.title}
          </CustomAccordionTrigger>
          <AccordionContent className="text-base md:text-lg font-light text-foreground/80 pb-5 md:pb-7 !leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: faq.content }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const CustomAccordionTrigger = ({ children, className, ...props }: any) => (
  <AccordionTrigger {...props} className={`group ${className}`}>
    {children}
    <div className="relative size-6 transition-transform duration-500 ease-in-out group-data-[state=open]:rotate-[180deg]">
      {/* 가로선 */}
      <div className="absolute top-1/2 left-0 w-6 h-[2px] bg-current transform -translate-y-1/2" />
      {/* 세로선 */}
      <div className="absolute top-0 left-1/2 w-[2px] h-6 bg-current transform -translate-x-1/2 transition-transform duration-500 group-data-[state=open]:rotate-90" />
    </div>
  </AccordionTrigger>
);
