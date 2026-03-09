"use client";

import {
  ChevronRight,
  Building2Icon,
  FileTextIcon,
  ShieldIcon,
  DatabaseIcon,
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useEffect } from "react";

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
import { useSession } from "@/features/auth/api/use-auth";
import { useAppDispatch } from "@/hooks/store/use-app-dispatch";
import { SessionMenuResponse } from "@/features/auth/types";
import { setUser, setAuthData } from "@/stores/entity/auth.store";

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
  const dispatch = useAppDispatch();

  const { data: sessionData } = useSession("role,menus,permissions");

  useEffect(() => {
    if (sessionData?.success && sessionData.data) {
      const { id, name, email, role } = sessionData.data;

      dispatch(setUser({ id, name, email, role }));

      dispatch(
        setAuthData({
          permissions: role.permissions || [],
          menus: role.menus || [],
        }),
      );
    }
  }, [sessionData]);

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || DatabaseIcon;
  };

  const staticItems: NavMainMenu[] = [
    {
      title: "Business Unit",
      url: "#",
      icon: Building2Icon,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/user",
        },
        {
          title: "Roles",
          url: "/role",
        },
      ],
    },
    {
      title: "Documents",
      url: "#",
      icon: FileTextIcon,
      isActive: true,
      items: [
        {
          title: "Documents",
          url: "/document",
        },
        {
          title: "OCR Data",
          url: "/ocr-data",
        },
      ],
    },
    {
      title: "System",
      url: "#",
      icon: ShieldIcon,
      isActive: true,
      items: [
        {
          title: "Access Logs",
          url: "/logs",
        },
      ],
    },
  ];

  const dynamicMenus: SessionMenuResponse[] = sessionData?.data?.role?.menus || [];

  const buildDynamicItems = (menus: SessionMenuResponse[]): NavMainMenu[] => {
    const rootMenus = menus.filter(m => m.parentId === null).sort((a, b) => a.sortOrder - b.sortOrder);

    return rootMenus.map(root => ({
      title: root.name,
      url: root.path || "#",
      icon: getIcon(root.icon),
      isActive: false,
      items: menus
        .filter(m => m.parentId === root.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(child => ({
          title: child.name,
          url: child.path,
        }))
    }));
  };

  const dynamicItems = buildDynamicItems(dynamicMenus);
  const items = [...staticItems, ...dynamicItems];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
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
                    {item.icon && <item.icon />}
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
