"use client";

import { uploadDocumentAction } from "@/features/document/api/document";
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { FileIcon, Trash2Icon } from "lucide-react";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { OCRDataEntity } from "@/features/ocr-data/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BulkDepositoOcrForm,
  BulkDepositoOcrFormValues,
  sumberDanaOptions,
  rekeningSumberDanaOptions,
  mataUangOptions,
  kodeProdukOptions,
  jenisPerpanjanganOptions,
  metodeBungaOptions,
  bankTujuanBungaOptions,
  jenisTransferBungaOptions,
  jenisTransaksiSKNBungaOptions,
  jenisTransaksiRTGSBungaOptions,
  jenisNasabahPenerimaBungaOptions,
  statusKependudukanPenerimaBungaOptions,
  metodePokokOptions,
  bankTujuanPokokOptions,
  approverBungaOptions,
  namaApproverOptions,
  automaticTransferOptions,
  transferBungaDanPokokOptions,
  transferBungaOptions,
  transferPokokOptions,
  jenisTransaksiSKNPokokOptions,
  jenisTransaksiRTGSPokokOptions,
  biayaTransferOptions,
  biayaMateraiOptions,
  FormActions,
  BatchSummaryForm,
} from "@/features/ocr-data/components/form";
import { useForm, FormProvider } from "react-hook-form";

export function PageDocumentDataTable() {
  const [isPending, startTransition] = useTransition();
  const [ocrData, setOcrData] = useState<OCRDataEntity[] | null>(null);

  const form = useForm<BulkDepositoOcrFormValues>({
    defaultValues: {
      cif: "",
      namaNasabah: "",
      sumberDana: "",
      rekeningSumberDana: "",
      availBalanceRekeningSumber: 0,
      mataUang: "",
      kodeProduk: "",
      namaProduk: "",
      tenor: "",
      jenisPerpanjangan: "",
      nominal: 0,
      buktiPenempatanDeposito: "",
      effectiveDate: "",
      metodeBunga: "",
      noRekeningTujuanBunga: "",
      bankTujuanBunga: "",
      namaPenerimaBunga: "",
      remarkBungaPembayaran: "",
      jenisTransferBunga: "",
      jenisTransaksiSKNBunga: "",
      jenisTransaksiRTGSBunga: "",
      jenisNasabahPenerimaBunga: "",
      statusKependudukanPenerimaBunga: "",
      alamatPenerimaBunga: "",
      metodePokok: "",
      noRekeningTujuanPokok: "",
      bankTujuanPokok: "",
      namaPenerimaPokok: "",
      remarkPokok: "",
      totalBunga: 0,
      approverBunga: "",
      namaApprover: "",
      remarkSpecialRate: "",
      sebagaiAlternate: false,
      automaticTransfer: "",
      transferBungaDanPokok: "",
      transferBunga: "",
      transferPokok: "",
      jenisTransaksiSKNPokok: "",
      jenisTransaksiRTGSPokok: "",
      biayaTransfer: "",
      biayaMaterai: "",
      jumlahRekening: 0,
      jumlahNominal: 0,
    },
  });

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.ms-excel": [".xls"],
      },
      maxSize: 100 * 1024 * 1024,
      maxFiles: 1, // Changed to max 1 file
    },
  });

  const handleAddToList = () => {
    form.watch();
    toast.info("Added to list (placeholder action)");
  };

  const handleKembali = () => {
    form.reset();
    toast.info("Form reset");
  };

  const handleSubmit = () => {
    if (dropzone.fileStatuses.length === 0) {
      toast.error("Please select a file");
      return;
    }

    startTransition(async () => {
      const fileStatus = dropzone.fileStatuses[0]; // Only one file
      const file = fileStatus.file;

      const toastId = toast.loading(`Uploading ${file.name}...`);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadDocumentAction(formData);

        if (!result.success) {
          toast.error(`Failed: ${file.name}`, { id: toastId });
          return;
        }

        toast.success(`Uploaded: ${file.name}`, { id: toastId });

        setOcrData(result.data as OCRDataEntity[]);
      } catch {
        toast.error(`Unexpected error: ${file.name}`, { id: toastId });
      }
    });
  };
  return (
    <div className="flex flex-col justify-start items-start gap-4 p-5">


      <Dropzone {...dropzone}>
        <div className="max-w-xl">
          <div className="flex justify-between">
            <DropzoneDescription>
              Please select one document (PDF, Excel, DOCX)
            </DropzoneDescription>
            <DropzoneMessage />
          </div>

          <DropZoneArea>
            <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
              <FileIcon className="size-8" />
              <div>
                <p className="font-semibold">Upload document</p>
                <p className="text-sm text-muted-foreground">
                  Click here or drag and drop to upload
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </div>

        <DropzoneFileList className="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-md bg-secondary p-4 shadow-sm"
              key={file.id}
              file={file}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <FileIcon className="size-6 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm">{file.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <DropzoneRemoveFile
                  variant="ghost"
                  className="shrink-0 hover:outline"
                >
                  <Trash2Icon className="size-4" />
                </DropzoneRemoveFile>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isPending || dropzone.fileStatuses.length === 0}
        className="w-fit"
      >
        {isPending ? "Uploading..." : "Scan Document"}
      </Button>

      {/* Bulk Deposito OCR Form - placed above Dropzone */}
      <FormProvider {...form}>
        <BulkDepositoOcrForm
          form={form}
          showConditionalFields={true}
          sumberDanaOptions={sumberDanaOptions}
          rekeningSumberDanaOptions={rekeningSumberDanaOptions}
          mataUangOptions={mataUangOptions}
          kodeProdukOptions={kodeProdukOptions}
          jenisPerpanjanganOptions={jenisPerpanjanganOptions}
          metodeBungaOptions={metodeBungaOptions}
          bankTujuanBungaOptions={bankTujuanBungaOptions}
          jenisTransferBungaOptions={jenisTransferBungaOptions}
          jenisTransaksiSKNBungaOptions={jenisTransaksiSKNBungaOptions}
          jenisTransaksiRTGSBungaOptions={jenisTransaksiRTGSBungaOptions}
          jenisNasabahPenerimaBungaOptions={jenisNasabahPenerimaBungaOptions}
          statusKependudukanPenerimaBungaOptions={statusKependudukanPenerimaBungaOptions}
          metodePokokOptions={metodePokokOptions}
          bankTujuanPokokOptions={bankTujuanPokokOptions}
          approverBungaOptions={approverBungaOptions}
          namaApproverOptions={namaApproverOptions}
          automaticTransferOptions={automaticTransferOptions}
          transferBungaDanPokokOptions={transferBungaDanPokokOptions}
          transferBungaOptions={transferBungaOptions}
          transferPokokOptions={transferPokokOptions}
          jenisTransaksiSKNPokokOptions={jenisTransaksiSKNPokokOptions}
          jenisTransaksiRTGSPokokOptions={jenisTransaksiRTGSPokokOptions}
          biayaTransferOptions={biayaTransferOptions}
          biayaMateraiOptions={biayaMateraiOptions}
        />
      </FormProvider>

      <Button
        type="button"
        variant="secondary"
        onClick={handleAddToList}
        disabled={isPending}
      >
        {"Add to List"}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Batch Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <BatchSummaryForm form={form} />
        </CardContent>
      </Card>

      <FormActions
        onSubmit={handleSubmit}
        onKembali={handleKembali}
        isSubmitting={isPending}
      />
    </div>
  );
}
