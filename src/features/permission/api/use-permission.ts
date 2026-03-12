"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getListPermission,
  getRetrievePermission,
  createPermission,
  updatePermission,
  softDeletePermission,
  hardDeletePermission
} from "../service/permission";
import {
  GetListPermissionRequest,
  GetRetrievePermissionRequest,
  PostPermissionRequest,
  PutPermissionRequest,
  DeletePermissionRequest
} from "../types";

export const usePermissions = (params?: GetListPermissionRequest) => {
  return useQuery({
    queryKey: ["permissions", params],
    queryFn: () => getListPermission(params ?? {}),
  });
};

export const usePermission = (id: number) => {
  return useQuery({
    queryKey: ["permissions", id],
    queryFn: () => getRetrievePermission({ id }),
    enabled: !!id,
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostPermissionRequest) => createPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PutPermissionRequest) => updatePermission(data),
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
    mutationFn: (data: DeletePermissionRequest) => softDeletePermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

export const useDestroyPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => hardDeletePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};
