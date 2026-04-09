'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/store/use-app-selector";
import { selectMenus } from "@/stores/entity/auth.store";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ReactNode } from "react";

export function TabsNav({
  children,
}: {
  children: ReactNode;
}) {
  const menus = useAppSelector(selectMenus);

  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname;

  const sortedMenus = React.useMemo(() => {
    return menus?.slice().sort((a, b) => a.sortOrder - b.sortOrder);
  }, [menus]);

  return (
    <>
      <Tabs value={currentTab} onValueChange={(val) => {
          const url = val;
          router.push(url);
        }
      } defaultValue="/" className="mb-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          {sortedMenus?.map((menu) => (
            <TabsTrigger key={menu.code} value={menu.path}>
              {menu.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="bg-background rounded-xl shadow-sm p-4 border">{children}</div>
    </>
  );

}