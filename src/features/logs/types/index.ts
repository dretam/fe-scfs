import { UserEntity } from "@/features/user";

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
