import { serverHttp } from "@/lib/server/server-fetch";
import {
    UserPermissionResponse,
    CreateUserPermissionCommand,
    UpdateUserPermissionCommand
} from "../types";

export const userPermissionService = {
    listByUser: async (userId: number) => {
        return serverHttp.get<UserPermissionResponse[]>(`/api/v1/users/${userId}/permissions`, { withAuth: true });
    },

    create: async (userId: number, data: CreateUserPermissionCommand) => {
        return serverHttp.post<UserPermissionResponse>(`/api/v1/users/${userId}/permissions`, data, { withAuth: true });
    },

    update: async (userId: number, permissionId: number, data: UpdateUserPermissionCommand) => {
        return serverHttp.put<UserPermissionResponse>(`/api/v1/users/${userId}/permissions/${permissionId}`, data, { withAuth: true });
    },

    delete: async (userId: number, permissionId: number) => {
        return serverHttp.delete<void>(`/api/v1/users/${userId}/permissions/${permissionId}`, { withAuth: true });
    },
};
