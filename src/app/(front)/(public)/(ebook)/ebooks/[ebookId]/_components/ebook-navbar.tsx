"use client";

import { ebookNavbarAnchors } from "@/constants/ebook-navbar-anchors";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function EbookNavbar() {
  const [activeAnchor, setActiveAnchor] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const sections = ebookNavbarAnchors.map((item) =>
        document.querySelector(item.anchor)
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveAnchor(entry.target.id);
            }
          });

          if (!entries.find((entry) => entry.isIntersecting)) {
            setActiveAnchor("");
          }
        },
        {
          threshold: 0,
          rootMargin: "-50% 0px -50% 0px",
        }
      );

      sections.forEach((section) => {
        if (section) observer.observe(section);
      });

      return () => {
        sections.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      };
    };

    handleScroll();
  }, []);

  const handleLinkClick = (anchor: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const section = document.querySelector(anchor);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2;
      window.scrollTo({
        top: sectionTop - offset,
      });
    }
  };

  return (
    <div className="py-1 flex items-center bg-background">
      {ebookNavbarAnchors.map((item) => (
        <a
          key={item.anchor}
          className="flex-1"
          href={item.anchor}
          onClick={handleLinkClick(item.anchor)}
        >
          <div
            className={cn(
              "text-gray-500 text-sm lg:text-base p-2 lg:p-3 flex items-center justify-center hover:text-primary hover:font-semibold shadow-[inset_0px_-1px_0px_#333] hover:shadow-[inset_0px_-2px_0px_hsl(var(--primary))] transition text-nowrap",
              activeAnchor === item.anchor.substring(1) &&
                "text-primary font-semibold shadow-[inset_0px_-2px_0px_hsl(var(--primary))]"
            )}
          >
            {item.label}
          </div>
        </a>
      ))}
    </div>
  );
}
