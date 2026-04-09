'use client';

import { ReactNode } from "react";


import {
  FileText,
  Clock,
  DollarSign,
  Wallet,
  AlertCircle,
} from "lucide-react";
import { TopNavbar } from "@/components/topbar/TopNavBar";
import { SummaryCard } from "@/components/layout/summaryCard";
import { TabsNav } from "@/components/topbar/TabsNav";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/40 p-6">

      <TopNavbar />

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <SummaryCard title="Total Pembiayaan" value="0" icon={<FileText size={18} />} color="orange" />
        <SummaryCard title="Menunggu Review" value="0" icon={<Clock size={18} />} color="yellow" />
        <SummaryCard title="Total Nilai" value="Rp 0" icon={<DollarSign size={18} />} color="green" />
        <SummaryCard title="Total Dicairkan" value="Rp 0" icon={<Wallet size={18} />} color="blue" />
        <SummaryCard title="Outstanding" value="Rp 0" icon={<AlertCircle size={18} />} color="red" />
      </div>

      {/* Tabs */}
      <TabsNav>
        {children}
      </TabsNav>

    </div>
  );
}