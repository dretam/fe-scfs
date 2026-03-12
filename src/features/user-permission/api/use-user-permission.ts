"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listByUserPermission,
  createUserPermission,
  updateUserPermission,
  deleteUserPermission
} from "../service/user-permission";
import {
  ListByUserUserPermissionRequest,
  PostUserPermissionRequest,
  PutUserPermissionRequest,
  DeleteUserPermissionRequest
} from "../types";

export const useUserPermissions = (userId: number) => {
  return useQuery({
    queryKey: ["user-permissions", userId],
    queryFn: () => listByUserPermission({ userId }),
    enabled: !!userId,
  });
};

export const useCreateUserPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostUserPermissionRequest) =>
      createUserPermission(data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user-permissions", userId] });
    },
  });
};

export const useUpdateUserPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PutUserPermissionRequest) =>
      updateUserPermission(data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user-permissions", userId] });
    },
  });
};

export const useDeleteUserPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DeleteUserPermissionRequest) =>
      deleteUserPermission(data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user-permissions", userId] });
    },
  });
};
