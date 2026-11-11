"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";
import { Plus, Eye, Send, FileText } from "lucide-react";

interface QuotationRecord {
  id: string;
  quotationCode: string;
  customerName: string;
  village: string;
  mandal: string;
  packageSummary: string;
  validUntil: string;
  totalEstimate: number;
  status: "pending_review" | "accepted" | "expired";
}

const SAMPLE_QUOTATIONS: QuotationRecord[] = [
  {
    id: "qt-1",
    quotationCode: "QT-2026-8812",
    customerName: "Venkat Rao",
    village: "Singaram",
    mandal: "Narayanpet",
    packageSummary: "Grand Mandapam + 2 AC Guest Suites",
    validUntil: "20 Dec 2026",
    totalEstimate: 85000,
    status: "pending_review"
  },
  {
    id: "qt-2",
    quotationCode: "QT-2026-8790",
    customerName: "Ramesh Reddy",
    village: "Appakpalle",
    mandal: "Narayanpet",
    packageSummary: "Complete Muhurtham Mandapam & Lighting",
    validUntil: "15 Dec 2026",
    totalEstimate: 120000,
    status: "accepted"
  },
  {
    id: "qt-3",
    quotationCode: "QT-2026-8755",
    customerName: "Mallikarjun Swamy",
    village: "Marikal Town",
    mandal: "Marikal",
    packageSummary: "Function Hall + Catering Utensils Combo",
    validUntil: "30 Nov 2026",
    totalEstimate: 95000,
    status: "expired"
  }
];

export default function VendorQuotationsListPage() {
  const columns: Column<QuotationRecord>[] = [
    {
      header: "Quotation Ref",
      accessorKey: "quotationCode",
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-[#762B46]">{row.quotationCode}</span>
          <div className="text-[11px] text-[#78716C]">{row.packageSummary}</div>
        </div>
      )
    },
    {
      header: "Customer & Area",
      accessorKey: "customerName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-[#292524]">{row.customerName}</div>
          <div className="text-[11px] text-[#78716C]">{row.village}, {row.mandal}</div>
        </div>
      )
    },
    {
      header: "Valid Until",
      accessorKey: "validUntil",
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-[#57534E] font-medium">{row.validUntil}</span>
      )
    },
    {
      header: "Total Estimate",
      accessorKey: "totalEstimate",
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-[#762B46] text-sm">
          ₹{row.totalEstimate.toLocaleString("en-IN")}
        </span>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => (
        <Badge
          variant={
            row.status === "accepted"
              ? "success"
              : row.status === "pending_review"
              ? "gold"
              : "secondary"
          }
        >
          {row.status === "accepted"
            ? "Accepted by Family"
            : row.status === "pending_review"
            ? "Under Customer Review"
            : "Expired"}
        </Badge>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" asChild className="h-7 text-xs px-2.5">
            <Link href={`/vendor/quotations/create?clone=${row.quotationCode}`}>
              <Eye className="w-3 h-3 mr-1" />
              <span>Details</span>
            </Link>
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Reusable Header */}
      <VendorPageHeader
        title="Sent Quotations"
        subtitle="Formal price estimates and service packages submitted to prospective wedding families"
      >
        <Button variant="primary" size="sm" asChild className="gap-1.5 shadow-sm">
          <Link href="/vendor/quotations/create">
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Quotation</span>
          </Link>
        </Button>
      </VendorPageHeader>

      {/* Reusable Data Table */}
      <DataTable
        data={SAMPLE_QUOTATIONS}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Search customer or quotation code..."
        pageSize={10}
      />
    </div>
  );
}
