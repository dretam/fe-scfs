"use client";

import { useReadHook } from "@/hooks/core/use-read";
import { getRetrieveInternalUser } from "../service";

import { InternalUserResponse } from "../types";


export function useInternalUserRetrieve(username: string) {
  return useReadHook<InternalUserResponse>({
    queryKey: ["internal-user", username],
    apiCall: () =>
      getRetrieveInternalUser({ username }),
    enabled: username.length >= 3, // prevent empty calls
  });
}
