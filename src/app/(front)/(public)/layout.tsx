import { MainFooter } from "@/components/global/layout/main-footer";
import { MainHeader } from "@/components/global/layout/main-header";

export default function FrontPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-20 bg-background">
        <MainHeader />
      </div>
      <div className="flex flex-col flex-grow">{children}</div>
      <div className="mt-auto z-10">
        <MainFooter />
      </div>
    </div>
  );
}
