import { RoleResponse } from "@/features/role";
import { BaseAuditResponse } from "@/types/response";

export interface PostAuthLoginRequest {
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

export interface UserSessionResponse extends BaseAuditResponse {
    id: number;
    name: string;
    email: string;
    role: RoleResponse;
}
