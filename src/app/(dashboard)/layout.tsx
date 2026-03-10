"use client";

import React from "react";
import SidebarAppWrapper from "@/components/sidebar/app-wrapper";
import { AuthSessionProvider } from "../__provider/auth-provider";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <SidebarAppWrapper>{children}</SidebarAppWrapper>;
    </AuthSessionProvider>
  );
}
