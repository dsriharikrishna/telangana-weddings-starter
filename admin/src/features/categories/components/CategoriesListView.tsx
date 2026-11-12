'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Layers, Eye } from 'lucide-react';
import { useAdminCategories } from '../hooks/useCategories';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingState } from '@/components/common/LoadingState';

export function CategoriesListView() {
  const { language } = useLanguage();
  const { data: categories, isLoading } = useAdminCategories();

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === 'te' ? '18 వివాహ వర్గాల నిర్వహణ' : 'Wedding Service Categories (All 18)'}
        description="Configured wedding categories and vendor distribution for Narayanpet & Mahabubnagar."
        actions={
          <Link href="/subcategories">
            <Button variant="outline" className="text-xs">
              <Layers className="w-4 h-4 mr-1 text-[#762B46]" />
              Manage Subcategories
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <LoadingState message="Loading categories from backend..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(categories || []).map((cat: any, index: number) => {
            const isSpecial = cat.slug === 'band-melam-sannai';
            const catNumber = cat.number || index + 1;
            return (
              <Card key={cat.id || cat.slug} className={`border-stone-200 bg-white shadow-sm ${isSpecial ? 'ring-2 ring-[#762B46]' : ''}`}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-mono font-bold text-[#762B46] bg-[#762B46]/10 px-2 py-0.5 rounded">
                      Category #{catNumber}
                    </span>
                    {isSpecial && (
                      <Badge className="bg-[#762B46] text-white text-[10px]">
                        Rural Spotlight
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[#292524] font-heading">{cat.nameEn}</h3>
                    <div className="text-xs text-stone-500 font-body mt-0.5">{cat.nameTe}</div>
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between text-xs text-stone-600">
                    <span>{cat.subcategories?.length ? `${cat.subcategories.length} Subcategories` : 'Active Category'}</span>
                    <Link href={`/vendors?category=${cat.slug}`} className="text-[#762B46] hover:underline flex items-center gap-1 font-medium">
                      <Eye className="w-3.5 h-3.5" /> View Vendors
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
