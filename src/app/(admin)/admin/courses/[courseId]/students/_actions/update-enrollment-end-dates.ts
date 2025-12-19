"use server";

import { db } from "@/lib/db";

interface Props {
  courseId: string;
  endDate: Date;
}

export async function updateEnrollmentEndDates({ courseId, endDate }: Props) {
  try {
    const result = await db.enrollment.updateMany({
      where: {
        courseId,
      },
      data: {
        endDate,
        isActive: true,
      },
    });

    return { success: true, updatedCount: result.count };
  } catch (error) {
    console.error("[UPDATE_ENROLLMENT_END_DATES_ERROR]", error);
    return { success: false, error: "만료일자 수정 중 오류가 발생했습니다." };
  }
}
