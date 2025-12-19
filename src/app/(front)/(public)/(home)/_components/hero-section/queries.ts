import { db } from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";

export async function getHeroSlides() {
  const heroSlides = await db.heroSlider.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      position: "asc",
    },
  });
  return heroSlides;
}

export async function getCachedHeroSlides() {
  const cache = nextCache(getHeroSlides, ["hero-slides"], {
    tags: ["hero-slides"],
  });

  return cache();
}
