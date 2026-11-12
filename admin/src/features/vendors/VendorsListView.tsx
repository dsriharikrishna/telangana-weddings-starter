'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SearchInput } from '@/components/common/SearchInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/form';
import { DataTable, Column } from '@/components/ui/data-table';
import { 
  Search, MapPin, Phone, ExternalLink 
} from 'lucide-react';
import { useAdminVendors } from './hooks/useAdminVendors';
import { useAdminCategories } from '@/features/categories/hooks/useCategories';
import { useAdminLocations } from '@/features/locations/hooks/useLocations';
import { useAdminStore } from '@/store/useAdminStore';
import { Vendor } from '@/types';
import { AdminCategory } from '@/features/categories/types/category.types';

export function VendorsListView() {
  const { language } = useLanguage();
  const { data: vendors, isLoading } = useAdminVendors();
  const { data: categories } = useAdminCategories();
  const { data: locations } = useAdminLocations();

  const selectedDistrict = useAdminStore((s) => s.selectedDistrict);
  const setSelectedDistrict = useAdminStore((s) => s.setSelectedDistrict);
  const selectedCategory = useAdminStore((s) => s.selectedCategory);
  const setSelectedCategory = useAdminStore((s) => s.setSelectedCategory);
  const searchQuery = useAdminStore((s) => s.searchQuery);
  const setSearchQuery = useAdminStore((s) => s.setSearchQuery);

  const columns: Column<Vendor>[] = [
    {
      header: 'Vendor Business & Owner',
      accessorKey: 'businessName',
      sortable: true,
      cell: (v: Vendor) => (
        <div>
          <div className="font-bold text-stone-900">{v.businessName}</div>
          <div className="text-[11px] text-[#762B46] font-medium">{v.ownerName}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'categorySlug',
      sortable: true,
      cell: (v: Vendor) => (
        <Badge variant="outline" className="border-stone-200 text-stone-700 text-[10px]">
          {v.categorySlug}
        </Badge>
      ),
    },
    {
      header: 'Location',
      cell: (v: Vendor) => (
        <div className="flex items-center gap-1 text-stone-700">
          <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
          <span>{v.townOrVillage || v.mandal}, {v.district}</span>
        </div>
      ),
    },
    {
      header: 'Contact',
      cell: (v: Vendor) => (
        <div className="flex items-center gap-1 font-mono text-[11px] text-stone-600">
          <Phone className="w-3 h-3 text-stone-400 shrink-0" />
          <span>{v.phone || 'N/A'}</span>
        </div>
      ),
    },
    {
      header: 'KYC Status',
      cell: (v: Vendor) => (
        <StatusBadge 
          status={v.isVerified ? 'verified' : 'pending'} 
          label={v.isVerified ? 'Verified' : 'Pending KYC'}
        />
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (v: Vendor) => (
        <Link href={`/vendors/${v.id}`}>
          <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
            Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={language === 'te' ? 'వెండర్ల నిర్వహణ' : 'Vendor Management'}
        description={
          language === 'te' 
            ? 'నారాయణపేట & మహబూబ్ నగర్ జిల్లాలలోని నమోదిత వ్యాపారులు.' 
            : 'Registered wedding service vendors across Telangana districts.'
        }
        actions={
          <Badge className="bg-[#542034] text-white">
            {vendors?.length ?? 0} Total Vendors Listed
          </Badge>
        }
      />

      {/* Reusable DataTable with integrated Search & Dropdowns */}
      <DataTable<Vendor>
        data={vendors ?? []}
        columns={columns}
        isLoading={isLoading}
        pageSize={10}
        emptyMessage="No vendors found matching your filter criteria."
        filterComponent={
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-44">
              <Select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="all">All Districts</option>
                {locations?.districts.map((d: { id: string; nameEn: string; nameTe: string }) => (
                  <option key={d.id} value={d.id}>
                    {d.nameEn} ({d.nameTe})
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-52">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All 18 Categories</option>
                {categories?.map((c: AdminCategory) => (
                  <option key={c.slug} value={c.slug}>
                    {c.number}. {c.nameEn}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        }
        headerActions={
          <div className="w-64">
            <SearchInput
              placeholder="Search vendor name or phone..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        }
      />
    </div>
  );
}
