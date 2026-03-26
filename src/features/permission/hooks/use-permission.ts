"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getListPermission,
  getRetrievePermission
} from "../service/permission";
import {
  permissionCreateAction,
  permissionUpdateAction,
  permissionSoftDeleteAction,
  permissionHardDeleteAction
} from "../actions";
import {
  GetListPermissionRequest,
  GetRetrievePermissionRequest,
  PostPermissionRequest,
  PutPermissionRequest,
  DeletePermissionRequest,
  PermissionResponse
} from "../types";
import { useAppMutation } from "@/hooks/core/use-mutation";


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
  return useAppMutation<PermissionResponse, PostPermissionRequest>(
    permissionCreateAction,
    ['permissions']
  );
};

export const useUpdatePermission = () => {
  return useAppMutation<PermissionResponse, PutPermissionRequest>(
    permissionUpdateAction,
    ['permissions']
  );
};

export const useSoftDeletePermission = () => {
  return useAppMutation<PermissionResponse, DeletePermissionRequest>(
    permissionSoftDeleteAction,
    ['permissions']
  );
};

export const useDestroyPermission = () => {
  return useAppMutation<{ id: number }, number>(
    permissionHardDeleteAction,
    ['permissions']
  );
};
