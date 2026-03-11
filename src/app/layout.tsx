import type { Metadata } from "next";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalDialog } from "@/components/global/dialog";
import ReduxProvider from "@/app/__provider/redux-provider";
import ThemeProvider from "@/app/__provider/theme-provider";
import QueryProvider from "./__provider/query-provider";
import { DialogProvider } from "./__provider/dialog-provider";

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
            <DialogProvider>
              <ReduxProvider>
                <GlobalDialog />
                {children}
                <Toaster richColors />
              </ReduxProvider>
            </DialogProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
