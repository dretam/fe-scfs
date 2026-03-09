export interface MenuResponse {
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
