import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const publicRoutes = new Set([
  // 로그인 라우트
  "/",
  "/login",
  "/sign-up",
  "/find-email",
  "/find-pw",
  "/kakao/start",
  "/kakao/complete",

  // 상단 메뉴
  "/search",
  "/courses",
  "/teachers",
  "/about",
  "/ebooks",
  "/support",
  "/support/notices",
  "/support/faqs",

  // 약관
  "/terms-of-use",
  "/privacy-policy",
  "/refund-policy",
]);

const guestRoutes = new Set([
  // 로그아웃 유저 전용
  "/login",
  "/sign-up",
  "/find-email",
  "/find-pw",
  "/kakao/start",
  "/kakao/complete",
]);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;
  const session = await getSession();
  const isLoggedIn = Boolean(session.id);
  const isPublicRoute = publicRoutes.has(pathname);
  const isGuestRoute = guestRoutes.has(pathname);
  const isCoursePage = pathname.startsWith("/courses");
  const isEbookPage = pathname.startsWith("/ebooks");
  const isLessonPage = pathname.includes("/lessons");
  const isFreeCoursePage = pathname.startsWith("/free-courses");
  const isTeacherPage = pathname.startsWith("/teachers");

  if (!isLoggedIn && !isPublicRoute) {
    if (!isLessonPage && isCoursePage) {
      return NextResponse.next();
    }
    if (isFreeCoursePage || isEbookPage || isTeacherPage) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    if (isLessonPage) {
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isGuestRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.html$|.*\\.png$|.*\\.xml$|.*\\.ico$).*)",
  ],
};
