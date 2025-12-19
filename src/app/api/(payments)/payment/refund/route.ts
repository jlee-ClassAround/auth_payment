import { db } from "@/lib/db";
import { getIsAdmin } from "@/lib/is-admin";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// 시크릿 키 인코딩
const encryptedSecretKey =
  "Basic " + Buffer.from(process.env.TOSS_SECRET_KEY! + ":").toString("base64");

export async function POST(req: Request) {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { paymentId, cancelReason, cancelAmount, isKeepEnrollment } =
      await req.json();

    // 결제 정보 조회
    const payment = await db.tossCustomer.findUnique({
      where: { id: paymentId },
      select: {
        paymentKey: true,
        paymentStatus: true,
        finalPrice: true,
        refundableAmount: true,
      },
    });

    if (!payment) {
      return new NextResponse("Payment not found", { status: 404 });
    }

    if (payment.finalPrice === 0) {
      return new NextResponse("무료 결제는 환불이 불가능합니다.", {
        status: 400,
      });
    }

    if (
      payment.paymentStatus === "REFUNDED" &&
      payment.refundableAmount === 0
    ) {
      return new NextResponse("환불 가능 금액이 없습니다.", { status: 400 });
    }

    // 토스페이먼츠 환불 API 호출
    const response = await fetch(
      `https://api.tosspayments.com/v1/payments/${payment.paymentKey}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cancelReason: cancelReason || "구매자가 취소를 원함",
          cancelAmount: Number(cancelAmount) || null,
        }),
      }
    );

    const { cancels } = await response.json();
    const { refundableAmount }: { refundableAmount: number } =
      cancels[cancels.length - 1];
    // console.log("환불 정보", cancels);

    if (response.ok) {
      // DB 업데이트
      await db.$transaction(async (tx) => {
        const updatedPayment = await tx.tossCustomer.update({
          where: { id: paymentId },
          data: {
            paymentStatus:
              refundableAmount && refundableAmount > 0
                ? "PARTIAL_REFUNDED"
                : "REFUNDED",
            cancelAmount: payment.finalPrice - (refundableAmount ?? 0),
            cancelReason,
            refundableAmount,
            canceledAt: new Date(),
          },
        });

        if (
          !isKeepEnrollment &&
          updatedPayment.productType === "COURSE" &&
          updatedPayment.userId &&
          updatedPayment.courseId
        ) {
          const existingEnrollment = await db.enrollment.findUnique({
            where: {
              userId_courseId: {
                userId: updatedPayment.userId,
                courseId: updatedPayment.courseId,
              },
            },
          });

          if (existingEnrollment) {
            await tx.enrollment.delete({
              where: {
                userId_courseId: {
                  userId: updatedPayment.userId,
                  courseId: updatedPayment.courseId,
                },
              },
            });
          }
        }

        if (
          !isKeepEnrollment &&
          updatedPayment.productType === "EBOOK" &&
          updatedPayment.userId &&
          updatedPayment.ebookId
        ) {
          const existingEbookPurchase = await db.ebookPurchase.findUnique({
            where: {
              userId_ebookId: {
                userId: updatedPayment.userId,
                ebookId: updatedPayment.ebookId,
              },
            },
          });

          if (existingEbookPurchase) {
            await tx.ebookPurchase.delete({
              where: {
                userId_ebookId: {
                  userId: updatedPayment.userId,
                  ebookId: updatedPayment.ebookId,
                },
              },
            });
          }
        }

        revalidateTag(`course-${updatedPayment.courseId}`);
      });

      return NextResponse.json({ message: "환불 처리 완료" });
    }

    return new NextResponse("환불 처리 실패", { status: 500 });
  } catch (error) {
    console.error("[PAYMENT_REFUND_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
