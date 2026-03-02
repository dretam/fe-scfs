import type { Metadata } from "next";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/app/redux-provider";
import ThemeProvider from "@/app/theme-provider";
import QueryProvider from "./query-provider";

export const metadata: Metadata = {
  title: "Dashboard TMG",
  description: "Bank Mega Corporate System Frontend Starter Kit",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ReduxProvider>
              {children}
              <Toaster />
            </ReduxProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
