"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import { BreadcrumbNavItem } from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";
import { PageOcrDataDataTable } from "@/features/ocr-data";

export default async function OcrDataPage() {
    const breadcrumbs: BreadcrumbNavItem[] = [
        {
            title: 'OCR Data',
            href: "/ocr-data",
        },
    ]

    return (
        <>
            <SidebarAppHeader breadcrumbs={breadcrumbs} />
            <HeadingSmall className="m-5" title="OCR Data list" description="list of OCR data extracted from documents" />
            <PageOcrDataDataTable className="m-5" />
        </>
    )
}
