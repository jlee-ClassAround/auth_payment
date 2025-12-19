"use client";

import kakaoIcon from "@/../public/social/kakao-icon.svg";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onKakao = () => {
    setIsLoading(true);
    requestAnimationFrame(() => {
      router.push("/kakao/start");
    });
  };

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="space-y-2 md:space-y-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">로그인/회원가입</h1>
        <p className="text-foreground/50">
          1초 만에 가입하고 다양한 무료 혜택을 받으세요
        </p>
      </div>
      <KakaoButton isLoading={isLoading} onKakao={onKakao} />
    </div>
  );
}

function KakaoButton({
  isLoading,
  onKakao,
}: {
  isLoading: boolean;
  onKakao: () => void;
}) {
  return (
    <button
      onClick={onKakao}
      disabled={isLoading}
      className={cn(
        "px-8 py-4 w-full flex items-center justify-center rounded-lg bg-[#ffeb35] text-[#392020] gap-x-3 hover:opacity-80 transition",
        "disabled:bg-foreground/20 disabled:text-foreground/40 disabled:cursor-not-allowed"
      )}
    >
      <div className="relative aspect-square size-5">
        <Image
          fill
          src={kakaoIcon}
          alt="kakao icon"
          className={cn(isLoading && "opacity-50")}
        />
      </div>
      <span className="font-semibold">
        {isLoading ? "카카오톡 로그인 중..." : "카카오톡으로 3초만에 시작하기"}
      </span>
      {isLoading && <Loader2 className="size-5 stroke-[3px] animate-spin" />}
    </button>
  );
}
