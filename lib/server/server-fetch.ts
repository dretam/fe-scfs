import { BACKEND_URL } from "../config-const"
import { getAccessToken } from "./server-auth"
import { ApiResponse } from "./server-response"


interface ServerFetchOptions extends RequestInit {
  withAuth?: boolean
}

export async function serverFetch<T>(
  endpoint: string,
  options?: ServerFetchOptions
): Promise<ApiResponse<T>> {

  const headers = new Headers(options?.headers)

  headers.set("Content-Type", "application/json")

  if (options?.withAuth) {
    const token = await getAccessToken()

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
  }

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  })

  return res.json()
}