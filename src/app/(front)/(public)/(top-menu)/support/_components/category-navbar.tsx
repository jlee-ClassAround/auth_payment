"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryProps {
  id: string;
  name: string;
}

interface SubPageHeaderProps {
  categories: CategoryProps[];
}

export function CategoryNavbar({ categories }: SubPageHeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId");

  const onCategoryClick = (id: string) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { categoryId: id === categoryId ? "" : id },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url, { scroll: false });
  };

  return (
    <div className="truncate">
      <div className="flex items-center justify-center gap-x-1 md:gap-x-3 overflow-x-auto">
        <CategoryButton
          category={{ id: "", name: "전체" }}
          isActive={!categoryId}
          onCategoryClick={onCategoryClick}
        />
        {categories.map((category) => {
          const isActive = categoryId === category.id;
          return (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={isActive}
              onCategoryClick={onCategoryClick}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CategoryButtonProps {
  category: CategoryProps;
  isActive: boolean;
  onCategoryClick: (id: string) => void;
}

function CategoryButton({
  category,
  isActive,
  onCategoryClick,
}: CategoryButtonProps) {
  return (
    <button
      className={cn(
        "py-2 md:py-2.5 px-4 md:px-5 rounded-full transition-all ring-1 ring-foreground/20 ring-inset font-medium",
        "hover:ring-2 hover:ring-primary hover:text-primary",
        isActive && "ring-2 ring-primary text-primary"
      )}
      onClick={() => onCategoryClick(category.id)}
    >
      {category.name}
    </button>
  );
}
