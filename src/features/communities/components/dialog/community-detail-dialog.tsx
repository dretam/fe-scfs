"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useCommunityRetrieve } from "../../hooks";
import {
  PRODUCT_TYPE_OPTIONS,
  RECOURSE_OPTIONS,
  HOLIDAY_TREATMENT_OPTIONS,
  TRANSACTION_FEE_TYPE_OPTIONS,
  INTEREST_TYPE_OPTIONS,
  INTEREST_BASIS_OPTIONS,
  EARLY_PAYMENT_FEE_TYPE_OPTIONS,
  PRICING_TIER_LOGIC_OPTIONS,
} from "../../constants";

interface CommunitiesDetailInfoDialogProps {
  onEdit?: () => void;
  selectedCommunityId?: string;
}

export function CommunityDetailDialog({
  onEdit,
  selectedCommunityId,
}: CommunitiesDetailInfoDialogProps) {
  const { data: singleCommunity, isLoading } = useCommunityRetrieve(
    { communityId: selectedCommunityId ?? "" },
    { enabled: !!selectedCommunityId },
  );

  if (isLoading) {
    return <div className="p-10 text-center">Fetching community details...</div>;
  }

  if (!singleCommunity?.data) {
    return <div className="p-10 text-center">No community data found.</div>;
  }

  const community = singleCommunity.data;

  // Helper function to get label from value
  const getLabel = (options: Array<{ value: string; label: string }>, value: string) => {
    return options.find(opt => opt.value === value)?.label || value;
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto px-4">
      {/* Header with Edit Button */}
      <div className="flex justify-end">
        <Button onClick={onEdit} variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit Community
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">General Information</h3>

          <div>
            <p className="text-sm font-medium text-gray-500">Community Name</p>
            <p className="mt-1">{community.name || "-"}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="mt-1">{community.description || "-"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Product Type</p>
              <p className="mt-1">
                {getLabel(PRODUCT_TYPE_OPTIONS, community.productType)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Recourse</p>
              <p className="mt-1">
                {getLabel(RECOURSE_OPTIONS, community.recourse)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Holiday Treatment</p>
              <p className="mt-1">
                {getLabel(HOLIDAY_TREATMENT_OPTIONS, community.holidayTreatment)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Interest Type</p>
              <p className="mt-1">
                {getLabel(INTEREST_TYPE_OPTIONS, community.interestType)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Interest Basis</p>
            <p className="mt-1">
              {getLabel(INTEREST_BASIS_OPTIONS, community.interestBasis)}
            </p>
          </div>
        </div>

        {/* Financial Settings Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Financial Settings</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Fee Type</p>
              <p className="mt-1">
                {getLabel(TRANSACTION_FEE_TYPE_OPTIONS, community.transactionFeeType)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Transaction Fee</p>
              <p className="mt-1">
                {community.transactionFee !== undefined ? community.transactionFee : "-"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Min. Financing</p>
              <p className="mt-1">
                {community.minFinancing !== undefined ? community.minFinancing : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Max. Financing</p>
              <p className="mt-1">
                {community.maxFinancing !== undefined ? community.maxFinancing : "-"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Min. Tenor (Days)</p>
              <p className="mt-1">
                {community.minTenor !== undefined ? community.minTenor : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Max. Tenor (Days)</p>
              <p className="mt-1">
                {community.maxTenor !== undefined ? community.maxTenor : "-"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Grace Period (Days)</p>
              <p className="mt-1">
                {community.gracePeriod !== undefined ? community.gracePeriod : "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Penalty Rate (%)</p>
              <p className="mt-1">
                {community.penaltyRate !== undefined ? community.penaltyRate : "-"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Early Payment Fee Type</p>
              <p className="mt-1">
                {getLabel(EARLY_PAYMENT_FEE_TYPE_OPTIONS, community.earlyPaymentFeeType)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Early Payment Fee Amount</p>
              <p className="mt-1">
                {community.earlyPaymentFeeAmount !== undefined ? community.earlyPaymentFeeAmount : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flags & Options Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Flags & Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <p className="text-sm font-medium">Active Status</p>
            <p className="text-sm">
              {community.isActive ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <p className="text-sm font-medium">Interest Reserve</p>
            <p className="text-sm">
              {community.isInterestReserve ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <p className="text-sm font-medium">Fund Reserve</p>
            <p className="text-sm">
              {community.isFundReserve ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <p className="text-sm font-medium">Sharing Income</p>
            <p className="text-sm">
              {community.isSharingIncome ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <p className="text-sm font-medium">Extend Financing</p>
            <p className="text-sm">
              {community.isExtendFinancing ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Tiers Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pricing Tiers</h3>

        {community.pricingTiers && community.pricingTiers.length > 0 ? (
          community.pricingTiers.map((tier: any, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Comparison Logic</p>
                  <p className="mt-1">
                    {getLabel(PRICING_TIER_LOGIC_OPTIONS, tier.logic)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nominal Value</p>
                  <p className="mt-1">{tier.nominal !== undefined ? tier.nominal : "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantity Value</p>
                  <p className="mt-1">{tier.quantity !== undefined ? tier.quantity : "-"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No pricing tiers defined</p>
        )}
      </div>
    </div>
  );
}