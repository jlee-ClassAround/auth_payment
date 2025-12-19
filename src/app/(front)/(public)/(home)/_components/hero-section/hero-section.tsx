import { HeroSliderFirst } from "./hero-slider-first";
import { getCachedHeroSlides } from "./queries";

export async function HeroSection() {
  const heroSlides = await getCachedHeroSlides();

  heroSlides.forEach((slide) => {
    if (slide.openDate) {
      slide.openDate = new Date(slide.openDate);
    }
  });

  return (
    <section>
      <div className="h-[280px] md:h-[480px]">
        <HeroSliderFirst slides={heroSlides} />
      </div>
    </section>
  );
}
