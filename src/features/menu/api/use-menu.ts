import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { menuService } from "../service";
import { CreateMenuCommand, UpdateMenuCommand, SoftDeleteMenuCommand } from "../types";

export const useMenus = (params?: { page?: number; perPage?: number; filter?: string; sort?: string }) => {
    return useQuery({
        queryKey: ["menus", params],
        queryFn: () => menuService.list(params),
    });
};

export const useMenu = (id: number) => {
    return useQuery({
        queryKey: ["menus", id],
        queryFn: () => menuService.retrieve(id),
        enabled: !!id,
    });
};

export const useMenusByRole = (roleId: number) => {
    return useQuery({
        queryKey: ["menus", "role", roleId],
        queryFn: () => menuService.getByRole(roleId),
        enabled: !!roleId,
    });
};

export const useMenuTreeByRole = (roleId: number) => {
    return useQuery({
        queryKey: ["menus", "role", roleId, "tree"],
        queryFn: () => menuService.getTreeByRole(roleId),
        enabled: !!roleId,
    });
};

export const useCreateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateMenuCommand) => menuService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
    });
};

export const useUpdateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateMenuCommand) => menuService.update(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
            if (data.success && 'id' in data.data) {
                queryClient.invalidateQueries({ queryKey: ["menus", data.data.id] });
            }
        },
    });
};

export const useSoftDeleteMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SoftDeleteMenuCommand) => menuService.softDelete(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
    });
};

export const useDestroyMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => menuService.destroy(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
    });
};
