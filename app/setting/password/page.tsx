import SidebarAppHeader from "@/components/sidebar/app-header";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import {BreadcrumbNavItem} from "@/types/common";
import LayoutSetting from "@/components/layout/setting";
import HeadingSmall from "@/components/common/heading-small";
import FormSettingPassword from "@/components/form/setting-password";

export default function SettingPasswordPage() {
	const breadcrumbs: BreadcrumbNavItem[] = [
		{
			title: "Setting",
			href: "/setting",
		},
		{
			title: "Password",
			href: "/setting/password",
		},
	]
	return (
		<SidebarAppWrapper>
			<SidebarAppHeader breadcrumbs={breadcrumbs}/>
			<LayoutSetting>
				<HeadingSmall title="Update password"
				              description="Ensure your account is using a long, random password to stay secure"/>
				<FormSettingPassword/>
			</LayoutSetting>
		</SidebarAppWrapper>
	)
}
