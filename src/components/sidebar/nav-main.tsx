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

export function NavMain() {
  const menus = useAppSelector(selectMenus);

  const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return DatabaseIcon;
    const Icon = (LucideIcons as any)[iconName];
    return Icon || DatabaseIcon;
  };

  const buildDynamicItems = (menus: SessionMenuResponse[]): SessionMenuResponse[] => {
    const rootMenus = menus
      .filter((m) => m.parentId === null)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return rootMenus.map((root) => ({
      ...root,
      icon: getIcon(root.icon),
      children: root.children
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((child) => ({
          ...child,
          icon: getIcon(child.icon),
        })),
    }));
  };

  const items = buildDynamicItems(menus);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  <Link href={item.path || "#"}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.id}
              asChild
              defaultOpen={false}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.name}>
                    <item.icon />
                    <span>{item.name}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.id}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.path || "#"}>
                            <subItem.icon className="mr-2 h-4 w-4" />
                            <span>{subItem.name}</span>
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