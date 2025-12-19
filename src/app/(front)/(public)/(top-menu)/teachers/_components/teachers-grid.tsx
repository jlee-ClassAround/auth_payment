import { TeacherCard } from "@/components/loop-items/teacher-card";
import { Teacher } from "@prisma/client";
import Link from "next/link";

interface Props {
  teachers: Teacher[];
}

export function TeachersGrid({ teachers }: Props) {
  return (
    <>
      {teachers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-6 md:gap-y-12">
          {teachers.map((teacher) => (
            <Link href={`/teachers/${teacher.id}`} key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center border border-dashed border-foreground/20 rounded-xl">
          <p className="text-muted-foreground">강사가 없습니다.</p>
        </div>
      )}
    </>
  );
}
