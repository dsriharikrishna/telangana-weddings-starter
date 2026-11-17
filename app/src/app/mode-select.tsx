import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore, AppMode } from '@/stores/authStore';
import { useLocationStore } from '@/stores/locationStore';
import { colors } from '@/theme/colors';
import {
  HeartHandshake,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react-native';

export default function ModeSelectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setAppMode = useAuthStore((state) => state.setAppMode);
  const { language, setLanguage } = useLocationStore();

  const handleSelectMode = (mode: AppMode) => {
    setAppMode(mode);
    router.replace('/(tabs)');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1C1917', // stone-900
        paddingTop: Math.max(insets.top, 16),
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header / Language Switcher */}
        <View className="flex-row justify-between items-start mb-4 pt-2">
          <View className="flex-1 mr-3">
            <Text
              className="text-amber-300 font-extrabold text-[11px] uppercase tracking-widest"
              numberOfLines={1}
            >
              {language === 'te' ? 'తెలంగాణ సమగ్ర సేవా వేదిక' : 'Telangana Village Life Services'}
            </Text>
            <Text
              className="text-white text-xl sm:text-2xl font-black mt-1"
              numberOfLines={2}
            >
              {language === 'te' ? 'ఎవరికి ఎలాంటి సేవ కావాలి?' : 'Choose Your Service Mode'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setLanguage(language === 'te' ? 'en' : 'te')}
            activeOpacity={0.8}
            className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full shrink-0 mt-1"
          >
            <Text className="text-amber-200 text-xs font-bold">
              {language === 'te' ? 'English' : 'తెలుగు'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Subtitle */}
        <View className="mb-5 bg-stone-800/60 p-3.5 rounded-2xl border border-stone-700/60">
          <Text className="text-stone-300 text-xs leading-relaxed">
            {language === 'te'
              ? 'పుట్టుక, పెళ్లి, గృహప్రవేశం మొదలుకొని అంత్యక్రియలు, దినవారాల వరకు అన్ని రకాల పనులవారు & సేవలు ఒకే చోట.'
              : 'From birth, housewarming, and weddings to funeral & memorial services — all village service providers in one place.'}
          </Text>
        </View>

        {/* Choice 1: Customer Mode (I Need Services) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleSelectMode('CUSTOMER')}
          className="bg-white rounded-3xl p-5 mb-4 border-2 border-amber-300 shadow-xl"
        >
          <View className="flex-row items-center justify-between mb-3">
            <View style={{ backgroundColor: colors.secondaryLight }} className="p-3 rounded-2xl">
              <HeartHandshake size={26} color={colors.primary} />
            </View>
            <View className="bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shrink-0">
              <Text className="text-amber-900 text-[10px] font-black uppercase">
                {language === 'te' ? 'కుటుంబం & ప్రజలు' : 'Family & Public'}
              </Text>
            </View>
          </View>

          <Text className="text-stone-900 font-black text-xl mb-1.5 leading-snug">
            {language === 'te' ? 'నాకు సేవలు / పనులవారు కావాలి' : 'I Need Event Services'}
          </Text>
          <Text className="text-stone-600 text-xs leading-relaxed mb-3">
            {language === 'te'
              ? 'పెళ్లి పందిరి, వంటవాళ్ళు, పురోహితులు, డప్పులు, అంత్యక్రియల సామగ్రి, వైకుంఠ రథం, టెంట్ హౌస్ నిపుణులతో నేరుగా మాట్లాడండి.'
              : 'Connect directly via phone/WhatsApp with local priests, feast cooks, tent house, funeral bier, freezer vans, and artists.'}
          </Text>

          {/* Quick Badges */}
          <View className="flex-row flex-wrap gap-1.5 mb-3">
            <View className="bg-stone-100 px-2 py-0.5 rounded-md">
              <Text className="text-stone-700 text-[10px] font-bold">
                {language === 'te' ? '🌺 శుభకార్యాలు' : '🌺 Auspicious'}
              </Text>
            </View>
            <View className="bg-stone-100 px-2 py-0.5 rounded-md">
              <Text className="text-stone-700 text-[10px] font-bold">
                {language === 'te' ? '🕊️ అశుభ / దినవారాలు' : '🕊️ Bereavement'}
              </Text>
            </View>
            <View className="bg-stone-100 px-2 py-0.5 rounded-md">
              <Text className="text-stone-700 text-[10px] font-bold">
                {language === 'te' ? '📞 ఉచిత కాల్ & WhatsApp' : '📞 Direct Contact'}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between pt-3 border-t border-stone-100">
            <Text className="text-amber-900 font-extrabold text-xs">
              {language === 'te' ? 'సేవలను అన్వేషించండి' : 'Enter Services Marketplace'}
            </Text>
            <View style={{ backgroundColor: colors.primary }} className="p-2 rounded-full">
              <ArrowRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Choice 2: Vendor Mode (I Am a Provider) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleSelectMode('VENDOR')}
          className="bg-stone-800 rounded-3xl p-5 mb-4 border-2 border-stone-700 shadow-xl"
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="bg-stone-700 p-3 rounded-2xl">
              <Briefcase size={26} color="#FBBF24" />
            </View>
            <View className="bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 shrink-0">
              <Text className="text-amber-300 text-[10px] font-black uppercase">
                {language === 'te' ? 'పనులవారు & వ్యాపారం' : 'Local Vendor'}
              </Text>
            </View>
          </View>

          <Text className="text-white font-black text-xl mb-1.5 leading-snug">
            {language === 'te' ? 'నేను సేవా నిపుణుడిని / వెండర్‌ను' : 'I Am a Local Service Provider'}
          </Text>
          <Text className="text-stone-400 text-xs leading-relaxed mb-3">
            {language === 'te'
              ? 'వంటవాళ్ళు, టెంట్ హౌస్, డ్రైవర్లు, పురోహితులు, వాయిద్యకారులు — మీ మండలంలో వచ్చే కొత్త కస్టమర్ ఆర్డర్లు & లీడ్స్ నేరుగా పొందండి.'
              : 'Cooks, tent houses, hearse drivers, priests, photographers — receive direct customer inquiries and booking calls in your mandal.'}
          </Text>

          <View className="flex-row items-center justify-between pt-3 border-t border-stone-700">
            <Text className="text-amber-300 font-extrabold text-xs">
              {language === 'te' ? 'వెండర్ డ్యాష్‌బోర్డ్ తెరవండి' : 'Open Business Dashboard'}
            </Text>
            <View className="bg-amber-400 p-2 rounded-full">
              <ArrowRight size={16} color="#4E0D10" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Footer Info */}
        <View className="mt-2 items-center">
          <Text className="text-stone-500 text-[10px] text-center leading-tight">
            {language === 'te'
              ? 'తెలంగాణ నారాయణపేట, మహబూబ్‌నగర్ & అన్ని మండలాల సమగ్ర వేదిక'
              : 'Covering Narayanpet, Mahabubnagar and all Telangana Mandals'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
