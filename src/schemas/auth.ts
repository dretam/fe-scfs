import { z } from "zod";
import { passwordValidation } from "./validation";

export function authLoginFormSchema() {
	return z.object({
		username: z.string().min(1, "Username is required"),
		password: z.string().min(1, "Password is required"),
		rememberMe: z.boolean(),
	});
}

export function userChangePasswordFormSchema() {
	return z
		.object({
			userId: z.number().refine(v => v > 0, "Invalid user"),
			existingPassword: z.string().min(1, "Existing password is required"),
			newPassword: passwordValidation,
			retypeNewPassword: passwordValidation,
		})
		.refine((arg) => arg.retypeNewPassword === arg.newPassword, {
			message: "Retype New Password does not match New Password",
			path: ["retypeNewPassword"],
		});
}

export function userChangeProfileFormSchema() {
	return z.object({
		userId: z.number().nullable().refine(v => v !== null && v > 0, {
			message: "Invalid user",
		}),
		name: z.string().min(1, {
			message: "Name is Required",
		}),
		email: z.email({
			message: "Email is Required",
		}),
	});
}
