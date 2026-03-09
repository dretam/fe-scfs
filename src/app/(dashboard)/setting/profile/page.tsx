import SidebarAppHeader from "@/components/sidebar/app-header";
import { BreadcrumbNavItem } from "@/types/common";
import LayoutSetting from "@/components/layout/setting";
import HeadingSmall from "@/components/common/heading-small";
import { FormSettingProfile } from "@/features/user";

export default function SettingProfilePage() {
    const breadcrumbs: BreadcrumbNavItem[] = [
        {
            title: "Setting",
            href: "/setting",
        },
        {
            title: "Profile",
            href: "/setting/profile",
        },
    ]
    return (
        <>
            <SidebarAppHeader breadcrumbs={breadcrumbs} />
            <LayoutSetting>
                <HeadingSmall title="Profile information" description="Update your name and email address" />
                <FormSettingProfile />
            </LayoutSetting>
        </>
    )
}
