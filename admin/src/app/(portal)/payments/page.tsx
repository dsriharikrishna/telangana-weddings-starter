'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { StatCard } from '@/components/data-display/StatCard';
import { DataTable, Column } from '@/components/ui/data-table';
import { CreditCard, Sparkles, Store } from 'lucide-react';

interface TransactionItem {
  id: string;
  date: string;
  refNumber: string;
  vendor: string;
  type: string;
  amount: string;
  method: string;
  status: string;
}

export default function AdminPaymentsPage() {
  const { language } = useLanguage();

  const transactions: TransactionItem[] = [
    { id: 'TXN-9021', date: 'Today, 10:15 AM', refNumber: 'SUB-VEND-104', vendor: 'Sri Raghavendra Melam', type: 'Annual Vendor Listing', amount: '₹1,999', method: 'UPI (PhonePe)', status: 'Success' },
    { id: 'TXN-9020', date: 'Yesterday, 04:30 PM', refNumber: 'LEAD-CR-50', vendor: 'Tirumala Shamiana', type: 'Lead Credit Pack (50 Leads)', amount: '₹1,500', method: 'Bank Transfer (NEFT)', status: 'Success' },
    { id: 'TXN-9019', date: '08 Nov 2026', refNumber: 'LEAD-CR-20', vendor: 'Muralidhar Studio', type: 'Lead Credit Pack (20 Leads)', amount: '₹699', method: 'UPI (Google Pay)', status: 'Success' },
  ];

  const columns: Column<TransactionItem>[] = [
    {
      header: 'Txn ID',
      accessorKey: 'id',
      sortable: true,
      cell: (t) => <span className="font-mono font-medium text-stone-700">{t.id}</span>,
    },
    {
      header: 'Date & Time',
      accessorKey: 'date',
      cell: (t) => <span className="text-stone-500">{t.date}</span>,
    },
    {
      header: 'Reference / Item',
      cell: (t) => (
        <div>
          <div className="font-semibold text-[#762B46]">{t.type}</div>
          <div className="text-[11px] font-mono text-stone-500">{t.refNumber}</div>
        </div>
      ),
    },
    {
      header: 'Vendor Partner',
      accessorKey: 'vendor',
      sortable: true,
      cell: (t) => <span className="font-semibold text-[#292524]">{t.vendor}</span>,
    },
    {
      header: 'Payment Method',
      accessorKey: 'method',
      cell: (t) => <span className="text-stone-600">{t.method}</span>,
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (t) => <span className="font-bold text-stone-900">{t.amount}</span>,
    },
    {
      header: 'Status',
      className: 'text-right',
      cell: (t) => <StatusBadge status={t.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === 'te' ? 'సభ్యత్వాలు & ఫీజులు' : 'Subscriptions & Matchmaking Fees'}
        description="Vendor listing subscriptions, matchmaking credits, and platform revenue."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Subscription Revenue"
          value="₹1,85,000"
          icon={CreditCard}
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Lead Credit Packs Sold"
          value="₹94,500"
          icon={Sparkles}
          iconColor="text-[#762B46]"
        />
        <StatCard
          title="Active Paid Vendors"
          value="134"
          icon={Store}
          iconColor="text-[#C5A46D]"
        />
      </div>

      <DataTable<TransactionItem>
        data={transactions}
        columns={columns}
        pageSize={10}
        emptyMessage="No payment transactions found."
      />
    </div>
  );
}

