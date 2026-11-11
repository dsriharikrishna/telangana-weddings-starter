"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/data-table";
import { ShieldCheck, Download, DollarSign, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";
import { VendorMetricCard } from "@/components/ui/vendor-metric-card";

interface PaymentRecord {
  id: string;
  txnId: string;
  bookingRef: string;
  customerName: string;
  amount: number;
  paymentType: "Advance Token" | "Final Settlement" | "Stage Advance";
  paymentMethod: "UPI" | "Direct Bank" | "Cash on Verification";
  date: string;
  status: "settled" | "processing";
}

const SAMPLE_PAYMENTS: PaymentRecord[] = [
  {
    id: "tx-1",
    txnId: "TXN-UPI-992140",
    bookingRef: "BK-TEL-4410",
    customerName: "Ramesh Reddy",
    amount: 30000,
    paymentType: "Advance Token",
    paymentMethod: "UPI",
    date: "08 Nov 2026",
    status: "settled"
  },
  {
    id: "tx-2",
    txnId: "TXN-BNK-881204",
    bookingRef: "BK-TEL-4392",
    customerName: "Venkat Goud",
    amount: 15000,
    paymentType: "Advance Token",
    paymentMethod: "Direct Bank",
    date: "04 Nov 2026",
    status: "settled"
  },
  {
    id: "tx-3",
    txnId: "TXN-UPI-773319",
    bookingRef: "BK-TEL-4388",
    customerName: "Mallikarjun Swamy",
    amount: 60000,
    paymentType: "Stage Advance",
    paymentMethod: "UPI",
    date: "29 Oct 2026",
    status: "settled"
  },
  {
    id: "tx-4",
    txnId: "TXN-CSH-550122",
    bookingRef: "BK-TEL-4350",
    customerName: "Anand Kurva",
    amount: 65000,
    paymentType: "Final Settlement",
    paymentMethod: "Cash on Verification",
    date: "12 Oct 2026",
    status: "settled"
  }
];

export default function VendorPaymentsPage() {
  const columns: Column<PaymentRecord>[] = [
    {
      header: "Transaction ID",
      accessorKey: "txnId",
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-[#762B46]">{row.txnId}</span>
          <div className="text-[11px] text-[#78716C]">{row.date}</div>
        </div>
      )
    },
    {
      header: "Booking & Customer",
      accessorKey: "customerName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-[#292524]">{row.customerName}</div>
          <div className="font-mono text-[10px] text-[#762B46]">{row.bookingRef}</div>
        </div>
      )
    },
    {
      header: "Type & Mode",
      accessorKey: "paymentType",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-[#292524]">{row.paymentType}</div>
          <div className="text-[11px] text-[#57534E]">{row.paymentMethod}</div>
        </div>
      )
    },
    {
      header: "Amount",
      accessorKey: "amount",
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-emerald-800 text-sm">
          +₹{row.amount.toLocaleString("en-IN")}
        </span>
      )
    },
    {
      header: "Settlement",
      accessorKey: "status",
      sortable: true,
      cell: (row) => (
        <Badge variant={row.status === "settled" ? "success" : "secondary"}>
          100% Settled
        </Badge>
      )
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Reusable Header */}
      <VendorPageHeader
        title="Payments & Direct Settlements"
        subtitle="100% vendor payout transparency with zero broker or platform commission deductions"
      >
        <Button variant="secondary" size="sm" className="gap-1.5">
          <Download className="w-3.5 h-3.5" />
          <span>Export Ledger</span>
        </Button>
      </VendorPageHeader>

      {/* Financial Metric Cards using Reusable VendorMetricCard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VendorMetricCard
          label="Total Revenue Collected"
          value="₹6,00,000"
          trend="100% Retained by Vendor"
          icon={DollarSign}
          variant="crimson"
        />
        <VendorMetricCard
          label="Platform Commission"
          value="₹0.00"
          trend="Zero Commission Pilot"
          icon={ShieldCheck}
          variant="gold"
        />
        <VendorMetricCard
          label="Settlement Method"
          value="Direct P2P"
          sublabel="Direct UPI, Bank & Cash"
          icon={Wallet}
          variant="emerald"
        />
      </div>

      {/* Settlements Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#292524] uppercase tracking-wider">
          Transaction Records
        </h2>
        <DataTable
          data={SAMPLE_PAYMENTS}
          columns={columns}
          searchKey="customerName"
          searchPlaceholder="Search customer or transaction ref..."
          pageSize={10}
        />
      </div>
    </div>
  );
}
