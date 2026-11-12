'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Shield, Globe } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { FormInput } from '@/components/forms/FormInput';
import { adminSettingsSchema, AdminSettingsFormValues } from '@/lib/validations/settings.schema';

export default function AdminSettingsPage() {
  const { language } = useLanguage();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminSettingsFormValues>({
    resolver: zodResolver(adminSettingsSchema),
    defaultValues: {
      officialHelpline: '+91 98765 43210',
      whatsappNumber: '+91 98765 43210',
      publicEmail: 'support@telanganaweddings.com',
      listingFeePaise: 99,
    },
  });

  const onSubmit = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === 'te' ? 'సిస్టమ్ సెట్టింగులు' : 'Platform Configuration & Settings'}
        description="Manage platform parameters, support helpline numbers, and district rollout flags."
      />

      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-base font-bold font-heading text-[#292524] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#762B46]" />
                Customer Support & Helpline Configuration
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Official Toll-Free / Helpline"
                  type="text"
                  error={errors.officialHelpline?.message}
                  {...register('officialHelpline')}
                />
                <FormInput
                  label="WhatsApp Support Number"
                  type="text"
                  error={errors.whatsappNumber?.message}
                  {...register('whatsappNumber')}
                />
                <FormInput
                  label="Public Contact Email"
                  type="email"
                  error={errors.publicEmail?.message}
                  {...register('publicEmail')}
                />
                <FormInput
                  label="Matchmaking Lead Fee (₹)"
                  type="number"
                  error={errors.listingFeePaise?.message}
                  {...register('listingFeePaise')}
                />
              </div>
            </div>

            <div className="pt-4 border-t space-y-4">
              <h2 className="text-base font-bold font-heading text-[#292524] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#762B46]" />
                Active Districts Deployment
              </h2>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 bg-stone-50">
                  <input type="checkbox" defaultChecked disabled className="w-4 h-4 text-[#762B46]" />
                  <div>
                    <div className="text-xs font-semibold text-stone-800">Narayanpet District (నారాయణపేట)</div>
                    <div className="text-[11px] text-stone-500">11 mandals enabled with full village-level distance calculation.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 bg-stone-50">
                  <input type="checkbox" defaultChecked disabled className="w-4 h-4 text-[#762B46]" />
                  <div>
                    <div className="text-xs font-semibold text-stone-800">Mahabubnagar District (మహబూబ్ నగర్)</div>
                    <div className="text-[11px] text-stone-500">16 mandals enabled with verified vendor matching.</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved && (
                <span className="text-xs font-medium text-emerald-700">
                  System settings saved successfully!
                </span>
              )}
              <Button type="submit" disabled={isSubmitting} variant="primary" className="ml-auto text-sm font-medium">
                <Save className="w-4 h-4 mr-2" /> Save Configuration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
