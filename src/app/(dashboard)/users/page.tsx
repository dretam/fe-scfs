"use server";

import HeadingSmall from "@/components/common/heading-small";
import { PageUserDataTable } from "@/features/user";

export default async function UserPage() {
    return (
        <>
            <HeadingSmall className="m-5" title="Daftar User" description="Daftar User" />
            <PageUserDataTable className="m-5" />
        </>
    )
}
