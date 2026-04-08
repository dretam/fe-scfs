'use client'

import { useAppMutation } from "@/hooks/core/use-mutation";
import { userChangeNewPasswordAction, UserChangeNewPasswordRequest, UserChangeNewPasswordResponse, UserEntity } from "@/features/user";

/**
 * LOGIN
 */
export function useChangePass() {
    return useAppMutation<UserChangeNewPasswordResponse, UserChangeNewPasswordRequest>(
        userChangeNewPasswordAction,
        ['auth-session']
    );
}