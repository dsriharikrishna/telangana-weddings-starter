'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, MapPin, FileText, Loader2 } from 'lucide-react';
import { useAdminVendors, useVerifyVendor } from '@/features/vendors/hooks/useAdminVendors';
import { PageHeader } from '@/components/common/PageHeader';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';
import { StatusBadge } from '@/components/common/StatusBadge';

export function VendorVerificationView() {
  const { language } = useLanguage();
  const { data: vendors, isLoading } = useAdminVendors();
  const { mutate: verifyVendor, isPending } = useVerifyVendor();

  const pendingQueue = (vendors || []).filter(
    (v) => !v.isVerified
  );

  const handleVerify = (vendorId: string, approve: boolean) => {
    verifyVendor({
      vendorId,
      status: approve ? 'VERIFIED' : 'REJECTED',
      notes: approve ? 'Field verification passed by Admin' : 'Documents insufficient or incomplete',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === 'te' ? 'వెండర్ ధృవీకరణ క్యూ' : 'Manual Vendor Verification Queue'}
        description="Review business credentials, physical village locations, and identity documents before granting the Verified Trust Badge."
        actions={
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">
            {pendingQueue.length} Pending Verifications
          </Badge>
        }
      />

      {isLoading ? (
        <LoadingState message="Loading verification requests from backend..." />
      ) : (
        <div className="space-y-4">
          {pendingQueue.map((item) => (
            <Card key={item.id} className="border-stone-200 bg-white shadow-sm">
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-[#292524]">{item.businessName}</span>
                    <StatusBadge status="pending" label="Pending Field Check" />
                  </div>
                  <div className="text-xs text-stone-600 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 font-medium text-[#762B46]">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.townOrVillage || item.mandal}, {item.district}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-stone-700">Phone: {item.phone || 'N/A'}</span>
                    <span>•</span>
                    <span className="text-stone-400">Exp: {item.yearsOfExperience} yrs</span>
                  </div>
                  <div className="text-[11px] text-stone-400 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-stone-400" />
                    <span>KYC: Government ID & Business Location Check</span>
                    <span>•</span>
                    <span>Category: {item.categorySlug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={isPending}
                    onClick={() => handleVerify(item.id, false)}
                    className="text-xs text-rose-700 border-rose-300 hover:bg-rose-50"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleVerify(item.id, true)}
                    className="text-xs bg-emerald-700 hover:bg-emerald-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve & Verify
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingQueue.length === 0 && (
            <EmptyState
              title="All Vendors Reviewed"
              description="All vendor registrations have been reviewed and verified for this cycle."
              icon={CheckCircle2}
              className="bg-white rounded-xl border border-dashed border-stone-200"
            />
          )}
        </div>
      )}
    </div>
  );
}
