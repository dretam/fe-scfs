import { SWRConfiguration } from "swr"

export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}
