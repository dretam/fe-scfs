import { serverHttp } from "@/lib/server/server-fetch";
import { Result, ReadResponse } from "@/types/response";
import {
    PermissionResponse,
    CreatePermissionCommand,
    UpdatePermissionCommand,
    SoftDeletePermissionCommand
} from "../types";

export const permissionService = {
    list: async (params?: { page?: number; perPage?: number; filter?: string; sort?: string }) => {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", params.page.toString());
        if (params?.perPage) query.append("perPage", params.perPage.toString());
        if (params?.filter) query.append("filter", params.filter);
        if (params?.sort) query.append("sort", params.sort);

        return serverHttp.get<PermissionResponse[]>(`/api/v1/permissions?${query.toString()}`, { withAuth: true });
    },

    retrieve: async (id: number) => {
        return serverHttp.get<PermissionResponse>(`/api/v1/permissions/${id}`, { withAuth: true });
    },

    create: async (data: CreatePermissionCommand) => {
        return serverHttp.post<PermissionResponse>("/api/v1/permissions", data, { withAuth: true });
    },

    update: async (data: UpdatePermissionCommand) => {
        return serverHttp.put<PermissionResponse>("/api/v1/permissions", data, { withAuth: true });
    },

    softDelete: async (data: SoftDeletePermissionCommand) => {
        return serverHttp.delete<number>("/api/v1/permissions", {
            withAuth: true,
            body: JSON.stringify(data)
        });
    },

    destroy: async (id: number) => {
        return serverHttp.delete<number>(`/api/v1/permissions/${id}/destroy`, { withAuth: true });
    },
};
