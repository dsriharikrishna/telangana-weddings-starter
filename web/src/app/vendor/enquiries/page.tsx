"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";
import { Calendar, Phone, MapPin, Send, Eye } from "lucide-react";

interface EnquiryRecord {
  id: string;
  enquiryCode: string;
  customerName: string;
  phone: string;
  village: string;
  mandal: string;
  eventDate: string;
  guestCount: number;
  serviceRequested: string;
  receivedAt: string;
  status: "new" | "quoted" | "declined";
}

const SAMPLE_ENQUIRIES: EnquiryRecord[] = [
  {
    id: "enq-7721",
    enquiryCode: "ENQ-NAR-7721",
    customerName: "Venkat Rao",
    phone: "+91 94401 XXXXX",
    village: "Singaram",
    mandal: "Narayanpet",
    eventDate: "24 Dec 2026",
    guestCount: 600,
    serviceRequested: "Kalyana Mandapam with AC Rooms",
    receivedAt: "Today, 10:30 AM",
    status: "new"
  },
  {
    id: "enq-7719",
    enquiryCode: "ENQ-DAM-7719",
    customerName: "K. Srinivasa Chary",
    phone: "+91 98492 XXXXX",
    village: "Damaragidda",
    mandal: "Damaragidda",
    eventDate: "15 Jan 2027",
    guestCount: 450,
    serviceRequested: "Band Melam (15 Artists) & Sannai",
    receivedAt: "Yesterday",
    status: "new"
  },
  {
    id: "enq-7705",
    enquiryCode: "ENQ-MAR-7705",
    customerName: "G. Raghavender",
    phone: "+91 99080 XXXXX",
    village: "Marikal Town",
    mandal: "Marikal",
    eventDate: "02 Feb 2027",
    guestCount: 800,
    serviceRequested: "Full Mandapam + Lighting",
    receivedAt: "3 days ago",
    status: "quoted"
  },
  {
    id: "enq-7688",
    enquiryCode: "ENQ-MAH-7688",
    customerName: "Praveen Kumar",
    phone: "+91 91219 XXXXX",
    village: "Bhoothpur",
    mandal: "Bhoothpur",
    eventDate: "20 Dec 2026",
    guestCount: 350,
    serviceRequested: "Traditional Stage Decoration",
    receivedAt: "5 days ago",
    status: "quoted"
  }
];

export default function VendorEnquiriesPage() {
  const columns: Column<EnquiryRecord>[] = [
    {
      header: "Enquiry Code",
      accessorKey: "enquiryCode",
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-[#762B46]">{row.enquiryCode}</span>
          <div className="text-[11px] text-[#78716C]">{row.receivedAt}</div>
        </div>
      )
    },
    {
      header: "Family & Location",
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
      header: "Service & Guests",
      accessorKey: "serviceRequested",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-[#292524]">{row.serviceRequested}</div>
          <div className="text-[11px] text-[#57534E]">Est. Guests: {row.guestCount}</div>
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
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => (
        <Badge variant={row.status === "new" ? "gold" : "secondary"}>
          {row.status === "new" ? "New Lead" : "Quotation Sent"}
        </Badge>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.status === "new" ? (
            <Button variant="primary" size="sm" asChild className="h-7 text-xs px-2.5">
              <Link href={`/vendor/quotations/create?enquiryId=${row.enquiryCode}`}>
                <Send className="w-3 h-3 mr-1" />
                <span>Quote</span>
              </Link>
            </Button>
          ) : (
            <Button variant="secondary" size="sm" asChild className="h-7 text-xs px-2.5">
              <Link href={`/vendor/enquiries/${row.id}`}>
                <Eye className="w-3 h-3 mr-1" />
                <span>View</span>
              </Link>
            </Button>
          )}
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
        title="Customer Wedding Enquiries"
        subtitle="Direct enquiries and call-back requests from families in Narayanpet and Mahabubnagar"
      >
        <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-bold">
          {SAMPLE_ENQUIRIES.filter(e => e.status === "new").length} New Leads Pending
        </span>
      </VendorPageHeader>

      {/* Reusable Data Table */}
      <DataTable
        data={SAMPLE_ENQUIRIES}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Search customer, mandal, or village..."
        pageSize={10}
      />
    </div>
  );
}
