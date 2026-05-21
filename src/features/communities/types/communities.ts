import { BaseListRequest, BaseRetrieveRequest } from "@/types/request";
import { BaseAuditResponse } from "@/types/response";

export type ProductType = "FACTORING" | "FINANCING";
export type RecourseType = "WITH_RECOURSE" | "WITHOUT_RECOURSE";
export type HolidayTreatment = "NEXT_BUSINESS_DAYS" | "PREVIOUS_BUSINESS_DAYS";
export type TransactionFeeType = "AMOUNT" | "PERCENTAGE";
export type InterestType = "TIERING" | "SINGLE_RATE";
export type InterestBasis = "CASH_BASIS" | "ACCRUAL" | "AMORTIZATION";
export type EarlyPaymentFeeType = "PERCENT" | "AMOUNT";
export type PricingTierLogic = "LT" | "LTE" | "GT" | "GTE" | "EQUAL";

export interface PricingTier {
  logic: PricingTierLogic;
  nominal: number;
  quantity: number;
}

export interface CommunityEntity {
  communityId?: string;
  name: string;
  description: string;
  productType: ProductType;
  recourse: RecourseType;
  holidayTreatment: HolidayTreatment;
  transactionFeeType: TransactionFeeType;
  interestType: InterestType;
  interestBasis: InterestBasis;
  isActive: boolean;
  isInterestReserve: boolean;
  isFundReserve: boolean;
  isSharingIncome: boolean;
  isExtendFinancing: boolean;
  transactionFee: number;
  minFinancing: number;
  maxFinancing: number;
  minTenor: number;
  maxTenor: number;
  gracePeriod: number;
  penaltyRate: number;
  earlyPaymentFeeType: EarlyPaymentFeeType;
  earlyPaymentFeeAmount: number;
  pricingTiers: PricingTier[];
}

export interface CommunityResponse extends BaseAuditResponse, CommunityEntity {
  communityId: string;
}

export interface GetListCommunityRequest extends BaseListRequest {
  filter?: string;
  sort?: string;
}

export interface GetRetrieveCommunityRequest extends BaseRetrieveRequest {
  communityId: string;
}

export interface PostCommunityRequest extends CommunityEntity { }

export interface PutCommunityRequest extends CommunityEntity {
  communityId: string;
}

export interface DeleteCommunityRequest {
  communityId: string;
}

export interface CommunityCreateActionFormData extends CommunityEntity {
  communityId?: string;
}

export interface CommunityDeleteActionFormData {
  communityId: string;
}