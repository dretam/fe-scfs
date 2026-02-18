export interface UseReadHook<T> {
	response: T | undefined,
	isLoading: boolean,
	isError: boolean
}