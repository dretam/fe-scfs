"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import { BreadcrumbNavItem } from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";
import { PageDocumentDataTable } from "@/components/page/document/document-input";
import { Separator } from "@/components/ui/separator";

export default async function DocumentPage() {
  const breadcrumbs: BreadcrumbNavItem[] = [
    {
      title: "Documents",
      href: "/document",
    },
  ];

  return (
    <SidebarAppWrapper>
      <SidebarAppHeader breadcrumbs={breadcrumbs} />
      <HeadingSmall
        className="m-5"
        title="Document Management"
        description="Upload and manage documents with OCR processing."
      />
      
      <PageDocumentDataTable className="m-5" />
      
      <Separator className="my-6" />
{/*       
      <div className="m-5">
        <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
        <PageDocumentListTable />
      </div> */}
    </SidebarAppWrapper>
  );
}
