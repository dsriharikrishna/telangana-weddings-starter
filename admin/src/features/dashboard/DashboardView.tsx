'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Store, CalendarCheck, ShieldCheck, 
  MapPin, ArrowUpRight, PhoneCall, Loader2, CreditCard
} from 'lucide-react';
import { useAdminDashboardMetrics, useAdminEnquiries } from '@/hooks/useAdminQueries';
import { AssistedEnquiry } from '@/types';

export function DashboardView() {
  const { language } = useLanguage();
  const { data: metrics, isLoading } = useAdminDashboardMetrics();
  const { data: enquiries } = useAdminEnquiries();

  const stats = [
    { 
      titleEn: 'Total Registered Vendors', 
      titleTe: 'మొత్తం వెండర్లు', 
      value: isLoading ? '...' : (metrics?.totalVendors?.toString() ?? '148'), 
      sub: `${metrics?.activeDistricts ?? 2} Districts Connected (Narayanpet & Mahabubnagar)`, 
      icon: Store, 
      color: 'text-[#762B46]' 
    },
    { 
      titleEn: 'Pending Verification', 
      titleTe: 'ధృవీకరణ పెండింగ్', 
      value: isLoading ? '...' : (metrics?.pendingVerification?.toString() ?? '14'), 
      sub: 'Action required in KYC queue', 
      icon: ShieldCheck, 
      color: 'text-amber-600' 
    },
    { 
      titleEn: 'Gross Bookings', 
      titleTe: 'మొత్తం బుకింగ్‌లు', 
      value: isLoading ? '...' : (metrics?.totalBookings?.toString() ?? '312'), 
      sub: '₹48.6L Gross Volume', 
      icon: CalendarCheck, 
      color: 'text-emerald-700' 
    },
    { 
      titleEn: 'Assisted Rural Enquiries', 
      titleTe: 'అసిస్టెడ్ విచారణలు', 
      value: isLoading ? '...' : (metrics?.assistedEnquiriesCount?.toString() ?? '86'), 
      sub: 'Phone callbacks pending', 
      icon: PhoneCall, 
      color: 'text-[#C5A46D]' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'అడ్మిన్ డాష్‌బోర్డ్' : 'Platform Operations Overview'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            {language === 'te' ? 'నారాయణపేట మరియు మహబూబ్ నగర్ జిల్లాల ప్రత్యక్ష విశ్లేషణ.' : 'Real-time wedding bookings and vendor operations across Telangana districts.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#762B46]" />}
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
            System Live: {metrics?.activeDistricts ?? 2} Districts Active
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="border border-[#E7DECF] bg-white shadow-sm">
              <CardContent className="p-4 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-500">
                    {language === 'te' ? s.titleTe : s.titleEn}
                  </p>
                  <p className="text-2xl font-bold text-[#292524] mt-1 font-heading">{s.value}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{s.sub}</p>
                </div>
                <div className={`p-2.5 rounded-xl bg-stone-50 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Priority Queues & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries & Callbacks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#292524] font-heading">
              {language === 'te' ? 'ఇటీవలి సహాయక విచారణలు' : 'Recent Assisted Enquiries'}
            </h2>
            <Link href="/enquiries" className="text-xs font-semibold text-[#762B46] hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="border border-[#E7DECF] bg-white shadow-sm divide-y divide-stone-100">
            {(enquiries?.slice(0, 4) ?? []).map((enq: AssistedEnquiry) => (
              <div key={enq.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-800">{enq.customerName}</span>
                    <Badge variant="outline" className="text-[10px] text-amber-700 bg-amber-50 border-amber-200">
                      {enq.status}
                    </Badge>
                  </div>
                  <div className="text-stone-500 flex items-center gap-2 text-[11px]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C5A46D]" />
                      {enq.villageOrTown}, {enq.mandal}
                    </span>
                    <span>&bull;</span>
                    <span className="font-medium text-stone-700">{enq.categorySlug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/enquiries`}>
                    <Button variant="outline" size="sm" className="h-8 text-[11px] border-stone-200">
                      Call Customer
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Action Center / Quick Ops */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#292524] font-heading">
            {language === 'te' ? 'త్వరిత చర్యలు' : 'Operational Shortcuts'}
          </h2>
          <Card className="border border-[#E7DECF] bg-white shadow-sm p-4 space-y-3">
            <Link href="/vendor-verification" className="block p-3 rounded-xl border border-stone-100 hover:border-[#C5A46D] hover:bg-stone-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-stone-800">Review Pending KYC</span>
                </div>
                <Badge className="bg-amber-100 text-amber-800 text-[10px]">14 Pending</Badge>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">Review Aadhaar & Shop acts for rural vendors</p>
            </Link>

            <Link href="/vendors" className="block p-3 rounded-xl border border-stone-100 hover:border-[#C5A46D] hover:bg-stone-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Store className="w-4 h-4 text-[#762B46]" />
                  <span className="text-xs font-semibold text-stone-800">Browse Vendor Directory</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <p className="text-[11px] text-stone-500 mt-1">148 vendors across 18 distinct categories</p>
            </Link>

            <Link href="/commissions" className="block p-3 rounded-xl border border-stone-100 hover:border-[#C5A46D] hover:bg-stone-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-stone-800">Process Weekly Settlements</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
              </div>
              <p className="text-[11px] text-stone-500 mt-1">Direct NEFT/UPI payouts to vendor bank accounts</p>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

