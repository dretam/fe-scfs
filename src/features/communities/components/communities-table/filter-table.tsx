"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input"
import { useDebounce } from "use-debounce";
import * as React from "react";
import { Search } from "lucide-react";

export function PageCommunitiesFilterTable({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterState, setFilterState] = React.useState(
    searchParams.get("filter") || ""
  )
  const [debouncedFilter] = useDebounce(filterState, 1000)

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedFilter) {
      params.set("filter", debouncedFilter)
    } else {
      params.delete("filter")
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [debouncedFilter])

  return (
    <div className={className} {...props}>
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search communities..."
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
