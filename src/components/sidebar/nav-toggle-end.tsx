import * as React from "react";
import {cn} from "@/lib/utils"
import ToggleTheme from "@/components/toggle/theme";


export default function NavToggleEnd({className, ...props}: Readonly<{
	className?: string
}> & React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="Theme Navigation"
			className={cn("absolute top-0 right-0 z-50 flex flex-row-reverse justify-between p-4", className)}
			{...props}
		>
			<div>
				<div className="flex items-center space-x-1 sm:space-x-2 text-sm">
					<ToggleTheme/>
				</div>
			</div>
		</nav>
	)
}
