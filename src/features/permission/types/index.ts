export interface PermissionResponse {
    id: number;
    name: string;
    code: string;
    description: string;
    menuId: number;
}

export interface CreatePermissionCommand {
    name: string;
    code: string;
    description?: string;
    menuId?: number;
}

export interface UpdatePermissionCommand {
    id: number;
    name?: string;
    code?: string;
    description?: string;
    menuId?: number;
}

export interface SoftDeletePermissionCommand {
    id: number;
}

export interface DeleteResponsePermissionId {
    status: number;
    message: string;
    data: number;
}
