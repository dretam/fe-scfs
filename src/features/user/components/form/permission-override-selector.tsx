"use client";

import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { UserFormValues } from "../../schemas";
import { MenuResponse } from "@/features/menu";
import { RoleResponse } from "@/features/role";

interface Props {
  menus: MenuResponse[];
  roles: RoleResponse[];
  form: UseFormReturn<UserFormValues>;
}

export function PermissionOverrideSelector({ menus, roles, form }: Props) {
  const roleId = form.watch("roleId");
  const overrides = form.watch("overrides") ?? [];

  const role = roles.find((r) => r.id === roleId);

  const rolePermissions = role?.permissions.map((p) => p.id) ?? [];

  function getOverride(permissionId: number) {
    return overrides.find((o) => o.permissionId === permissionId);
  }

  function setOverride(permissionId: number, effect: "ALLOW" | "DENY") {
    const filtered = overrides.filter((o) => o.permissionId !== permissionId);

    form.setValue("overrides", [...filtered, { permissionId, effect }]);
  }

  function removeOverride(permissionId: number) {
    form.setValue(
      "overrides",
      overrides.filter((o) => o.permissionId !== permissionId),
    );
  }

  return (
    <div className="space-y-6">
      {menus.map((menu) => {
        const menuPermissions = menu.permissions.filter(
          (p) => p.menuId === menu.id,
        );

        if (!menuPermissions.length) return null;

        return (
          <div key={menu.id} className="border rounded-lg p-4 space-y-3">
            <div className="font-semibold text-sm">{menu.name}</div>

            <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground border-b pb-2">
              <div>Permission</div>
              <div className="text-center">Allow</div>
              <div className="text-center">Deny</div>
            </div>

            {menuPermissions.map((permission) => {
              const override = getOverride(permission.id);

              const roleHas = rolePermissions.includes(permission.id);

              const allowChecked =
                override?.effect === "ALLOW"
                  ? true
                  : override?.effect === "DENY"
                    ? false
                    : roleHas;

              const denyChecked = override?.effect === "DENY";

              return (
                <div
                  key={permission.id}
                  className="grid grid-cols-3 items-center text-sm py-1"
                >
                  <div>{permission.name}</div>

                  <div className="flex justify-center">
                    <Checkbox
                      checked={allowChecked}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setOverride(permission.id, "ALLOW");
                        } else {
                          removeOverride(permission.id);
                        }
                      }}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Checkbox
                      checked={denyChecked}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setOverride(permission.id, "DENY");
                        } else {
                          removeOverride(permission.id);
                        }
                      }}
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
