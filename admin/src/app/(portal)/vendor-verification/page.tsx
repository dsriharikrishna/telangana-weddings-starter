'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, CheckCircle2, XCircle, MapPin, Phone, Eye, FileText } from 'lucide-react';

export default function VendorVerificationQueuePage() {
  const { language } = useLanguage();

  const [queue, setQueue] = useState([
    {
      id: 'VEN-014',
      businessName: 'Sri Renuka Yellamma Shamiana & Light House',
      ownerName: 'B. Jagadish',
      phone: '98491 55678',
      category: 'Chairs, Tables & Utensils',
      district: 'Narayanpet',
      mandal: 'Damaragidda',
      village: 'Kyathanpally',
      idProof: 'Aadhaar Verified',
      date: 'Submitted Today, 10:15 AM',
    },
    {
      id: 'VEN-015',
      businessName: 'Balaji Sannai & Nadaswara Brundam',
      owner: 'G. Narsing Rao',
      phone: '99890 33421',
      category: 'Band Melam & Sannai',
      district: 'Mahabubnagar',
      mandal: 'Koilkonda',
      village: 'Koilkonda Town',
      idProof: 'Voter ID Uploaded',
      date: 'Submitted Yesterday',
    },
    {
      id: 'VEN-016',
      businessName: 'Muralidhar Digital Studio & 4K Video',
      owner: 'M. Murali',
      phone: '94405 77812',
      category: 'Photography',
      district: 'Narayanpet',
      mandal: 'Makthal',
      village: 'Gudigandla Village',
      idProof: 'Aadhaar + Studio Photo',
      date: 'Submitted 2 days ago',
    },
  ]);

  const handleApprove = (id: string) => {
    setQueue(queue.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-[#292524]">
          {language === 'te' ? 'వెండర్ ధృవీకరణ క్యూ' : 'Manual Vendor Verification Queue'}
        </h1>
        <p className="text-xs text-stone-500 font-body">
          Review business credentials, physical village locations, and identity documents before granting the Verified Trust Badge.
        </p>
      </div>

      <div className="space-y-4">
        {queue.map((item) => (
          <Card key={item.id} className="border-stone-200 bg-white shadow-sm">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[#292524]">{item.businessName}</span>
                  <Badge variant="outline" className="text-amber-700 border-amber-300 text-[10px]">
                    Pending Field Check
                  </Badge>
                </div>
                <div className="text-xs text-stone-600 flex flex-wrap items-center gap-3">
                  <span>Owner: <strong>{item.owner || item.ownerName}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium text-[#762B46]">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.village}, {item.mandal}, {item.district}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-stone-700">Phone: +91 {item.phone}</span>
                </div>
                <div className="text-[11px] text-stone-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-stone-400" />
                  <span>Docs: {item.idProof}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleApprove(item.id)}
                  className="text-xs text-rose-700 border-rose-300 hover:bg-rose-50"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleApprove(item.id)}
                  className="text-xs bg-emerald-700 hover:bg-emerald-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve & Verify
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {queue.length === 0 && (
          <div className="p-8 text-center text-xs text-stone-500 bg-white rounded-xl border border-dashed">
            All vendor registrations have been reviewed and verified.
          </div>
        )}
      </div>
    </div>
  );
}

