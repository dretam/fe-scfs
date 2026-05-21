import { z } from "zod";

export const pricingTierSchema = z.object({
  logic: z.enum(["LT", "GT", "EQUAL", "LTE", "GTE"]),
  nominal: z.preprocess((val) => Number(val), z.number().min(0)),
  quantity: z.preprocess((val) => Number(val), z.number().min(0)),
});
export const communitySchema = z.object({
  communityId: z.uuid().optional(),
  name: z.string().min(1, "Nama harus diisi").max(255),
  description: z.string().min(1, "Deskripsi harus diisi").max(1000),
  productType: z.enum(["FACTORING", "FINANCING"]),
  recourse: z.enum(["WITH_RECOURSE", "WITHOUT_RECOURSE"]),
  holidayTreatment: z.enum(["NEXT_BUSINESS_DAYS", "PREVIOUS_BUSINESS_DAYS"]),
  transactionFeeType: z.enum(["AMOUNT", "PERCENTAGE"]),
  interestType: z.enum(["TIERING", "SINGLE_RATE"]),
  interestBasis: z.enum(["CASH_BASIS", "ACCRUAL", "AMORTIZATION"]),
  isActive: z.boolean().default(true),
  isInterestReserve: z.boolean().default(false),
  isFundReserve: z.boolean().default(false),
  isSharingIncome: z.boolean().default(false),
  isExtendFinancing: z.boolean().default(false),
  transactionFee: z.preprocess((val) => Number(val), z.number().min(0)),
  minFinancing: z.preprocess((val) => Number(val), z.number().min(0)),
  maxFinancing: z.preprocess((val) => Number(val), z.number().min(0)),
  minTenor: z.preprocess((val) => Number(val), z.number().min(0)),
  maxTenor: z.preprocess((val) => Number(val), z.number().min(0)),
  gracePeriod: z.preprocess((val) => Number(val), z.number().min(0)),
  penaltyRate: z.preprocess((val) => Number(val), z.number().min(0)),
  earlyPaymentFeeType: z.enum(["PERCENT", "AMOUNT"]),
  earlyPaymentFeeAmount: z.preprocess((val) => Number(val), z.number().min(0)),
  pricingTiers: z.array(pricingTierSchema).min(1, "Minimal satu tingkat harga harus diisi"),
});

export const communityCreateFormSchema = communitySchema;

export const communityUpdateFormSchema = communitySchema.extend({
  communityId: z.uuid("Community ID is required for update"),
});

export type CommunityCreateFormValues = z.infer<typeof communityCreateFormSchema>;
export type CommunityUpdateFormValues = z.infer<typeof communityUpdateFormSchema>;
export type PricingTierValues = z.infer<typeof pricingTierSchema>;
