"use client";

import { useReadHook } from "../core/use-read";
import { getRetrieveInternalUser } from "@/data/internal-user";
import { InternalUserResponse } from "@/types/response";

export function useInternalUserRetrieve(username: string) {
  return useReadHook<InternalUserResponse>({
    queryKey: ["internal-user", username],
    apiCall: () =>
      getRetrieveInternalUser({ username }),
    enabled: username.length >= 3, // prevent empty calls
  });
}