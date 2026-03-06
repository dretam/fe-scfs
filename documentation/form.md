# bulk deposito form

## 1. data utama deposito

* cif (text, required)
* namaNasabah (text, readonly, required)
* sumberDana (select, required)
* rekeningSumberDana (select, required)
* availBalanceRekeningSumber (number, readonly, required)
* mataUang (select/readonly, required)
* kodeProduk (select, required)
* namaProduk (text, readonly, required)
* tenor (text/number, readonly, required)
* jenisPerpanjangan (select, required)
* nominal (currency/number, required)
* buktiPenempatanDeposito (text, readonly, required)
* effectiveDate (date, required)

## 2. pembayaran bunga

* metodeBunga (select, required)
* noRekeningTujuanBunga (text, conditional)
* bankTujuanBunga (select, conditional)
* namaPenerimaBunga (text, conditional)
* remarkBungaPembayaran (text, optional, max 40 char)
* jenisTransferBunga (select, conditional)
* jenisTransaksiSKNBunga (select, conditional)
* jenisTransaksiRTGSBunga (select, conditional)
* jenisNasabahPenerimaBunga (select, conditional)
* statusKependudukanPenerimaBunga (select, conditional)
* alamatPenerimaBunga (textarea, conditional)

## 3. pembayaran pokok

* metodePokok (select, required)
* noRekeningTujuanPokok (text, required)
* bankTujuanPokok (select, conditional)
* namaPenerimaPokok (text, required)
* remarkPokok (text, optional, max 40 char)

## 4. rate

* totalBunga (number, 4 decimal, required)
* approverBunga (select, conditional)
* namaApprover (select, conditional)
* remarkSpecialRate (text, optional, max 40 char)
* sebagaiAlternate (checkbox, optional)

## 5. automatic transfer

* automaticTransfer (select: N/Y/S, conditional)
* transferBungaDanPokok (select, conditional)
* transferBunga (select, conditional)
* transferPokok (select, conditional)
* jenisTransaksiSKNPokok (select, conditional)
* jenisTransaksiRTGSPokok (select, conditional)
* biayaTransfer (select: Y/N, conditional)
* biayaMaterai (select: Y/N, conditional)

## 6. batch summary

* jumlahRekening (number, readonly)
* jumlahNominal (currency, readonly)

## 7. buttons

* addToList (button)
* submit (button)
* kembali (button)
