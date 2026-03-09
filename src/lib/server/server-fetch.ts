import { cookies } from "next/headers"
import { BACKEND_URL, COOKIE_ACCESS_TOKEN } from "@/lib/config-const"
import { Result } from "@/types/response"


interface FetchOptions extends RequestInit {
  withAuth?: boolean
}

class ServerHttp {

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<Result<T>> {

    const { withAuth = false, ...fetchOptions } = options
    const cookieStore = await cookies()

    if (withAuth && !cookieStore.has(COOKIE_ACCESS_TOKEN)) {
      return {
        success: false,
        data: null,
        error: {
          status: 401,
          message: "Unauthorized"
        }
      }
    }

    const token = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value
    const headers = new Headers(fetchOptions.headers)

    if (!(fetchOptions.body instanceof FormData)) {
      headers.set("Content-Type", "application/json")
    }

    if (withAuth && token) {
      headers.set("Authorization", `Bearer ${token}`)
    }


    console.log(`[ServerHttp] Fetching: ${BACKEND_URL}${endpoint}`);
    const response = await fetch(
      `${BACKEND_URL}${endpoint}`,
      {
        ...fetchOptions,
        headers,
      }
    ).catch(err => {
      console.error(`[ServerHttp] Fetch failed for ${endpoint}:`, err);
      throw err;
    });

    console.log(`[ServerHttp] Status: ${response.status} for ${endpoint}`);

    const data = await response
      .json()
      .catch(() => null)

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: {
          status: response.status,
          message: data?.message ?? "Something went wrong"
        }
      }
    }

    return {
      success: true,
      ...data
    }
  }

  async get<T>(
    endpoint: string,
    options?: FetchOptions
  ) {
    return this.request<T>(endpoint, {
      method: "GET",
      ...options,
    })
  }

  async post<T>(
    endpoint: string,
    body?: any,
    options?: FetchOptions
  ) {
    let requestBody;
    if (!(body instanceof FormData)) {
      requestBody = body ? JSON.stringify(body) : undefined;
    } else {
      requestBody = body || undefined;
    }

    return this.request<T>(endpoint, {
      method: "POST",
      body: requestBody,
      ...options,
    })
  }

  async put<T>(
    endpoint: string,
    body?: any,
    options?: FetchOptions
  ) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    })
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    options?: FetchOptions
  ) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    })
  }

  async delete<T>(
    endpoint: string,
    options?: FetchOptions
  ) {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    })
  }
}

export const serverHttp = new ServerHttp()