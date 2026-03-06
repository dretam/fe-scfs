"use client";

import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onSubmit?: () => void;
  onKembali?: () => void;
  showAddToList?: boolean;
  showSubmit?: boolean;
  showKembali?: boolean;
  addToListLabel?: string;
  submitLabel?: string;
  kembaliLabel?: string;
  isSubmitting?: boolean;
}

export function FormActions({
  onSubmit,
  onKembali,
  showAddToList = true,
  showSubmit = true,
  showKembali = true,
  addToListLabel = "Add to List",
  submitLabel = "Submit",
  kembaliLabel = "Kembali",
  isSubmitting = false,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      {showKembali && (
        <Button
          type="button"
          variant="outline"
          onClick={onKembali}
          disabled={isSubmitting}
        >
          {kembaliLabel}
        </Button>
      )}


      {showSubmit && (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
      )}
    </div>
  );
}
