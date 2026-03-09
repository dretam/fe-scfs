import { RoleEntity, RoleResponse } from "@/features/role";
import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";


export interface UserEntity {
    id: number | null,
    name: string | null,
    email: string | null,
    role: RoleEntity | null,
}

export interface GetListUserRequest extends BaseListRequest { }

export interface GetRetrieveUserRequest extends BaseRetrieveRequest { }

export interface PutUserRequest {
    id: number;
    name?: string | null;
    email?: string | null;
    existingPassword?: string | null;
    password?: string | null;
    roleId?: number | null;
}

export interface PostUserRequest {
    username: string;
    password: string;
    roleId: number;
}

export interface DeleteUserRequest {
    id: number;
}

export interface GetRetrieveInternalUser {
    username: string;
}

export interface UserResponse extends BaseAuditResponse {
    id: number;
    name: string;
    email: string;
    role: RoleResponse | null;
}

export interface InternalUserResponse {
    userName: string
    nama: string
    joinDate: string
    jabatan: number
    approval1: string
    approval2: string
    lastLogin: string
    updatePass: string
    status: number
    count: number
    email: string
    area: string
    jobTitle: string
    direktorat: string
    sex: string
    employee: string
    mobile: string
    extOffice: any
    tglLahir: string
    pangkat: string
    sessionId: any
    usersCabang: any
    usersBranch: any
}



