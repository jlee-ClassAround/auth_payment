import { BestCourses } from "./_components/courses-section/best-courses";
import { FreeCourses } from "./_components/courses-section/free-courses";
import { EbookSection } from "./_components/ebook/ebook-section";
import { FaqSection } from "./_components/faq/faq-section";
import { HeroSection } from "./_components/hero-section/hero-section";
import { TeachersSection } from "./_components/teacher/teachers-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BestCourses />
      <FreeCourses />
      <EbookSection />
      <FaqSection />
      <TeachersSection />
    </main>
  );
}
