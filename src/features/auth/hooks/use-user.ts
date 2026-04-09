'use client'

import { useAppMutation } from "@/hooks/core/use-mutation";
import { GetRetrieveUserRequest, userByTokenChangePasswordAction, UserByTokenChangePasswordRequest, UserByTokenChangePasswordResponse, userChangeNewPasswordAction, UserChangeNewPasswordRequest, UserChangeNewPasswordResponse, UserEntity, UserResponse } from "@/features/user";
import { IReactQueryOptions, useReadHook } from "@/hooks/core/use-read";
import { getUserByToken } from "@/features/user/service";

/**
 * CHANGE PASS
 */
export function useChangePass() {
    return useAppMutation<UserChangeNewPasswordResponse, UserChangeNewPasswordRequest>(
        userChangeNewPasswordAction,
        ['auth-session']
    );
}

/**
 * GET USER BY TOKEN CHANGE PASS
 */
export function useUserChangePass(
    request: GetRetrieveUserRequest,
    options: IReactQueryOptions<UserResponse>
) {
    return useReadHook<UserResponse>({
        queryKey: ["token", request.id],
        apiCall: () => getUserByToken(request),
        refetchOnWindowFocus: false,
        ...options
    })
}