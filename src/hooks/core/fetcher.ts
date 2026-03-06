export async function swrFetcher<T>(
    promise: Promise<T | any>
): Promise<T> {
    const result = await promise

    if ("data" in result) {
        return result
    }

    const error = new Error()

    if ("status" in result) {
        error.name = result.status?.toString().trim()
        error.message = result.message
    }

    throw error
}
