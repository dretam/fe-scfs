import { BaseAuditResponse } from "@/types/response";

export interface PostAuthLoginRequest {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface AuthLoginActionFormData {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface AuthLoginResponse {
    status: number;
    message: string;
    refreshToken: string;
    accessToken: string;
}

export interface AuthRefreshResponse {
    status: number;
    message: string;
    accessToken: string;
}

export interface SessionMenuResponse {
    id: number;
    name: string;
    code: string;
    path: string;
    icon: any;
    parentId: number | null;
    sortOrder: number;
    children: SessionMenuResponse[]
}

export interface SessionPermissionResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    menuId: number;
}

export interface SessionRoleResponse extends BaseAuditResponse {
    id: number;
    name: string;
    icon: string;
    description: string;
    permissions: SessionPermissionResponse[];
    menus: SessionMenuResponse[];
}

export interface UserSessionResponse extends BaseAuditResponse {
    id: number;
    name: string;
    email: string;
    role: SessionRoleResponse;
}
