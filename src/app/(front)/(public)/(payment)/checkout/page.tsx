import { getUserCoupons } from "@/actions/coupons/get-user-coupons";
import { getSingleCourse } from "@/actions/courses/get-single-course";
import { getIsEnrollment } from "@/actions/enrollments/get-is-enrollment";
import { getUser } from "@/actions/users/get-user";
import { getSession } from "@/lib/session";
import StartCheckoutTracker from "@/meta-pixel/start-checkout-tracker";
import { calculatePrice } from "@/utils/course-price-by-type";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { TossPaymentsWidget } from "./_components/toss-payments-widget";

export const metadata: Metadata = {
  title: "결제하기",
};

export default async function CheckOut({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { courseId } = await searchParams;
  if (!courseId) return notFound();

  const { optId } = await searchParams;

  const session = await getSession();
  const user = await getUser(session.id);
  if (!user) return notFound();

  const course = await getSingleCourse(courseId);
  if (!course) return notFound();

  if (course.productType === "OPTION" && !optId) return notFound();
  const selectedOption = course.options.find((opt) => opt.id === optId);

  const { originalPrice, discountedPrice } = calculatePrice({
    productType: course.productType,
    originalPrice: course.originalPrice,
    discountedPrice: course.discountedPrice,
    selectedOption,
  });
  const productPrice = discountedPrice ?? originalPrice ?? 0;
  const productTitle =
    course.title + (selectedOption ? ` - ${selectedOption?.name}` : "");

  let isTaxFree = course.isTaxFree;
  if (selectedOption) {
    isTaxFree = selectedOption.isTaxFree;
  }

  const isEnrollment = await getIsEnrollment(course.id, user.id);
  if (isEnrollment) return redirect("/mypage");

  const userCoupons = await getUserCoupons(user.id, course.id);

  return (
    <div className="fit-container">
      <StartCheckoutTracker
        contentId={courseId}
        contentType="course"
        value={productPrice}
      />
      <TossPaymentsWidget
        userId={user.id}
        userName={user.username}
        userEmail={user.email}
        userPhone={user.phone}
        courseId={courseId}
        coursePrice={productPrice}
        courseTitle={productTitle}
        isTaxFree={isTaxFree}
        category={course.category}
        coupons={userCoupons}
        teachers={course.teachers}
        courseThumbnail={course.thumbnail!}
        optionId={optId}
      />
    </div>
  );
}
