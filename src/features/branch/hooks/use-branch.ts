'use client'

import { useQuery } from "@tanstack/react-query";
import { branchService } from "../service";

export const useBranches = (params?: { page?: number; perPage?: number; filter?: string; sort?: string }) => {
    return useQuery({
        queryKey: ["branches", params],
        queryFn: () => branchService.list(params),
    });
};

export const useBranch = (id: number) => {
    return useQuery({
        queryKey: ["branches", id],
        queryFn: () => branchService.retrieve(id),
        enabled: !!id,
    });
};
