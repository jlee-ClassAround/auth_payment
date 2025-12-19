"use client";

import { TiptapViewer } from "@/components/tiptap/tiptap-viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq } from "@prisma/client";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
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
          value={faq.id + ""}
          className="border-foreground/20"
        >
          <CustomAccordionTrigger className="text-left text-xl font-semibold leading-normal py-5 md:py-7 data-[state=open]:text-primary">
            {faq.title}
          </CustomAccordionTrigger>
          <AccordionContent className="text-base md:text-lg leading-relaxed text-foreground/75 pb-5 md:pb-7">
            <TiptapViewer content={faq.content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const CustomAccordionTrigger = ({ children, className, ...props }: any) => (
  <AccordionTrigger {...props} className={`group ${className}`}>
    {children}
    <div className="relative size-5 transition-transform duration-500 ease-in-out group-data-[state=open]:rotate-[180deg]">
      {/* 가로선 */}
      <div className="absolute top-1/2 left-0 w-5 h-[2px] bg-current transform -translate-y-1/2" />
      {/* 세로선 */}
      <div className="absolute top-0 left-1/2 w-[2px] h-5 bg-current transform -translate-x-1/2 transition-transform duration-500 group-data-[state=open]:rotate-90" />
    </div>
  </AccordionTrigger>
);
