import {UserEntity} from "@/types/entity";

export interface AuthLoginAction {
	status: number;
	isSuccess: boolean;
	user: UserEntity | null;
}

export interface TransactionAction<T> {
	isSuccess: boolean;
	response: T;
}