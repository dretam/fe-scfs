import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {SortingState} from "@tanstack/react-table"
import {BadRequestResponse, UnauthorizedResponse} from "@/types/response";

type Keys<T> = keyof T & string

type FieldMapper<T> = Partial<Record<Keys<T>, string>>

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function pathRemoveLocale(path: string, locales = ["en", "id"]) {
	const regex = new RegExp(`^/(${locales.join("|")})(/|$)`);
	return path.replace(regex, "/");
}

export function unauthorizedResponse(): UnauthorizedResponse {
	return {
		status: 401,
		message: "Not authorized"
	}
}

export function badRequestResponse(response: any): BadRequestResponse {
	return response;
}

export function toBackendSort<T>(
	sorting: SortingState,
	mapper?: FieldMapper<T>
): string | null {

	if (!sorting.length) return null

	const {id, desc} = sorting[0]

	// id dari tanstack pasti string
	let field = id as Keys<T>

	// kalau ada mapping custom pakai itu
	const mapped = mapper?.[field]

	const finalField = mapped ?? field

	return desc ? `-${finalField}` : finalField
}

const SORT_MAPPER = {
	createdAt: "audit.createdAt",
} as const

export function reverseMapper(value: string): string {
	const entry = Object.entries(SORT_MAPPER).find(
		([, backend]) => backend === value
	)
	return entry ? entry[0] : value
}


