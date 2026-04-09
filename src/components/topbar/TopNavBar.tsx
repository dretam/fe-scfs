'use client';

import { Button } from "@/components/ui/button";
import NavToggleEnd from "../sidebar/nav-toggle-end";
import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth";
import { useAppDispatch } from "@/hooks/store/use-app-dispatch";
import { useDialog } from "@/hooks/ui/use-dialog";
import { useAppSelector } from "@/hooks/store/use-app-selector";
import { resetAuth, selectUserFullName, selectUserRole } from "@/stores/entity/auth.store";
import { useRouter } from "next/navigation";

export function TopNavbar() {
  const dispatch = useAppDispatch();
  const dialog = useDialog();
  const router = useRouter();
  const fullName = useAppSelector(selectUserFullName);
  const role = useAppSelector(selectUserRole);
  
  const { execute: logout } = useLogout();

  async function handleLogout(): Promise<void> {
    const confirmed = await dialog.confirm({
      title: "Are you sure?",
      description: "This action cannot be undone. This will redirect you to login page.",
    });
    if (confirmed) {
      await logout();
      dispatch(resetAuth());
      router.push("/login");
    }
  }

  return (
    <div className="flex items-center justify-between mb-6">
      
      <div>
        <h1 className="text-xl font-semibold">
          SCF Dashboard - Bank
        </h1>
        <p className="text-sm text-muted-foreground">
          Selamat datang, {fullName} ({role})
        </p>
      </div>

      <div className="flex items-center gap-2">
        <NavToggleEnd />
        <Button variant="outline" onClick={handleLogout}
              className="cursor-pointer">
              <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
}