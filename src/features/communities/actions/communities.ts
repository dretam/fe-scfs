"use server"

import {
  createCommunity,
  updateCommunity,
  deleteCommunity
} from "../service";

import {
  CommunityCreateActionFormData,
  CommunityDeleteActionFormData,
  CommunityResponse
} from "../types";

import { Result } from "@/types/response";

/**
 * CREATE
 */
export async function communityCreateAction(
  formData: CommunityCreateActionFormData
): Promise<Result<CommunityResponse>> {
  return createCommunity(formData);
}

/**
 * UPDATE
 */
export async function communityUpdateAction(
  formData: CommunityCreateActionFormData
): Promise<Result<CommunityResponse>> {
  if (!formData.communityId) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Community ID is required"
      }
    };
  }

  return updateCommunity({
    ...formData,
    communityId: formData.communityId
  });
}

/**
 * DELETE
 */
export async function communityDeleteAction(
  formData: CommunityDeleteActionFormData
): Promise<Result<CommunityResponse>> {
  if (!formData.communityId) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Community ID is required"
      }
    };
  }

  return deleteCommunity({
    communityId: formData.communityId
  });
}