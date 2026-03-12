import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";

export interface MenuEntity {
    id: number | null;
    name: string | null;
    code: string | null;
    path: string | null;
    icon: string | null;
    parentId: number | null;
    sortOrder: number | null;
}

export interface MenuCreateActionFormData {
    id?: number;
    name: string;
    code: string;
    path?: string;
    icon?: string;
    parentId?: number;
    sortOrder: number;
}

export interface MenuDeleteActionFormData {
    menuId: number;
}

export interface GetListMenuRequest extends BaseListRequest { }

export interface GetRetrieveMenuRequest extends BaseRetrieveRequest { }

export interface PostMenuRequest {
    name: string;
    code: string;
    path?: string;
    icon?: string;
    parentId?: number;
    sortOrder: number;
}

export interface PutMenuRequest {
    id: number;
    name?: string;
    code?: string;
    path?: string;
    icon?: string;
    parentId?: number;
    sortOrder?: number;
}

export interface DeleteMenuRequest {
    id: number;
}

export interface MenuResponse extends BaseAuditResponse {
    id: number;
    name: string;
    code: string;
    path: string;
    icon: string;
    parentId?: number;
    sortOrder: number;
}

export interface CreateMenuCommand {
    name: string;
    code: string;
    path?: string;
    icon?: string;
    parentId?: number;
    sortOrder: number;
}

export interface UpdateMenuCommand {
    id: number;
    name?: string;
    code?: string;
    path?: string;
    icon?: string;
    parentId?: number;
    sortOrder?: number;
}

export interface SoftDeleteMenuCommand {
    id: number;
}

export interface DeleteResponseMenuId {
    status: number;
    message: string;
    data: number;
}
