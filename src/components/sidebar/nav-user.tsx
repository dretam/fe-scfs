"use client";

import { Bell, ChevronsUpDown, LogOut, Cog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/store/use-app-selector";
import {
  selectUserEmail,
  selectUserInitial,
  selectUserName,
} from "@/stores/entity/auth.store";
import { useDialog } from "@/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { resetAuth } from "@/stores/entity/auth.store";
import { logoutAction } from "@/features/auth/api/auth";
import { useAppDispatch } from "@/hooks/store/use-app-dispatch";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();
  const dialog = useDialog();
  const router = useRouter();
  const userName = useAppSelector(selectUserName);
  const userInitial = useAppSelector(selectUserInitial);
  const userEmail = useAppSelector(selectUserEmail);

  async function handleLogout(): Promise<void> {
    const confirmed = await dialog.confirm({
      title: "Are you sure?",
      description: "This action cannot be undone. This will redirect you to login page.",
    });
    if (confirmed) {
      await logoutAction();
      dispatch(resetAuth());
      router.push("/login");
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {userName ?? "Guest"}
                </span>
                <span className="truncate text-xs">{userEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={undefined} alt={userName ?? "Guest"} />
                  <AvatarFallback className="rounded-lg">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userName ?? "Guest"}
                  </span>
                  <span className="truncate text-xs">{userEmail}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/setting"}>
                  <Cog />
                  Setting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
