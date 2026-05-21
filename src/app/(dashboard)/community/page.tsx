"use server";

import HeadingSmall from "@/components/common/heading-small";
import { PageCommunitiesDataTable } from "@/features/communities";

export default async function UserPage() {
    return (
        <>
            <HeadingSmall className="m-5" title="Daftar Komunitas" description="Daftar Komunitas" />
            <PageCommunitiesDataTable className="m-5" />
        </>
    )
}
