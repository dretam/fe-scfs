// communities/constants.ts

export const PRODUCT_TYPE = {
  FACTORING: "FACTORING",
  FINANCING: "FINANCING",
} as const;

export const RECOURSE = {
  WITH_RECOURSE: "WITH_RECOURSE",
  WITHOUT_RECOURSE: "WITHOUT_RECOURSE",
} as const;

export const HOLIDAY_TREATMENT = {
  NEXT_BUSINESS_DAYS: "NEXT_BUSINESS_DAYS",
  PREVIOUS_BUSINESS_DAYS: "PREVIOUS_BUSINESS_DAYS",
} as const;

export const TRANSACTION_FEE_TYPE = {
  AMOUNT: "AMOUNT",
  PERCENTAGE: "PERCENTAGE",
} as const;

export const INTEREST_TYPE = {
  TIERING: "TIERING",
  SINGLE_RATE: "SINGLE_RATE",
} as const;

export const INTEREST_BASIS = {
  CASH_BASIS: "CASH_BASIS",
  ACCRUAL: "ACCRUAL",
  AMORTIZATION: "AMORTIZATION",
} as const;

export const EARLY_PAYMENT_FEE_TYPE = {
  PERCENT: "PERCENT",
  AMOUNT: "AMOUNT",
} as const;

export const PRICING_TIER_LOGIC = {
  LT: "LT",
  LTE: "LTE",
  GT: "GT",
  GTE: "GTE",
  EQUAL: "EQUAL",
} as const;

// Types
export type ProductType = typeof PRODUCT_TYPE[keyof typeof PRODUCT_TYPE];
export type Recourse = typeof RECOURSE[keyof typeof RECOURSE];
export type HolidayTreatment = typeof HOLIDAY_TREATMENT[keyof typeof HOLIDAY_TREATMENT];
export type TransactionFeeType = typeof TRANSACTION_FEE_TYPE[keyof typeof TRANSACTION_FEE_TYPE];
export type InterestType = typeof INTEREST_TYPE[keyof typeof INTEREST_TYPE];
export type InterestBasis = typeof INTEREST_BASIS[keyof typeof INTEREST_BASIS];
export type EarlyPaymentFeeType = typeof EARLY_PAYMENT_FEE_TYPE[keyof typeof EARLY_PAYMENT_FEE_TYPE];
export type PricingTierLogic = typeof PRICING_TIER_LOGIC[keyof typeof PRICING_TIER_LOGIC];

// Select options
export const PRODUCT_TYPE_OPTIONS = [
  { value: PRODUCT_TYPE.FACTORING, label: "Factoring" },
  { value: PRODUCT_TYPE.FINANCING, label: "Financing" },
];

export const RECOURSE_OPTIONS = [
  { value: RECOURSE.WITH_RECOURSE, label: "With Recourse" },
  { value: RECOURSE.WITHOUT_RECOURSE, label: "Without Recourse" },
];

export const HOLIDAY_TREATMENT_OPTIONS = [
  { value: HOLIDAY_TREATMENT.NEXT_BUSINESS_DAYS, label: "Next Business Days" },
  { value: HOLIDAY_TREATMENT.PREVIOUS_BUSINESS_DAYS, label: "Previous Business Days" },
];

export const TRANSACTION_FEE_TYPE_OPTIONS = [
  { value: TRANSACTION_FEE_TYPE.AMOUNT, label: "Amount" },
  { value: TRANSACTION_FEE_TYPE.PERCENTAGE, label: "Percentage" },
];

export const INTEREST_TYPE_OPTIONS = [
  { value: INTEREST_TYPE.TIERING, label: "Tiering" },
  { value: INTEREST_TYPE.SINGLE_RATE, label: "Single Rate" },
];

export const INTEREST_BASIS_OPTIONS = [
  { value: INTEREST_BASIS.CASH_BASIS, label: "Cash Basis" },
  { value: INTEREST_BASIS.ACCRUAL, label: "Accrual" },
  { value: INTEREST_BASIS.AMORTIZATION, label: "Amortization" },
];

export const EARLY_PAYMENT_FEE_TYPE_OPTIONS = [
  { value: EARLY_PAYMENT_FEE_TYPE.PERCENT, label: "Percent" },
  { value: EARLY_PAYMENT_FEE_TYPE.AMOUNT, label: "Amount" },
];

export const PRICING_TIER_LOGIC_OPTIONS = [
  { value: PRICING_TIER_LOGIC.LT, label: "Less Than" },
  { value: PRICING_TIER_LOGIC.LTE, label: "Less Than or Equal" },
  { value: PRICING_TIER_LOGIC.GT, label: "Greater Than" },
  { value: PRICING_TIER_LOGIC.GTE, label: "Greater Than or Equal" },
  { value: PRICING_TIER_LOGIC.EQUAL, label: "Equal To" },
];