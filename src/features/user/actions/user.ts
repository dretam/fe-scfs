"use server";

import {
  ForgotPasswordResponse,
  UserByTokenChangePasswordActionFormData,
  UserChangeNewPasswordActionFormData,
  UserChangeNewPasswordResponse,
  UserChangePasswordActionFormData,
  UserChangeProfileActionFormData,
  UserCreateActionFormData,
  UserDeleteActionFormData,
  UserResponse,
  UserSendTokenChangePasswordActionFormData
} from "../types";

import {
  putUser,
  createUser,
  softDeleteUser,
  hardDeleteUser,
  sendTokenChangePass,
  changePass,
  getUserByToken
} from "../service";

import { UserEntity } from "../types";
import { Result } from "@/types/response";
import { id } from "zod/v4/locales";

/**
 * GET USER BY TOKEN CHANGE PASSWORD
 */
export async function userByTokenChangePasswordAction(
  formData: UserByTokenChangePasswordActionFormData
): Promise<Result<UserResponse>> {

  if (!formData.token) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Email is required"
      }
    };
  }

  return getUserByToken({
    id: formData.token
  });
}

/**
 * SEND TOKEN CHANGE PASSWORD
 */
export async function userSendTokenChangePasswordAction(
  formData: UserSendTokenChangePasswordActionFormData
): Promise<Result<ForgotPasswordResponse>> {

  if (!formData.email) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Email is required"
      }
    };
  }

  return sendTokenChangePass({
    email: formData.email
  });
}

/**
 * CHANGE PASSWORD (FORGOT PASSWORD)
 */
export async function userChangeNewPasswordAction(
  formData: UserChangeNewPasswordActionFormData
): Promise<Result<UserChangeNewPasswordResponse>> {

  if (!formData.id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "User ID is required"
      }
    };
  }

  return changePass({
    id: formData.id,
    forgotPasswordTokenHash: formData.forgotPasswordTokenHash,
    username: formData.username,
    oldPassword: formData.oldPassword,
    password: formData.password,
    passwordConfirmation: formData.passwordConfirmation,
  });
}

/**
 * CHANGE PASSWORD
 */
export async function userChangePasswordAction(
  formData: UserChangePasswordActionFormData
): Promise<Result<UserEntity>> {

  if (!formData.userId) {
    return {
      success: false,
      error: {
        status: 400,
        message: "User ID is required"
      }
    };
  }

  return putUser({
    id: formData.userId,
    existingPassword: formData.existingPassword,
    password: formData.newPassword
  });
}


/**
 * CHANGE PROFILE
 */
export async function userChangeProfileAction(
  formData: UserChangeProfileActionFormData
): Promise<Result<UserEntity>> {

  if (!formData.userId) {
    return {
      success: false,
      error: {
        status: 400,
        message: "User ID is required"
      }
    };
  }

  return putUser({
    id: formData.userId,
    name: formData.name,
    email: formData.email
  });
}


/**
 * CREATE
 */
export async function userCreateAction(
  formData: UserCreateActionFormData
): Promise<Result<UserEntity>> {

  return createUser({
    username: formData.username,
    password: formData.password,
    roleId: formData.roleId
  });
}


/**
 * SOFT DELETE
 */
export async function userSoftDeleteAction(
  formData: UserDeleteActionFormData
): Promise<Result<UserEntity>> {

  if (!formData.userId) {
    return {
      success: false,
      error: {
        status: 400,
        message: "User ID is required"
      }
    };
  }

  return softDeleteUser({
    id: formData.userId
  });
}


/**
 * HARD DELETE
 */
export async function userHardDeleteAction(
  userId: number
): Promise<Result<{ id: number }>> {

  return hardDeleteUser(userId);
}
