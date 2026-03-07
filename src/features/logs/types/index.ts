import { UserEntity, UserResponse } from "@/features/user";


export interface AccessLogEntity {
    id: number;
    user: UserEntity | null;
    ipAddress: string;
    userAgent: string;
    uri: string;
    queryParams: string | null;
    requestBody: string | null;
    statusCode: number;
    responseTimeMs: number;
    errorMessage: string | null;
    httpMethod: string;
    createdAt: string;
}

export interface GetListAccessLogRequest {
    page?: number | null;
    perPage?: number | null;
    filter?: string | null;
    sort?: string | null;
    expands?: string | null;
}

export interface GetRetrieveAccessLogRequest {
    id: number;
    expands?: string | null;
}

export interface AccessLogResponse {
    id: number;
    user: UserResponse | null;
    ipAddress: string;
    userAgent: string;
    uri: string;
    queryParams: string | null;
    requestBody: string | null;
    statusCode: number;
    responseTimeMs: number;
    errorMessage: string | null;
    httpMethod: string;
    createdAt: string;
}

