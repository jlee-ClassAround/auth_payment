import { KakaoFloatingButton } from "@/components/global/kakao-floating-button";
import { ToastProvider } from "@/providers/toast-provider";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark bg-background text-foreground">
      {children}
      <ToastProvider />
    </div>
  );
}
