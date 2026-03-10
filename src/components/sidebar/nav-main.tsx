"use client";

import {
  ChevronRight,
  DatabaseIcon,
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { useAppSelector } from "@/hooks/store/use-app-selector";
import { selectMenus } from "@/stores/entity/auth.store";
import { SessionMenuResponse } from "@/features/auth/types";

interface NavMainItem {
  title: string;
  url: string;
}

interface NavMainMenu {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive: boolean;
  items: NavMainItem[];
}

export function NavMain() {
  const menus = useAppSelector(selectMenus);

  const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return DatabaseIcon;
    const Icon = (LucideIcons as any)[iconName];
    return Icon || DatabaseIcon;
  };

  const buildDynamicItems = (menus: SessionMenuResponse[]): NavMainMenu[] => {
    const rootMenus = menus
      .filter((m) => m.parentId === null)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return rootMenus.map((root) => ({
      title: root.name,
      url: root.path || "#",
      icon: getIcon(root.icon),
      isActive: false,
      items: menus
        .filter((m) => m.parentId === root.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((child) => ({
          title: child.name,
          url: child.path,
        })),
    }));
  };

  const items = buildDynamicItems(menus);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items.length > 0;

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon />

                    <span>{item.title}</span>

                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}