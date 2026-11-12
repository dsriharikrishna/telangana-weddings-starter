'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchInput } from '@/components/common/SearchInput';
import { DataTable, Column } from '@/components/ui/data-table';

interface CustomerItem {
  id: string;
  name: string;
  phone: string;
  district: string;
  mandal: string;
  village: string;
  weddingDate: string;
  enquiriesCount: number;
  bookingsCount: number;
  joined: string;
}

export default function AdminCustomersPage() {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');

  const customers: CustomerItem[] = [
    {
      id: 'CUST-1001',
      name: 'Ramesh Reddy',
      phone: '98480 99112',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Maganoor Village',
      weddingDate: '18 May 2026',
      enquiriesCount: 4,
      bookingsCount: 2,
      joined: '12 Feb 2026',
    },
    {
      id: 'CUST-1002',
      name: 'Venkataiah Goud',
      phone: '94401 88334',
      district: 'Narayanpet',
      mandal: 'Damaragidda',
      village: 'Kyathanpally',
      weddingDate: '02 Jun 2026',
      enquiriesCount: 6,
      bookingsCount: 3,
      joined: '20 Mar 2026',
    },
    {
      id: 'CUST-1003',
      name: 'Suresh Kurva',
      phone: '99890 77221',
      district: 'Mahabubnagar',
      mandal: 'Jadcherla',
      village: 'Badepally',
      weddingDate: '15 Jul 2026',
      enquiriesCount: 3,
      bookingsCount: 1,
      joined: '05 Apr 2026',
    },
    {
      id: 'CUST-1004',
      name: 'Anjamma Mudhiraj',
      phone: '98492 66110',
      district: 'Mahabubnagar',
      mandal: 'Koilkonda',
      village: 'Koilkonda Town',
      weddingDate: '24 May 2026',
      enquiriesCount: 5,
      bookingsCount: 2,
      joined: '18 Apr 2026',
    },
  ];

  const columns: Column<CustomerItem>[] = [
    {
      header: 'Customer Name & ID',
      accessorKey: 'name',
      sortable: true,
      cell: (c) => (
        <div>
          <div className="font-bold text-[#292524]">{c.name}</div>
          <div className="text-[10px] text-stone-400 font-mono">{c.id}</div>
        </div>
      ),
    },
    {
      header: 'Phone Contact',
      accessorKey: 'phone',
      cell: (c) => <span className="font-mono text-stone-600">+91 {c.phone}</span>,
    },
    {
      header: 'Wedding Village / Location',
      cell: (c) => (
        <div>
          <div className="flex items-center gap-1 font-medium text-stone-800">
            <MapPin className="w-3.5 h-3.5 text-[#762B46]" />
            {c.village}
          </div>
          <div className="text-[11px] text-stone-400">{c.mandal}, {c.district}</div>
        </div>
      ),
    },
    {
      header: 'Upcoming Wedding Date',
      accessorKey: 'weddingDate',
      sortable: true,
      cell: (c) => <span className="font-semibold text-[#762B46]">{c.weddingDate}</span>,
    },
    {
      header: 'Enquiries',
      accessorKey: 'enquiriesCount',
      cell: (c) => <span className="font-semibold text-stone-700">{c.enquiriesCount}</span>,
    },
    {
      header: 'Leads Matched',
      accessorKey: 'bookingsCount',
      cell: (c) => <span className="font-semibold text-emerald-700">{c.bookingsCount}</span>,
    },
    {
      header: 'Registered',
      accessorKey: 'joined',
      className: 'text-right',
      cell: (c) => <span className="text-stone-400">{c.joined}</span>,
    },
  ];

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.village.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === 'te' ? 'కస్టమర్ల నిర్వహణ' : 'Customer Registry'}
        description="Families planning rural weddings in Narayanpet & Mahabubnagar."
        actions={
          <Badge variant="outline" className="text-xs font-semibold">
            {customers.length} Registered Accounts
          </Badge>
        }
      />

      <DataTable<CustomerItem>
        data={filtered}
        columns={columns}
        pageSize={10}
        emptyMessage="No customer accounts found."
        headerActions={
          <div className="w-72">
            <SearchInput
              placeholder="Search by customer name, phone, village..."
              value={search}
              onChange={setSearch}
            />
          </div>
        }
      />
    </div>
  );
}

