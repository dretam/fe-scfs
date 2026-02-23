"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import {BreadcrumbNavItem} from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";

export default async function OcrDataPage() {
	const breadcrumbs: BreadcrumbNavItem[] = [
		{
			title: 'OCR Data',
			href: "/ocr-data",
		},
	]

	return (
		<SidebarAppWrapper>
			<SidebarAppHeader breadcrumbs={breadcrumbs}/>
			<HeadingSmall className="m-5" title="OCR Data list" description="list of OCR data extracted from documents"/>
			<div className="m-5">
				<p className="text-muted-foreground">OCR Data management page - coming soon</p>
			</div>
		</SidebarAppWrapper>
	)
}
