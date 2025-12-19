"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCheckScroll } from "@/hooks/use-check-scroll";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainLogo } from "../main-logo";
import { SearchInput } from "../search-input";

interface Props {
  firstNavs: {
    label: string;
    href: string;
    subMenus?: {
      label: string;
      href: string;
    }[];
  }[];
  isLoggedIn:
    | {
        userId: string;
      }
    | boolean;
  username: string | null;
  avatar: string | null;
}

export function HeaderRowSecond({
  firstNavs,
  isLoggedIn,
  username,
  avatar,
}: Props) {
  const pathname = usePathname();
  const isScrolled = useCheckScroll();

  return (
    <div
      className={cn(
        "py-5 border-b border-transparent transition-colors",
        isScrolled && "border-secondary"
      )}
    >
      <div className="fit-container flex items-center justify-between">
        <Link href="/">
          <MainLogo className="w-[120px] md:w-[172px]" theme="dark" />
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-x-10">
            {firstNavs.map((nav) => {
              const isActive = pathname.startsWith(nav.href);
              return (
                <li key={nav.href} className="relative group">
                  <Link
                    href={nav.href}
                    className={cn(
                      "text-nowrap text-foreground/80 hover:text-primary transition-colors",
                      isActive && "font-bold text-foreground"
                    )}
                  >
                    {nav.label}
                  </Link>
                  {nav.subMenus && (
                    <div className="absolute top-full left-0 bg-background invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-5 rounded-lg shadow-lg flex flex-col gap-y-3 border">
                      {nav.subMenus.map((subMenu) => (
                        <Link
                          key={subMenu.href}
                          href={subMenu.href}
                          className="text-nowrap text-foreground/80 hover:text-primary transition-colors font-medium"
                        >
                          {subMenu.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-x-10">
          <SearchInput className="hidden lg:block" />
          {!isLoggedIn ? (
            <Link
              href="/login"
              className={cn(
                "flex items-center gap-x-2 hover:text-primary transition-colors",
                pathname.startsWith("/login") && "text-primary"
              )}
            >
              <span>로그인</span>
            </Link>
          ) : (
            <Link
              href="/mypage"
              className={cn(
                "flex items-center gap-x-2",
                pathname.startsWith("/mypage") && "text-primary"
              )}
            >
              <div className="flex items-center gap-x-2">
                <Avatar className="size-8">
                  <AvatarImage src={avatar || undefined} />
                  <AvatarFallback>
                    {username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <span className="font-semibold">{username || "고객"}</span>
                  <span>님 강의실</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
