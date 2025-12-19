import { db } from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/teachers",
    "/ebooks",
    "/support",
    "/support/notices",
    "/support/faqs",
    "/privacy-policy",
    "/terms-of-use",
    "/refund-policy",
    "/login",
    "/search",
  ];

  const staticRoutesEntries: MetadataRoute.Sitemap = staticRoutes.map(
    (route) => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1 : 0.8,
    })
  );

  const courses = await db.course.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const coursesEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}`,
    lastModified: new Date(course.updatedAt),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const freeCourses = await db.freeCourse.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const freeCoursesEntries: MetadataRoute.Sitemap = freeCourses.map(
    (freeCourse) => ({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/free-courses/${freeCourse.id}`,
      lastModified: new Date(freeCourse.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  return [...staticRoutesEntries, ...coursesEntries, ...freeCoursesEntries];
}
