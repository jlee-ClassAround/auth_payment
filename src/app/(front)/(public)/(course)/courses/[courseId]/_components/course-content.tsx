import { TiptapViewer } from "@/components/tiptap/tiptap-viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Chapter,
  DetailImage,
  Lesson,
  Teacher,
  SiteSetting,
} from "@prisma/client";
import Image from "next/image";

interface Props {
  description: string | null;
  detailImages: DetailImage[];
  chapters: (Chapter & {
    lessons: Lesson[];
  })[];
  teachers: Teacher[];
  siteSetting: SiteSetting | null;
}

export function CourseContent({
  description,
  detailImages,
  chapters,
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

      {chapters.length > 0 && (
        <div id="curriculum" className="py-10">
          <h2 className="text-xl lg:text-2xl font-semibold pb-5">커리큘럼</h2>
          {chapters.map((chapter) => (
            <Accordion type="multiple" key={chapter.id}>
              <AccordionItem value={chapter.id}>
                <AccordionTrigger className="bg-foreground/10 px-5 lg:text-xl font-semibold">
                  {chapter.title}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 pt-3 space-y-2">
                  <div className="font-medium text-foreground/70">
                    {chapter.description}
                  </div>
                  <ul className="pl-4 space-y-2">
                    {chapter.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="list-disc text-foreground/80 text-base lg:text-lg"
                      >
                        {lesson.title}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}

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
      <div id="refund-policy" className="py-10">
        <h2 className="text-xl lg:text-2xl font-semibold pb-5">환불정책</h2>
        <TiptapViewer
          content={siteSetting?.courseRefundPolicy || ""}
          className="text-foreground/50 leading-[1.75]"
        />
      </div>
    </>
  );
}
