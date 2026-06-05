import { BaseListRequest, BaseRetrieveRequest } from "@/types/request"
import { BaseAuditResponse } from "@/types/response"

export interface CompanyEntity {
    companyId: string,
    companyCif: string,
    companyName: string,
    companyType: string,
    companyRmUserId: string,
    companyDiscountRate: number,
    companyMaxFinancing: number
}

export interface CompanyResponse extends BaseAuditResponse {
    companyId: string,
    companyCif: string,
    companyName: string,
    companyType: string,
    companyRmUserId: string,
    companyDiscountRate: number,
    companyMaxFinancing: number
}

export interface GetListCompanyRequest extends BaseListRequest { }

export interface GetRetrieveCompanyRequest extends BaseRetrieveRequest { }