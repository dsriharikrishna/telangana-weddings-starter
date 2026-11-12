'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin } from 'lucide-react';
import { useAdminEnquiries } from '../hooks/useEnquiries';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DataTable, Column } from '@/components/ui/data-table';
import { AdminEnquiry } from '../types/enquiry.types';

export function EnquiriesListView() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState('All');
  const { data: enquiries, isLoading } = useAdminEnquiries();

  const filteredEnquiries = (enquiries || []).filter((item: any) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return item.status === 'pending' || item.status === 'new';
    if (filter === 'Contacted') return item.status === 'contacted' || item.status === 'matched';
    return true;
  });

  const columns: Column<AdminEnquiry>[] = [
    {
      header: 'Ref & Customer',
      accessorKey: 'customerName',
      cell: (enq: AdminEnquiry) => (
        <div>
          <div className="font-bold text-stone-900">{enq.customerName}</div>
          <div className="text-[11px] font-mono text-stone-500">{enq.referenceNumber}</div>
          <div className="text-[11px] font-mono text-stone-600 flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 text-stone-400" />
            {enq.customerPhone}
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      cell: (enq: AdminEnquiry) => (
        <div className="flex items-center gap-1 text-stone-700">
          <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
          <span>{enq.villageOrTown || enq.mandal}, {enq.district}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (enq: AdminEnquiry) => (
        <Badge variant="outline" className="border-stone-200 text-stone-700 text-[10px]">
          {enq.categorySlug}
        </Badge>
      ),
    },
    {
      header: 'Source',
      accessorKey: 'source',
      cell: (enq: AdminEnquiry) => (
        <span className="text-stone-600 capitalize">{enq.source}</span>
      ),
    },
    {
      header: 'Status',
      cell: (enq: AdminEnquiry) => (
        <StatusBadge status={enq.status} />
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (enq: AdminEnquiry) => (
        <a 
          href={`tel:${enq.customerPhone}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-[#762B46] text-white hover:bg-[#542034]"
        >
          <Phone className="w-3 h-3" /> Call Back
        </a>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === 'te' ? 'విచారణల నిర్వహణ' : 'Rural Enquiries & Lead Desk'}
        description="Tracking inbound assisted phone requests, WhatsApp enquiries, and online form submissions."
        actions={
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">
            {enquiries?.length ?? 0} Total Inquiries
          </Badge>
        }
      />

      <DataTable<AdminEnquiry>
        data={filteredEnquiries}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        emptyMessage="No customer enquiries found in this view."
        filterComponent={
          <div className="flex gap-1.5">
            {['All', 'Pending', 'Contacted'].map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
                className="text-xs h-9"
              >
                {f}
              </Button>
            ))}
          </div>
        }
      />
    </div>
  );
}
