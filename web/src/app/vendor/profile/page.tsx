'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Award, Save } from 'lucide-react';

export default function VendorProfilePage() {
  const { language } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    businessName: 'Sri Raghavendra Band & Sannai Melam',
    ownerName: 'K. Venkatesham',
    phone: '98480 12345',
    email: 'raghavendra.melam@gmail.com',
    district: 'Narayanpet',
    mandal: 'Makthal',
    village: 'Makthal Town',
    primaryService: 'Band Melam & Sannai',
    experienceYears: '14',
    about: 'Providing traditional Sannai Melam and high-energy brass Band Melam for rural weddings across Narayanpet and Mahabubnagar districts.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#292524]">
            {language === 'te' ? 'వ్యాపార ప్రొఫైల్' : 'Business Profile'}
          </h1>
          <p className="text-xs text-stone-500 font-body">
            {language === 'te' ? 'మీ వ్యాపార వివరాలు మరియు సంప్రదింపు సమాచారాన్ని నవీకరించండి.' : 'Manage public business profile and contact information.'}
          </p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 w-fit">
          <Award className="w-3.5 h-3.5 mr-1" />
          {language === 'te' ? 'ధృవీకరించబడిన ప్రొఫైల్' : 'Verified Business'}
        </Badge>
      </div>

      <Card className="border-stone-200 shadow-sm bg-white">
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'వ్యాపారం పేరు' : 'Business Name'} *
                </label>
                <Input
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'యజమాని పేరు' : 'Owner / Manager Name'} *
                </label>
                <Input
                  value={profile.ownerName}
                  onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'మొబైల్ నంబర్' : 'Phone Number (Primary)'} *
                </label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'ఈమెయిల్' : 'Email Address'}
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'జిల్లా' : 'District'} *
                </label>
                <Input
                  value={profile.district}
                  onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'మండలం & ఊరు' : 'Mandal & Village'} *
                </label>
                <Input
                  value={`${profile.mandal}, ${profile.village}`}
                  onChange={(e) => setProfile({ ...profile, mandal: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'అనుభవం (సంవత్సరాలు)' : 'Years of Experience'}
                </label>
                <Input
                  value={profile.experienceYears}
                  onChange={(e) => setProfile({ ...profile, experienceYears: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  {language === 'te' ? 'ప్రధాన సేవ' : 'Primary Service Category'}
                </label>
                <Input
                  value={profile.primaryService}
                  readOnly
                  className="bg-stone-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">
                {language === 'te' ? 'వ్యాపార వివరణ' : 'About Your Business & Traditional Heritage'}
              </label>
              <textarea
                rows={4}
                className="w-full p-3 text-sm rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#762B46]"
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved && (
                <span className="text-xs font-medium text-emerald-700">
                  {language === 'te' ? 'వివరాలు విజయవంతంగా సేవ్ చేయబడ్డాయి!' : 'Profile details saved successfully!'}
                </span>
              )}
              <Button type="submit" variant="primary" className="ml-auto text-sm font-medium">
                <Save className="w-4 h-4 mr-2" />
                {language === 'te' ? 'మార్పులను సేవ్ చేయండి' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

