import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import {BreadcrumbNavItem} from "@/types/common";
import LayoutSetting from "@/components/layout/setting";
import HeadingSmall from "@/components/common/heading-small";
import ToggleAppearance from "@/components/toggle/appearance";

export default function SettingAppearancePage() {
	const breadcrumbs: BreadcrumbNavItem[] = [
		{
			title: "Setting",
			href: "/setting",
		},
		{
			title: "Appearance",
			href: "/setting/appearance",
		},
	]
	return (
		<SidebarAppWrapper>
			<SidebarAppHeader breadcrumbs={breadcrumbs}/>
			<LayoutSetting>
				<div className="space-y-6">
					<HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
					<ToggleAppearance />
				</div>
			</LayoutSetting>
		</SidebarAppWrapper>
	)
}
