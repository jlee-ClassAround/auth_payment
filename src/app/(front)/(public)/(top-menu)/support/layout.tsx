import { SupportHeader } from "./_components/support-header";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SupportHeader />
      {children}
    </>
  );
}
