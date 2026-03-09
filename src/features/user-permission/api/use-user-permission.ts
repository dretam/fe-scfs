import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userPermissionService } from "../service";
import { CreateUserPermissionCommand, UpdateUserPermissionCommand } from "../types";

export const useUserPermissions = (userId: number) => {
    return useQuery({
        queryKey: ["user-permissions", userId],
        queryFn: () => userPermissionService.listByUser(userId),
        enabled: !!userId,
    });
};

export const useCreateUserPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, data }: { userId: number; data: CreateUserPermissionCommand }) =>
            userPermissionService.create(userId, data),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["user-permissions", userId] });
        },
    });
};

export const useUpdateUserPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, permissionId, data }: { userId: number; permissionId: number; data: UpdateUserPermissionCommand }) =>
            userPermissionService.update(userId, permissionId, data),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["user-permissions", userId] });
        },
    });
};

export const useDeleteUserPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, permissionId }: { userId: number; permissionId: number }) =>
            userPermissionService.delete(userId, permissionId),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["user-permissions", userId] });
        },
    });
};
