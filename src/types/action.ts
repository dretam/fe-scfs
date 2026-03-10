import { UserEntity } from "@/features/user";
import { Result } from "./response";

export interface AuthLoginAction {
	status: number;
	isSuccess: boolean;
	user: UserEntity | null;
}

export type TransactionAction<T> = Result<T>