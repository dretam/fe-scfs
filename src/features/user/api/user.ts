"use server";

import {
  UserChangePasswordActionFormData,
  UserChangeProfileActionFormData,
  UserCreateActionFormData,
  UserDeleteActionFormData
} from "../types";


import {
  putUser,
  createUser,
  softDeleteUser,
  hardDeleteUser
} from "../service";

import { UserResponse, UserEntity } from "../types";
import { Result } from "@/types/response";



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
export async function userDeleteAction(
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
export async function userDestroyAction(
  userId: number
): Promise<Result<{ id: number }>> {

  return hardDeleteUser(userId);
}
