import { RoleResponse } from "@/features/role";

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

export interface UserSessionResponse {
    id: number;
    name: string;
    email: string;
    role: RoleResponse;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    updatedBy: number;
    deletedAt: string | null;
    deletedBy: number | null;
}
