import {LucideIcon} from 'lucide-react';
import {StaticImageData} from "next/image";


export interface ThemeImage {
	src: string | StaticImageData,
	alt: string,
}

export interface CompanyLogoImage {
	href: string,
	light: ThemeImage,
	dark: ThemeImage,
}

export interface BreadcrumbNavItem {
	title: string;
	href: string;
}

export interface NavItem {
	title: string;
	href: string;
	icon?: LucideIcon | null;
	isActive?: boolean;
	target?: string;
}