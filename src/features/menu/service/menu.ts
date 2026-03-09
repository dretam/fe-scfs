import { serverHttp } from "@/lib/server/server-fetch";
import {
    MenuResponse,
    CreateMenuCommand,
    UpdateMenuCommand,
    SoftDeleteMenuCommand
} from "../types";

export const menuService = {
    list: async (params?: { page?: number; perPage?: number; filter?: string; sort?: string }) => {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", params.page.toString());
        if (params?.perPage) query.append("perPage", params.perPage.toString());
        if (params?.filter) query.append("filter", params.filter);
        if (params?.sort) query.append("sort", params.sort);

        return serverHttp.get<MenuResponse[]>(`/api/v1/menus?${query.toString()}`, { withAuth: true });
    },

    retrieve: async (id: number) => {
        return serverHttp.get<MenuResponse>(`/api/v1/menus/${id}`, { withAuth: true });
    },

    getByRole: async (roleId: number) => {
        return serverHttp.get<MenuResponse[]>(`/api/v1/menus/role/${roleId}`, { withAuth: true });
    },

    getTreeByRole: async (roleId: number) => {
        return serverHttp.get<MenuResponse[]>(`/api/v1/menus/role/${roleId}/tree`, { withAuth: true });
    },

    create: async (data: CreateMenuCommand) => {
        return serverHttp.post<MenuResponse>("/api/v1/menus", data, { withAuth: true });
    },

    update: async (data: UpdateMenuCommand) => {
        return serverHttp.put<MenuResponse>("/api/v1/menus", data, { withAuth: true });
    },

    softDelete: async (data: SoftDeleteMenuCommand) => {
        return serverHttp.delete<number>("/api/v1/menus", {
            withAuth: true,
            body: JSON.stringify(data)
        });
    },

    destroy: async (id: number) => {
        return serverHttp.delete<number>(`/api/v1/menus/${id}/destroy`, { withAuth: true });
    },
};
