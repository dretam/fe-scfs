'use client'

import { useAppMutation } from "@/hooks/core/use-mutation";
import { useReadHook } from "@/hooks/core/use-read";
import { loginAction, logoutAction } from "./auth";
import { getAuthSession } from "../service";
import { UserSessionResponse, PostAuthLoginRequest } from "../types";
import { UserEntity } from "@/features/user";

/**
 * LOGIN
 */
export function useLogin() {
    return useAppMutation<UserEntity, PostAuthLoginRequest>(
        loginAction,
        ['auth-session']
    );
}

/**
 * LOGOUT
 */
export function useLogout() {
    return useAppMutation<void, void>(
        logoutAction,
        ['auth-session']
    );
}

/**
 * SESSION
 */

export function useSession(expands?: string, enabled: boolean = false) {
    return useReadHook<UserSessionResponse>({
        queryKey: ["auth-session", expands ?? ""],
        apiCall: () => getAuthSession(expands),
        enabled: enabled,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
}