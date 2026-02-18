import { z } from "zod";

export function authLoginFormSchema() {
	return z.object({
		username: z.string().min(1, {
			message: "Username is required",
		}),
		password: z.string().min(1, {
			message: "Password is required",
		}),
		rememberMe: z.boolean(),
	});
}

export function userChangePasswordFormSchema() {
	return z
		.object({
			userId: z.number().refine(v => v > 0, "Invalid user"),
			existingPassword: z.string().min(1, {
				message: "Existing Password is required",
			}),
			newPassword: z.string().min(1, {
				message: "New Password is required",
			}),
			retypeNewPassword: z.string().min(1, {
				message: "Retype password is required",
			}),
		})
		.refine((arg) => arg.retypeNewPassword === arg.newPassword, {
			message: "Retype New Password does not match from New Password",
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
		email: z.string().email({
			message: "Email is Required",
		}),
	});
}
