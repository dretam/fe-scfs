import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";

export interface PermissionResponse extends BaseAuditResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    menuId: number;
}

export interface GetListPermissionRequest extends BaseListRequest { }

export interface GetRetrievePermissionRequest extends BaseRetrieveRequest { }

export interface PostPermissionRequest {
    name: string;
    code: string;
    description?: string;
    menuId?: number;
}

export interface PutPermissionRequest {
    id: number;
    name?: string;
    code?: string;
    description?: string;
    menuId?: number;
}

export interface DeletePermissionRequest {
    id: number;
}

export interface DeleteResponsePermissionId {
    status: number;
    message: string;
    data: number;
}
