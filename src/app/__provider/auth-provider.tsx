"use client";

import { useEffect } from "react";
import { useSession } from "@/features/auth";
import { useAppDispatch } from "@/hooks/store/use-app-dispatch";
import { useAppSelector } from "@/hooks/store/use-app-selector";
import {
  setUser,
  setAuthData,
  selectPermissions,
  selectMenus,
  selectUser,
} from "@/stores/entity/auth.store";

interface AuthSessionProviderProps {
  children: React.ReactNode;
}

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const permissions = useAppSelector(selectPermissions);
  const menus = useAppSelector(selectMenus);

  const hasSession =
    user?.id !== null && permissions.length > 0 && menus.length > 0;

  const { data, isLoading, isError } = useSession(
    "role,menus,permissions",
    hasSession,
  );

  useEffect(() => {
    if (hasSession) return;
    if (!data?.success || !data.data) return;

    const session = data.data;

    dispatch(
      setUser({
        id: session.id,
        name: session.name,
        email: session.email,
        role: {
          id: session.role.id,
          name: session.role.name,
          icon: null,
          description: null,
        },
      }),
    );

    dispatch(
      setAuthData({
        permissions: session.role.permissions ?? [],
        menus: session.role.menus ?? [],
      }),
    );
  }, [data, dispatch, hasSession]);

  if (isLoading && !hasSession) {
    return null;
  }

  if (isError && !hasSession) {
    return null;
  }

  return <>{children}</>;
}
