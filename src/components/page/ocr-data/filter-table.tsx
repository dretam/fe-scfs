'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input"
import {useDebounce} from "use-debounce";
import * as React from "react";

export default function PageOcrDataFilterTable({className, ...props}: React.ComponentProps<"div">) {
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
		router.push(`${pathname}?${params.toString()}`, {scroll: false})
	}, [debouncedFilter])

	return (
		<div className={className} {...props}>
			<Input
				placeholder="Filter..."
				value={filterState}
				onChange={(e) => setFilterState(e.target.value)}
				className="max-w-sm"
			/>
		</div>
	)
}
