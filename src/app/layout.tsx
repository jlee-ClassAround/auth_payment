import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";

import { QueryProvider } from "@/providers/query-provider";

import { cn } from "@/lib/utils";
import { pretendard } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "아이비클래스",
    template: "%s - 아이비클래스",
  },
  description:
    "이커머스, 투자, 디자인, 부동산 등 실전 수익화 교육 플랫폼 - 당신의 부업과 재테크를 위한 모든 지식",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className="bg-neutral-800">
      <GoogleTagManager gtmId="GTM-M8N7RDHD" />
      <body
        className={cn(pretendard.className, "antialiased")}
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
