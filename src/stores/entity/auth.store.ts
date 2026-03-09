import { RootState } from "@/lib/store";
import { SessionPermissionResponse, SessionMenuResponse } from "@/features/auth/types";
import { UserEntity } from "@/features/user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: UserEntity;
    permissions: SessionPermissionResponse[];
    menus: SessionMenuResponse[];
}

const initialState: AuthState = {
    user: {
        id: null,
        name: null,
        email: null,
        role: null,
    },
    permissions: [],
    menus: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ permissions: SessionPermissionResponse[], menus: SessionMenuResponse[] }>): void => {
            state.permissions = action.payload.permissions;
            state.menus = action.payload.menus;
        },
        setUser: (state, action: PayloadAction<UserEntity>): void => {
            state.user.id = action.payload.id
            state.user.name = action.payload.name
            state.user.email = action.payload.email
            state.user.role = action.payload.role
        },
        resetAuth: (): AuthState => initialState,
    }
})

export const { setAuthData, setUser, resetAuth } = authSlice.actions

// Selectors
export const selectUser = (state: RootState): UserEntity => state.auth?.user || initialState.user
export const selectUserId = (state: RootState): number => state.auth?.user?.id ?? 0
export const selectUserName = (state: RootState): string => state.auth?.user?.name ?? ""
export const selectUserEmail = (state: RootState): string => state.auth?.user?.email ?? ""

export const selectUserInitial = (state: RootState): string => {
    if (!state.auth?.user?.name) return "";
    const names = state.auth.user?.name.trim().split(/\s+/);
    const first = names[0]?.[0] || "";
    const last = names.length > 1 ? names[names.length - 1][0] : "";
    return (first + last).toUpperCase();
}
export const selectPermissions = (state: RootState): SessionPermissionResponse[] => state.auth?.permissions || []
export const selectMenus = (state: RootState): SessionMenuResponse[] => state.auth?.menus || []

/**
 * Check if the user has a specific permission by code.
 */
export const hasPermission = (state: RootState, permissionCode: string): boolean => {
    return state.auth.permissions?.some((p: SessionPermissionResponse) => p.code === permissionCode) || false;
}

/**
 * Check if the user has any of the provided permission codes.
 */
export const hasAnyPermission = (state: RootState, permissionCodes: string[]): boolean => {
    return state.auth.permissions?.some((p: SessionPermissionResponse) => permissionCodes.includes(p.code)) || false;
}

/**
 * Check if the user has all of the provided permission codes.
 */
export const hasAllPermissions = (state: RootState, permissionCodes: string[]): boolean => {
    return permissionCodes.every(code => state.auth.permissions?.some((p: SessionPermissionResponse) => p.code === code)) || false;
}

export default authSlice.reducer
