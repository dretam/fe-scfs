import { CompanyEntity, CompanyResponse } from "@/features/company/types";
import { RoleEntity, RoleResponse } from "@/features/role";
import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";

export interface UserByTokenChangePasswordRequest {
    token: string;
}

export interface UserByTokenChangePasswordActionFormData {
    token: string;
}

export interface UserByTokenChangePasswordResponse {
    status: number;
    message: string;
    data: UserResponse;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    status: number;
    message: string;
    data: boolean;
}

export interface UserSendTokenChangePasswordActionFormData {
    email: string;
}

export interface UserChangeNewPasswordRequest {
    id: string;
    forgotPasswordTokenHash: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface UserChangeNewPasswordActionFormData {
    id: string;
    forgotPasswordTokenHash: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface UserChangeNewPasswordResponse {
    status: number;
    message: string;
    data: UserResponse;
}

export interface UserResponse extends BaseAuditResponse {
    id: string;
    name: string;
    fullName: string | null,
    email: string | null,
    isActive: boolean | null,
    photoPath: string | null,
    role: RoleResponse | null;
    roleChildren: RoleResponse | null;
    company: CompanyResponse | null;
    userPermissionOverride?: UserPermissionOverride[]
}

export interface UserEntity {
    id: string | null,
    name: string | null,
    fullName: string | null,
    email: string | null,
    isActive: boolean | null,
    photoPath: string | null,
    role: RoleEntity | null,
    roleChildren: RoleEntity | null,
    company: CompanyEntity | null
}

export interface UserChangePasswordActionFormData {
    userId: number;
    existingPassword: string;
    newPassword: string;
    retypeNewPassword: string;
}

export interface UserChangeProfileActionFormData {
    userId: number;
    name: string;
    email: string;
}

export interface UserCreateActionFormData {
    username: string;
    password: string;
    roleId: number;
    permissionOverrides?: PermissionOverride[];
}

export interface UserDeleteActionFormData {
    userId: number;
}

export interface GetListUserRequest extends BaseListRequest { }

export interface GetRetrieveUserRequest extends BaseRetrieveRequest { }

export interface PutUserRequest {
    id: number;
    existingPassword?: string | null;
    password?: string | null;
    roleId?: number | null;
    permissionOverrides?: PermissionOverride[];
}

type PermissionOverrideEffectType = "ALLOW" | "DENY";

export interface PermissionOverride {
    permissionId: number;
    effect: PermissionOverrideEffectType;
}

export interface PostUserRequest {
    username: string;
    password: string;
    roleId: number;
    permissionOverrides?: PermissionOverride[];
}

export interface DeleteUserRequest {
    id: number;
}

export interface GetRetrieveInternalUser {
    username: string;
}

export interface UserResponse extends BaseAuditResponse {
    id: string;
    username: string;
    fullName: string | null;
    email: string | null;
    role: RoleResponse | null;
    roleChildren: RoleResponse | null;
    companyId: string;
    status: boolean;
    userPermissionOverride?: UserPermissionOverride[]
}

export interface UserPermissionOverride {
    userId: string
    permissionId: string
    effect: PermissionOverrideEffectType
}

export interface InternalUserResponse {
    id: string;
    name: string;
    fullName: string | null,
    email: string | null,
    isActive: boolean | null,
    photoPath: string | null,
    role: RoleResponse | null;
    roleChildren: RoleResponse | null;
    company: CompanyResponse | null;
    userPermissionOverride?: UserPermissionOverride[]
}



