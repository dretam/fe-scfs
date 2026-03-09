import { UserEntity } from "@/types/entity";
import { Result } from "./response";

export interface AuthLoginAction {
	status: number;
	isSuccess: boolean;
	user: UserEntity | null;
}

export type TransactionAction<T> = Result<T>