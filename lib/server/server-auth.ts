import { cookies } from "next/headers"
import { COOKIE_ACCESS_TOKEN } from "../config-const"

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_ACCESS_TOKEN)?.value ?? null
}