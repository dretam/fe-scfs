import { serverHttp } from "@/lib/server/server-fetch";
import { BranchResponse } from "../types";

export const branchService = {
    list: async (params?: { page?: number; perPage?: number; filter?: string; sort?: string }) => {
        const query = new URLSearchParams();
        if (params?.page) query.append("page", params.page.toString());
        if (params?.perPage) query.append("perPage", params.perPage.toString());
        if (params?.filter) query.append("filter", params.filter);
        if (params?.sort) query.append("sort", params.sort);

        return serverHttp.get<BranchResponse[]>(`/api/v1/branches?${query.toString()}`, { withAuth: true });
    },

    retrieve: async (id: number) => {
        return serverHttp.get<BranchResponse>(`/api/v1/branches/${id}`, { withAuth: true });
    },
};
