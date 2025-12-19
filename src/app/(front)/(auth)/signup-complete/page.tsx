"use client";

import { fbqTrack } from "@/meta-pixel/meta-pixel-event";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignupComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const userId = searchParams.get("userId");

  useEffect(() => {
    // fbqTrack({
    //   eventName: "CompleteRegistration",
    //   options: {
    //     user_id: userId,
    //   },
    // });

    router.push(redirectUrl || "/mypage");
  }, [userId, redirectUrl, router]);

  return (
    <div className="flex items-center justify-center bg-background size-full">
      <Loader2 className="animate-spin size-20 text-primary" />
    </div>
  );
}
