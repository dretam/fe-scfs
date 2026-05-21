"use client";

import { useEffect } from "react";
import { useForm, Resolver, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  communityCreateFormSchema,
  communityUpdateFormSchema,
  CommunityCreateFormValues,
} from "../../schemas";
import { useCommunityRetrieve } from "../../hooks";
import { Plus, Trash2 } from "lucide-react";
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

interface CommunitiesFormDialogProps {
  resolve: (values?: CommunityCreateFormValues) => void;
  isEdit?: boolean;
  selectedCommunityId?: string;
}

export function CommunitiesFormDialog({
  resolve,
  isEdit = false,
  selectedCommunityId,
}: CommunitiesFormDialogProps) {
  const { data: singleCommunity, isLoading: isLoadingEdit } =
    useCommunityRetrieve(
      { communityId: selectedCommunityId ?? "" },
      { enabled: isEdit && !!selectedCommunityId },
    );

  const form = useForm<CommunityCreateFormValues>({
    resolver: zodResolver(
      isEdit ? communityUpdateFormSchema : communityCreateFormSchema,
    ) as Resolver<CommunityCreateFormValues>,
    defaultValues: {
      name: "",
      description: "",
      productType: "FACTORING",
      recourse: "WITH_RECOURSE",
      holidayTreatment: "NEXT_BUSINESS_DAYS",
      transactionFeeType: "AMOUNT",
      interestType: "TIERING",
      interestBasis: "CASH_BASIS",
      isActive: true,
      isInterestReserve: false,
      isFundReserve: false,
      isSharingIncome: false,
      isExtendFinancing: false,
      transactionFee: 0,
      minFinancing: 0,
      maxFinancing: 0,
      minTenor: 0,
      maxTenor: 0,
      gracePeriod: 0,
      penaltyRate: 0,
      earlyPaymentFeeType: "PERCENT",
      earlyPaymentFeeAmount: 0,
      pricingTiers: [{ logic: "LT", nominal: 0, quantity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pricingTiers",
  });

  useEffect(() => {
    if (singleCommunity?.data) {
      form.reset({
        ...singleCommunity.data,
        pricingTiers: singleCommunity.data.pricingTiers || [
          { logic: "LT", nominal: 0, quantity: 0 },
        ],
      });
    }
  }, [singleCommunity, form]);

  const onSubmit = (values: CommunityCreateFormValues) => {
    resolve(values);
  };

  if (isEdit && isLoadingEdit) {
    return (
      <div className="p-10 text-center">Fetching community details...</div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-h-[80vh] overflow-y-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">General Information</h3>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter community name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Enter description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRODUCT_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recourse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recourse</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recourse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RECOURSE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="holidayTreatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Holiday Treatment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select treatment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {HOLIDAY_TREATMENT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interestType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interest type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INTEREST_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="interestBasis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Basis</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interest basis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INTEREST_BASIS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Settings</h3>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="transactionFeeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TRANSACTION_FEE_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Fee</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minFinancing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min. Financing</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxFinancing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max. Financing</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minTenor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min. Tenor (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxTenor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max. Tenor (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gracePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grace Period (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="penaltyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penalty Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="earlyPaymentFeeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Early Payment Fee Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EARLY_PAYMENT_FEE_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="earlyPaymentFeeAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Early Payment Fee Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Flags & Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>Active Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isInterestReserve"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>Interest Reserve</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFundReserve"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>Fund Reserve</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSharingIncome"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>Sharing Income</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isExtendFinancing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>Extend Financing</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pricing Tiers</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ logic: "LT", nominal: 0, quantity: 0 })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Tier
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border rounded-lg p-4 space-y-4 relative"
            >
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`pricingTiers.${index}.logic`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comparison Logic</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select logic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRICING_TIER_LOGIC_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`pricingTiers.${index}.nominal`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`pricingTiers.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full">
          {isEdit ? "Update Community" : "Create Community"}
        </Button>
      </form>
    </Form>
  );
}