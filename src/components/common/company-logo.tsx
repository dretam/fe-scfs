import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {CompanyLogoImage} from "@/types/common";


export default function CommonCompanyLogo({href = "/", width = 120, height = 0, ...props}: Readonly<{
	href: string;
	width?: number;
	height?: number;
}> & React.ComponentProps<"div">) {
	const companyLogo: CompanyLogoImage = {
		href: href,
		light: {
			src: "/img/company/bank_mega_color.png",
			alt: "Bank Mega Light Icon"
		},
		dark: {
			src: "/img/company/bank_mega_white.png",
			alt: "Bank Mega Dark Icon"
		},
	}
	return (
		<div {...props}>
			<Link href={companyLogo.href} rel="noopener noreferrer">
				<Image height={height} width={width} className="absolute scale-0 dark:scale-100"
				       src={companyLogo.dark.src} alt={companyLogo.dark.alt}/>
				<Image height={height} width={width} className="dark:scale-0" src={companyLogo.light.src}
				       alt={companyLogo.light.alt}/>
			</Link>
		</div>
	)
}
