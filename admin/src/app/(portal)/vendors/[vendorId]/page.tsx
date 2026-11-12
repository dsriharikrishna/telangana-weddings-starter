import React from 'react';
import { VendorDetailView } from '@/features/vendors';

export default function AdminVendorDetailPage({ params }: { params: Promise<{ vendorId: string }> }) {
  const resolvedParams = React.use(params);
  return <VendorDetailView vendorId={resolvedParams.vendorId} />;
}
