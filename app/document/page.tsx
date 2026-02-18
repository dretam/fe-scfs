"use server";

import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import { BreadcrumbNavItem } from "@/types/common";
import HeadingSmall from "@/components/common/heading-small";
import { PageDocumentDataTable } from "@/components/page/document/document-input";

export default async function UserPage() {
  const breadcrumbs: BreadcrumbNavItem[] = [
    {
      title: "Documents",
      href: "/documents",
    },
  ];

  return (
    <SidebarAppWrapper>
      <SidebarAppHeader breadcrumbs={breadcrumbs} />
      <HeadingSmall
        className="m-5"
        title="Document list"
        description="list of documents"
      />
      <PageDocumentDataTable className="m-5" />
    </SidebarAppWrapper>
  );
}
