"use client";

import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { RoleFormValues } from "../../schemas";
import { MenuResponse } from "@/features/menu";

interface Props {
  menus: MenuResponse[];
  form: UseFormReturn<RoleFormValues>;
}

export function PermissionSelector({ menus, form }: Props) {
  const selectedPermissionIds = form.watch("permissionIds") ?? [];

  function togglePermission(permissionId: number) {
    if (selectedPermissionIds.includes(permissionId)) {
      form.setValue(
        "permissionIds",
        selectedPermissionIds.filter((id) => id !== permissionId),
      );
    } else {
      form.setValue("permissionIds", [...selectedPermissionIds, permissionId]);
    }
  }

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
      {menus.map((menu) => {
        const menuPermissions = menu.permissions.filter(
          (p) => p.menuId === menu.id,
        );

        if (!menuPermissions.length) return null;

        return (
          <div key={menu.id} className="border rounded-lg p-4 space-y-3">
            <div className="font-semibold text-sm">{menu.name}</div>

            <div className="grid grid-cols-2 text-xs font-medium text-muted-foreground border-b pb-2">
              <div>Permission</div>
              <div className="text-center">Select</div>
            </div>

            {menuPermissions.map((permission) => {
              const isChecked = selectedPermissionIds.includes(permission.id);

              return (
                <div
                  key={permission.id}
                  className="grid grid-cols-2 items-center text-sm py-1"
                >
                  <div>{permission.name}</div>

                  <div className="flex justify-center">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
