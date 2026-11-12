"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/data-table";
import { Coins, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VendorPageHeader } from "@/components/ui/vendor-page-header";
import { Card } from "@/components/ui/card";

interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  priceFormatted: string;
  perCreditFormatted: string;
  isPopular?: boolean;
  features: string[];
}

const CREDIT_PLANS: CreditPlan[] = [
  {
    id: "plan-starter",
    name: "Starter Lead Pack",
    credits: 5,
    priceFormatted: "₹499",
    perCreditFormatted: "₹99 / lead",
    features: [
      "5 Direct Customer Contact Unlocks",
      "Instant WhatsApp & Phone access",
      "Valid for 90 days across all mandals",
      "No commission on finalized bookings"
    ]
  },
  {
    id: "plan-growth",
    name: "Muhurtham Pro Pack",
    credits: 15,
    priceFormatted: "₹1,199",
    perCreditFormatted: "₹79 / lead",
    isPopular: true,
    features: [
      "15 Direct Customer Contact Unlocks",
      "Priority notification for high-budget leads",
      "Instant WhatsApp & Phone access",
      "Valid for 180 days across all mandals",
      "Free Field Verification Trust badge"
    ]
  },
  {
    id: "plan-enterprise",
    name: "Season Master Pack",
    credits: 40,
    priceFormatted: "₹2,499",
    perCreditFormatted: "₹62 / lead",
    features: [
      "40 Direct Customer Contact Unlocks",
      "Top placement in category searches",
      "Dedicated District Coordinator support",
      "365 Days validity across Telangana",
      "Zero platform commission on contracts"
    ]
  }
];

interface LeadTransactionRecord {
  id: string;
  txnId: string;
  description: string;
  creditsChange: string;
  balanceAfter: number;
  date: string;
  status: "success" | "pending";
}

const SAMPLE_TXNS: LeadTransactionRecord[] = [
  {
    id: "tx-1",
    txnId: "TXN-CRD-882109",
    description: "Purchased Muhurtham Pro Pack (UPI)",
    creditsChange: "+15 Credits",
    balanceAfter: 15,
    date: "10 Nov 2026",
    status: "success"
  },
  {
    id: "tx-2",
    txnId: "TXN-LNK-7721",
    description: "Unlocked Customer Lead: Venkat Rao (Singaram)",
    creditsChange: "-1 Credit",
    balanceAfter: 14,
    date: "11 Nov 2026",
    status: "success"
  },
  {
    id: "tx-3",
    txnId: "TXN-LNK-7719",
    description: "Unlocked Customer Lead: K. Srinivasa Chary (Damaragidda)",
    creditsChange: "-1 Credit",
    balanceAfter: 13,
    date: "12 Nov 2026",
    status: "success"
  }
];

export default function VendorPaymentsPage() {
  const [walletCredits, setWalletCredits] = useState<number>(5);
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);

  const handleBuyPlan = (plan: CreditPlan) => {
    setWalletCredits(prev => prev + plan.credits);
    setPurchasedPlan(plan.name);
    setTimeout(() => setPurchasedPlan(null), 4000);
  };

  const columns: Column<LeadTransactionRecord>[] = [
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
      header: "Description",
      accessorKey: "description",
      sortable: true,
      cell: (row) => (
        <span className="font-medium text-[#292524] text-xs">{row.description}</span>
      )
    },
    {
      header: "Credit Adjustment",
      accessorKey: "creditsChange",
      sortable: true,
      cell: (row) => (
        <span className={`font-mono font-bold text-xs ${row.creditsChange.startsWith("+") ? "text-emerald-700" : "text-amber-800"}`}>
          {row.creditsChange}
        </span>
      )
    },
    {
      header: "Balance",
      accessorKey: "balanceAfter",
      sortable: true,
      cell: (row) => (
        <span className="font-mono font-semibold text-xs text-stone-700">
          {row.balanceAfter} Credits
        </span>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => (
        <Badge variant={row.status === "success" ? "success" : "secondary"}>
          {row.status === "success" ? "Completed" : "Processing"}
        </Badge>
      )
    }
  ];

  return (
    <div className="w-full space-y-6 font-body">
      <VendorPageHeader
        title="Lead Credits & Wallet Top-up"
        subtitle="Purchase fixed matchmaking credits to unlock direct customer mobile numbers with zero platform commission"
      >
        <div className="flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs">
          <Coins className="w-4 h-4 text-[#C5A46D]" />
          <span>Active Balance: {walletCredits} Credits</span>
        </div>
      </VendorPageHeader>

      {purchasedPlan && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Successfully activated <strong>{purchasedPlan}</strong>! Your wallet balance has been updated.
          </span>
        </div>
      )}

      {/* Credit Pricing Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#292524] font-heading">
            Choose Matchmaking Credit Pack
          </h2>
          <span className="text-xs text-stone-500">Instant UPI activation via PhonePe / GPay</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CREDIT_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 rounded-2xl relative flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? "bg-gradient-to-b from-white to-[#FAF7F2] border-2 border-[#C5A46D] shadow-md"
                  : "bg-white border border-[#E7DECF] shadow-xs"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#762B46] text-[#C5A46D] text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-[#C5A46D]/40">
                  Most Popular in Telangana
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#292524] font-heading">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#762B46]">{plan.priceFormatted}</span>
                    <span className="text-xs text-stone-500 font-medium">({plan.perCreditFormatted})</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 mt-1">
                    Includes {plan.credits} Direct Wedding Leads
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Button
                  variant={plan.isPopular ? "gold" : "primary"}
                  size="sm"
                  onClick={() => handleBuyPlan(plan)}
                  className="w-full font-bold text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  <span>Buy {plan.name}</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction & Usage History Table */}
      <div className="space-y-3 pt-4">
        <h2 className="text-base font-bold text-[#292524] font-heading">
          Credit Usage & Purchase History
        </h2>
        <DataTable
          data={SAMPLE_TXNS}
          columns={columns}
          searchKey="description"
          searchPlaceholder="Search transactions..."
          pageSize={5}
        />
      </div>
    </div>
  );
}
