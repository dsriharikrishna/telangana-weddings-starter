"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";
import { 
  Calendar, 
  Phone, 
  MapPin, 
  Eye, 
  Unlock, 
  Coins, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useVendorLeads, useUnlockLead } from "@/features/vendors/hooks/useVendors";
import { VendorLead } from "@/features/vendors/types/vendor.types";

interface EnquiryRecord {
  id: string;
  enquiryCode: string;
  customerName: string;
  phone: string;
  village: string;
  mandal: string;
  district: string;
  eventDate: string;
  guestCount: number;
  budgetFormatted: string;
  serviceRequested: string;
  receivedAt: string;
  isUnlocked: boolean;
  status: "new" | "unlocked" | "quoted" | "declined";
}

const FALLBACK_LEADS: EnquiryRecord[] = [
  {
    id: "asg_789",
    enquiryCode: "ENQ-NAR-7721",
    customerName: "Venkat Rao",
    phone: "+91 94401 54321",
    village: "Singaram",
    mandal: "Narayanpet",
    district: "Narayanpet",
    eventDate: "24 Dec 2026",
    guestCount: 600,
    budgetFormatted: "₹1,50,000",
    serviceRequested: "Kalyana Mandapam with AC Rooms",
    receivedAt: "Today, 10:30 AM",
    isUnlocked: false,
    status: "new"
  },
  {
    id: "asg_790",
    enquiryCode: "ENQ-DAM-7719",
    customerName: "K. Srinivasa Chary",
    phone: "+91 98492 88123",
    village: "Damaragidda",
    mandal: "Damaragidda",
    district: "Narayanpet",
    eventDate: "15 Jan 2027",
    guestCount: 450,
    budgetFormatted: "₹45,000",
    serviceRequested: "Band Melam (15 Artists) & Sannai",
    receivedAt: "Yesterday",
    isUnlocked: false,
    status: "new"
  },
  {
    id: "asg_791",
    enquiryCode: "ENQ-MAR-7705",
    customerName: "G. Raghavender",
    phone: "+91 99080 32190",
    village: "Marikal Town",
    mandal: "Marikal",
    district: "Narayanpet",
    eventDate: "02 Feb 2027",
    guestCount: 800,
    budgetFormatted: "₹2,20,000",
    serviceRequested: "Full Mandapam + Lighting",
    receivedAt: "3 days ago",
    isUnlocked: true,
    status: "unlocked"
  }
];

