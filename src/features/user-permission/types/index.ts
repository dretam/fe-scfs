import { BaseRetrieveRequest } from "@/types/request";

export interface UserPermissionResponse {
    userId: number;
    permissionId: number;
    permissionCode: string;
    permissionName: string;
    effect: string; // e.g., "ALLOW", "DENY"
}

export interface ListByUserUserPermissionRequest {
    userId: number;
}

export interface PostUserPermissionRequest {
    userId: number;
    permissionId: number;
    effect: string;
}

export interface PutUserPermissionRequest {
    userId: number;
    permissionId: number;
    effect: string;
}

export interface DeleteUserPermissionRequest {
    userId: number;
    permissionId: number;
}
