import z from "zod";

export const passwordValidation = z.string()
    .min(8, { message: "Password must be between 8 and 100 characters" })
    .max(100, { message: "Password must be between 8 and 100 characters" })
    .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,
        {
            message: "Password must contain at least one digit, one lowercase, one uppercase, and one special character"
        }
    );

export const emailValidation = z.string()
    .includes("@", { message: "Email is invalid" });