import * as React from "react";
import {cn} from "@/lib/utils"
import ToggleTheme from "@/components/toggle/theme";


export default function NavToggleEnd({className, ...props}: Readonly<{
	className?: string
}> & React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="Theme Navigation"
			className={cn("flex items-center", className)}
			{...props}
		>
			<ToggleTheme/>
		</nav>
	)
}
