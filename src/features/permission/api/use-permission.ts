import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { permissionService } from "../service";
import { CreatePermissionCommand, UpdatePermissionCommand, SoftDeletePermissionCommand } from "../types";

export const usePermissions = (params?: { page?: number; perPage?: number; filter?: string; sort?: string }) => {
    return useQuery({
        queryKey: ["permissions", params],
        queryFn: () => permissionService.list(params),
    });
};

export const usePermission = (id: number) => {
    return useQuery({
        queryKey: ["permissions", id],
        queryFn: () => permissionService.retrieve(id),
        enabled: !!id,
    });
};

export const useCreatePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreatePermissionCommand) => permissionService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
        },
    });
};

export const useUpdatePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdatePermissionCommand) => permissionService.update(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
            if (data.success && 'id' in data.data) {
                queryClient.invalidateQueries({ queryKey: ["permissions", data.data.id] });
            }
        },
    });
};

export const useSoftDeletePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SoftDeletePermissionCommand) => permissionService.softDelete(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
        },
    });
};

export const useDestroyPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => permissionService.destroy(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
        },
    });
};
