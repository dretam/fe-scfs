"use client";

import { Loader2 } from "lucide-react";

export function LoadingDialog({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Loader2 className="animate-spin h-8 w-8" />

      <p className="text-sm text-muted-foreground">
        {message ?? "Processing..."}
      </p>
    </div>
  );
}
