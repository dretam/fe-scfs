'use client';

import { ReactNode } from "react";
import {
  FileText,
  Clock,
  DollarSign,
  Wallet,
  AlertCircle,
} from "lucide-react";
import { SummaryCard } from "@/components/layout/summaryCard";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* 🔹 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">
            SCF Dashboard - Bank
          </h1>
          <p className="text-sm text-gray-500">
            Selamat datang, Admin
          </p>
        </div>

        <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
          Logout
        </button>
      </div>

      {/* 🔹 SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <SummaryCard title="Total Pembiayaan" value="0" icon={<FileText size={18} />} color="orange" />
        <SummaryCard title="Menunggu Review" value="0" icon={<Clock size={18} />} color="yellow" />
        <SummaryCard title="Total Nilai" value="Rp 0" icon={<DollarSign size={18} />} color="green" />
        <SummaryCard title="Total Dicairkan" value="Rp 0" icon={<Wallet size={18} />} color="blue" />
        <SummaryCard title="Outstanding" value="Rp 0" icon={<AlertCircle size={18} />} color="red" />
      </div>

      {/* 🔹 TABS */}
      <div className="flex gap-2 border-b mb-4 overflow-x-auto">
        {[
          "Daftar Pembiayaan",
          "Company",
          "User Management",
          "Community Management",
          "Calendar Settings",
          "Email Settings",
        ].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 ${
              i === 2
                ? "border-orange-500 text-orange-500 font-medium"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔹 CONTENT AREA */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        {children}
      </div>

    </div>
  );
}