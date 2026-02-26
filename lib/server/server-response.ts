
import {
  BadRequestResponse,
  ReadResponse,
  UnauthorizedResponse,
} from "@/types/response"

export type ApiResponse<T> =
  | ReadResponse<T>
  | UnauthorizedResponse
  | BadRequestResponse

export function handleServerResponse<T>(
  response: ApiResponse<T>
): ReadResponse<T> {
  if ("data" in response) {
    return response
  }

  const error = new Error()

  if ("status" in response) {
    error.name = response.status.toString()
    error.message =
      typeof response.message === "string"
        ? response.message
        : JSON.stringify(response.message)
  }

  throw error
}