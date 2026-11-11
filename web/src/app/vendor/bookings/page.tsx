"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";
import { Calendar, Eye, Phone, MapPin } from "lucide-react";

interface BookingRecord {
  id: string;
  bookingCode: string;
  customerName: string;
  phone: string;
  village: string;
  mandal: string;
  service: string;
  eventDate: string;
  totalAmount: number;
  advanceReceived: number;
  status: "confirmed" | "completed" | "cancelled";
}

const SAMPLE_BOOKINGS: BookingRecord[] = [
  {
    id: "1",
    bookingCode: "BK-TEL-4410",
    customerName: "Ramesh Reddy",
    phone: "+91 94401 XXXXX",
    village: "Singaram",
    mandal: "Narayanpet",
    service: "Kalyana Mandapam + Stage Lighting",
    eventDate: "24 Dec 2026",
    totalAmount: 120000,
    advanceReceived: 30000,
    status: "confirmed"
  },
  {
    id: "2",
    bookingCode: "BK-TEL-4392",
    customerName: "Venkat Goud",
    phone: "+91 98480 XXXXX",
    village: "Damaragidda Town",
    mandal: "Damaragidda",
    service: "Band Melam (15 Artists) & Sannai",
    eventDate: "18 Jan 2027",
    totalAmount: 45000,
    advanceReceived: 15000,
    status: "confirmed"
  },
  {
    id: "3",
    bookingCode: "BK-TEL-4388",
    customerName: "Mallikarjun Swamy",
    phone: "+91 99890 XXXXX",
    village: "Marikal",
    mandal: "Marikal",
    service: "Traditional Dining Catering (800 Pax)",
    eventDate: "05 Feb 2027",
    totalAmount: 240000,
    advanceReceived: 60000,
    status: "confirmed"
  },
  {
    id: "4",
    bookingCode: "BK-TEL-4350",
    customerName: "Anand Kurva",
    phone: "+91 91210 XXXXX",
    village: "Appakpalle",
    mandal: "Narayanpet",
    service: "Photography & Traditional Videography",
    eventDate: "12 Nov 2026",
    totalAmount: 65000,
    advanceReceived: 65000,
    status: "completed"
  }
];

export default function VendorBookingsListPage() {
  const columns: Column<BookingRecord>[] = [
    {
      header: "Booking Ref",
      accessorKey: "bookingCode",
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-[#762B46]">{row.bookingCode}</span>
          <div className="text-[11px] text-[#57534E]">{row.service}</div>
        </div>
      )
    },
    {
      header: "Customer & Location",
      accessorKey: "customerName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-semibold text-[#292524]">{row.customerName}</div>
          <div className="text-[11px] text-[#78716C] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-[#762B46]" />
            <span>{row.village}, {row.mandal}</span>
          </div>
        </div>
      )
    },
    {
      header: "Event Date",
      accessorKey: "eventDate",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-1.5 font-medium text-[#292524]">
          <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>{row.eventDate}</span>
        </div>
      )
    },
    {
      header: "Financials",
      accessorKey: "totalAmount",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-bold text-[#292524]">₹{row.totalAmount.toLocaleString("en-IN")}</div>
          <div className="text-[10px] text-emerald-700 font-semibold">
            Adv: ₹{row.advanceReceived.toLocaleString("en-IN")}
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => (
        <Badge
          variant={
            row.status === "confirmed"
              ? "success"
              : row.status === "completed"
              ? "secondary"
              : "outline"
          }
        >
          {row.status === "confirmed" ? "Confirmed & Advance Paid" : "Completed"}
        </Badge>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" asChild className="h-7 text-xs px-2.5">
            <Link href={`/vendor/bookings/${row.id}`}>
              <Eye className="w-3 h-3 mr-1" />
              <span>Details</span>
            </Link>
          </Button>
          <a
            href={`tel:${row.phone}`}
            className="p-1.5 rounded-lg border border-[#E7DECF] hover:bg-[#FAF7F2] text-[#762B46] transition-colors"
            title="Call Customer"
          >
            <Phone className="w-3 h-3" />
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Reusable Header */}
      <VendorPageHeader
        title="Vendor Bookings"
        subtitle="Confirmed wedding dates, customer contacts, and token payment schedules across Narayanpet & Mahabubnagar"
      >
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
          {SAMPLE_BOOKINGS.filter(b => b.status === "confirmed").length} Active Bookings
        </span>
      </VendorPageHeader>

      {/* Reusable Data Table */}
      <DataTable
        data={SAMPLE_BOOKINGS}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Search customer or village..."
        pageSize={10}
      />
    </div>
  );
}
