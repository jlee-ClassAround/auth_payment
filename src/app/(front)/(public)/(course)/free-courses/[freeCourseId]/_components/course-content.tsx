import { TiptapViewer } from "@/components/tiptap/tiptap-viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DetailImage, Teacher, SiteSetting } from "@prisma/client";
import Image from "next/image";

interface Props {
  description: string | null;
  detailImages: DetailImage[];
  teachers: Teacher[];
  siteSetting: SiteSetting | null;
}

export function CourseContent({
  description,
  detailImages,
  teachers,
  siteSetting,
}: Props) {
  return (
    <>
      <div id="course-info" className="py-10">
        <h2 className="text-xl lg:text-2xl font-semibold pb-5">강의 소개</h2>
        {!!description && <div className="pb-5">{description}</div>}
        <div className="relative">
          {detailImages.map((image, index) => (
            <Image
              key={image.id}
              width={860}
              height={860}
              src={image.imageUrl}
              alt={`Detail Image ${index + 1}`}
              className="w-full"
              loading="eager"
              quality={100}
              priority
            />
          ))}
        </div>
      </div>

      {teachers.length > 0 && (
        <div id="teacher" className="py-10">
          <h2 className="text-xl lg:text-2xl font-semibold pb-5">강사소개</h2>
          {teachers.map((teacher) => (
            <Accordion key={teacher.id} type="multiple">
              <AccordionItem value={teacher.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-x-3">
                    <Avatar>
                      <AvatarImage
                        src={teacher.profile || undefined}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {teacher.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="md:text-lg font-semibold">
                      {teacher.name}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <TiptapViewer content={teacher.info || ""} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
      <div id="marketing-consent" className="py-10">
        <h2 className="text-xl lg:text-2xl font-semibold pb-5">마케팅 동의</h2>
        <TiptapViewer
          content={siteSetting?.marketingPolicy || ""}
          className="text-foreground/50 leading-[1.75]"
        />
      </div>
    </>
  );
}
