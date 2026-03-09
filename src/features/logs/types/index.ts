import { UserEntity, UserResponse } from "@/features/user";
import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";


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

export interface GetListAccessLogRequest extends BaseListRequest { }

export interface GetRetrieveAccessLogRequest extends BaseRetrieveRequest { }

export interface AccessLogResponse extends BaseAuditResponse {
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
}

