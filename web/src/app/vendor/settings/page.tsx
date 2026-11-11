'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Settings, Shield, Bell, Smartphone, Save } from 'lucide-react';

export default function VendorSettingsPage() {
  const { language } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-[#292524]">
          {language === 'te' ? 'ఖాతా సెట్టింగులు' : 'Account & Alert Settings'}
        </h1>
        <p className="text-xs text-stone-500 font-body">
          {language === 'te' ? 'మీ ఖాతా భద్రత మరియు నోటిఫికేషన్ ఎంపికలను నిర్వహించండి.' : 'Manage SMS, WhatsApp alert preferences, and account credentials.'}
        </p>
      </div>

      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <h2 className="text-base font-bold font-heading text-[#292524] mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#762B46]" />
                {language === 'te' ? 'నోటిఫికేషన్ ఎంపికలు' : 'Instant Lead Notifications'}
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#762B46] rounded focus:ring-[#762B46]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#292524]">
                      {language === 'te' ? 'వాట్సాప్ ద్వారా తక్షణ బుకింగ్ సమాచారం' : 'Receive instant WhatsApp alerts for enquiries'}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {language === 'te' ? 'కస్టమర్ విచారణ రాగానే వాట్సాప్ మెసేజ్ వస్తుంది.' : 'Get notified the moment a rural customer requests your service.'}
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#762B46] rounded focus:ring-[#762B46]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#292524]">
                      {language === 'te' ? 'SMS హెచ్చరికలు (గ్రామీణ ప్రాంతాలకు)' : 'SMS notifications (for weak internet areas)'}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {language === 'te' ? 'ఇంటర్నెట్ లేకపోయినా మొబైల్‌కు సాధారణ మెసేజ్ ద్వారా సమాచారం వస్తుంది.' : 'Standard text message delivered even when 4G mobile data is unavailable.'}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <h2 className="text-base font-bold font-heading text-[#292524] mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#762B46]" />
                {language === 'te' ? 'మొబైల్ లాగిన్ పిన్ మార్పు' : 'Security PIN / Password'}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    {language === 'te' ? 'కొత్త 4-అంకెల లాగిన్ పిన్' : 'New 4-Digit Login PIN'}
                  </label>
                  <Input type="password" maxLength={4} placeholder="••••" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    {language === 'te' ? 'పిన్ ధృవీకరించండి' : 'Confirm PIN'}
                  </label>
                  <Input type="password" maxLength={4} placeholder="••••" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved && (
                <span className="text-xs font-medium text-emerald-700">
                  {language === 'te' ? 'సెట్టింగులు నవీకరించబడ్డాయి!' : 'Settings updated successfully!'}
                </span>
              )}
              <Button type="submit" variant="primary" className="ml-auto text-sm font-medium">
                <Save className="w-4 h-4 mr-2" />
                {language === 'te' ? 'సెట్టింగులను భద్రపరచండి' : 'Save Preferences'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

