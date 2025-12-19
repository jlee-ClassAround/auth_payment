import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-background grid grid-cols-1 md:grid-cols-2 min-h-screen place-items-center">
      <Link href="/" className="absolute top-5 md:top-10 right-5 md:right-10">
        <XIcon className="size-6 text-foreground/80 hover:text-foreground transition-colors cursor-pointer" />
      </Link>
      <div className="relative hidden md:block size-full">
        <Image
          src="/login-bg.jpg"
          alt="auth background"
          fill
          className="object-cover"
        />
      </div>
      <div className="px-5 sm:max-w-[500px] w-full">{children}</div>
    </div>
  );
}
