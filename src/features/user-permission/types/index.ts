export interface UserPermissionResponse {
    userId: number;
    permissionId: number;
    permissionCode: string;
    permissionName: string;
    effect: string; // e.g., "ALLOW", "DENY"
}

export interface CreateUserPermissionCommand {
    userId: number;
    permissionId: number;
    effect: string;
}

export interface UpdateUserPermissionCommand {
    userId: number;
    permissionId: number;
    effect: string;
}
