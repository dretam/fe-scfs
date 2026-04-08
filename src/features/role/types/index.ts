import { MenuResponse } from "@/features/menu";
import { PermissionResponse } from "@/features/permission";
import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";

export interface RoleEntity {
    id: number | null,
    name: string | null,
    icon: string | null,
    description: string | null,
}

export interface RoleFormActionFormData {
    id?: number;
    name: string;
    icon: string;
    description: string;
    permissionIds: number[];
}

export interface RoleDeleteActionFormData {
    roleId: number;
}

export interface GetListRoleRequest extends BaseListRequest { }

export interface GetRetrieveRoleRequest extends BaseRetrieveRequest { }

export interface PostRoleRequest {
    name: string;
    icon: string;
    description: string;
    permissionIds: number[];
}

export interface PutRoleRequest {
    id: number;
    name: string;
    icon: string;
    description: string;
    permissionIds: number[];
}

export interface DeleteRoleRequest {
    id: number;
}

export interface RoleResponse extends BaseAuditResponse {
    id: string;
    name: string;
    icon: string;
    description: string;
    permissions: PermissionResponse[]
    menus: MenuResponse[]
}