export default function VendorEnquiriesPage() {
  const { data: leadsData, isLoading, error, refetch } = useVendorLeads();
  const unlockLeadMutation = useUnlockLead();

  const [localLeads, setLocalLeads] = useState<EnquiryRecord[]>(FALLBACK_LEADS);
  const [localWalletCredits, setLocalWalletCredits] = useState<number>(5);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Derive active leads from API or local fallback
  const displayLeads: EnquiryRecord[] = leadsData?.leads && leadsData.leads.length > 0
    ? leadsData.leads.map((l: VendorLead) => ({
        id: l.assignmentId,
        enquiryCode: `ENQ-${l.assignmentId.slice(-6).toUpperCase()}`,
        customerName: l.customerName,
        phone: l.customerPhone,
        village: l.villageOrTown,
        mandal: l.mandal,
        district: l.district,
        eventDate: l.eventDate ? new Date(l.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Muhurtham TBD",
        guestCount: l.guestCount || 500,
        budgetFormatted: l.budgetPaise ? `₹${(l.budgetPaise / 100).toLocaleString("en-IN")}` : "Flexible Budget",
        serviceRequested: l.serviceRequested || l.categoryName || l.categorySlug,
        receivedAt: l.receivedAt || "Recently",
        isUnlocked: l.isUnlocked,
        status: l.status === "UNLOCKED" ? "unlocked" : "new"
      }))
    : localLeads;

  const walletCredits = leadsData?.walletBalance !== undefined 
    ? leadsData.walletBalance 
    : localWalletCredits;

  const handleUnlockLead = async (id: string) => {
    if (walletCredits <= 0) {
      alert("No credits left! Please top up your wallet credits to unlock direct customer contact numbers.");
      return;
    }

    try {
      await unlockLeadMutation.mutateAsync(id);
      setNotificationMsg("Lead unlocked via API! 1 credit deducted.");
      setTimeout(() => setNotificationMsg(null), 5000);
    } catch {
      // Fallback local state if API is offline or unauthenticated in demo mode
      setLocalLeads((prev) =>
        prev.map((lead) => {
          if (lead.id === id) {
            return { ...lead, isUnlocked: true, status: "unlocked" };
          }
          return lead;
        })
      );
      setLocalWalletCredits((prev) => Math.max(0, prev - 1));
      setNotificationMsg("Lead unlocked! 1 credit deducted. You can now call or WhatsApp the family.");
      setTimeout(() => setNotificationMsg(null), 5000);
    }
  };

  const maskPhone = (phone: string) => {
    return phone.slice(0, 9) + " XXXXX";
  };

  const maskName = (name: string) => {
    const parts = name.split(" ");
    return parts[0] + (parts.length > 1 ? " ***" : "");
  };

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
          <div className="font-semibold text-[#292524] flex items-center gap-1.5">
            <span>{row.isUnlocked ? row.customerName : maskName(row.customerName)}</span>
            {row.isUnlocked && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
            )}
          </div>
          <div className="text-[11px] text-[#78716C] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-[#762B46]" />
            <span>{row.village}, {row.mandal}</span>
          </div>
        </div>
      )
    },
    {
      header: "Service & Budget",
      accessorKey: "serviceRequested",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-[#292524]">{row.serviceRequested}</div>
          <div className="text-[11px] text-[#57534E] flex items-center gap-2 mt-0.5">
            <span>Budget: <strong className="text-emerald-700">{row.budgetFormatted}</strong></span>
            <span>•</span>
            <span>Guests: {row.guestCount}</span>
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
      header: "Customer Contact",
      cell: (row) => {
        if (!row.isUnlocked) {
          return (
            <div className="space-y-1">
              <span className="font-mono text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                {maskPhone(row.phone)}
              </span>
              <Button
                variant="gold"
                size="sm"
                onClick={() => handleUnlockLead(row.id)}
                disabled={unlockLeadMutation.isPending}
                className="h-6 text-[10px] px-2 flex items-center gap-1"
              >
                {unlockLeadMutation.isPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Unlock className="w-3 h-3" />
                )}
                <span>Unlock (1 Credit)</span>
              </Button>
            </div>
          );
        }

        return (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-semibold text-stone-800">
              {row.phone}
            </span>
            <a
              href={`tel:${row.phone.replace(/\s+/g, '')}`}
              className="p-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Call Family"
            >
              <Phone className="w-3 h-3" />
            </a>
            <a
              href={`https://wa.me/${row.phone.replace(/[^0-9]/g, '')}?text=Namaskaram%20${encodeURIComponent(row.customerName)},%20I%20am%20reaching%20out%20regarding%20your%20wedding%20enquiry%20${row.enquiryCode}`}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              title="WhatsApp Message"
            >
              <MessageCircle className="w-3 h-3" />
            </a>
          </div>
        );
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => (
        <Badge
          variant={
            row.status === "new"
              ? "gold"
              : row.status === "unlocked"
              ? "outline"
              : "secondary"
          }
        >
          {row.status === "new"
            ? "New Lead"
            : row.status === "unlocked"
            ? "Contact Unlocked"
            : "Quotation Sent"}
        </Badge>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" asChild className="h-7 text-xs px-2.5">
            <Link href={`/vendor/enquiries/${row.id}`}>
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
      {/* Wallet Balance & Notification Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#542034] to-[#762B46] text-white shadow-sm border border-[#C5A46D]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C5A46D] text-[#542034] flex items-center justify-center font-bold shadow-xs shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-bold">
              Matchmaking Lead Credits
            </div>
            <div className="text-lg font-bold font-heading flex items-center gap-2">
              <span>{walletCredits} Credits Available</span>
              <span className="text-xs font-normal text-stone-200">(1 Credit = 1 Direct Lead)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => refetch()} 
            className="h-8 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            <span>Sync Live</span>
          </Button>
          <Button variant="gold" size="sm" asChild className="h-8 text-xs font-bold">
            <Link href="/vendor/payments">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Top-Up Credits</span>
            </Link>
          </Button>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <VendorPageHeader
        title="Customer Wedding Enquiries"
        subtitle="Direct matchmaking leads from families in Narayanpet and Mahabubnagar mandals"
      >
        <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-bold">
          {displayLeads.filter(e => !e.isUnlocked).length} Leads Ready to Unlock
        </span>
      </VendorPageHeader>

      {/* Reusable Data Table */}
      <DataTable
        data={displayLeads}
        columns={columns}
        searchKey="customerName"
        searchPlaceholder="Search customer, mandal, or village..."
        pageSize={10}
      />
    </div>
  );
}
