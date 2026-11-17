import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { HeaderBar } from '@/components/HeaderBar';
import { useAuthStore } from '@/stores/authStore';
import { useLocationStore } from '@/stores/locationStore';
import { colors } from '@/theme/colors';
import {
  User,
  LogIn,
  LogOut,
  ShieldCheck,
  HeartHandshake,
  ArrowLeftRight,
  Briefcase,
  Sparkles,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { isAuthenticated, user, logout, appMode, setAppMode } = useAuthStore();
  const { language } = useLocationStore();
  const isVendorMode = appMode === 'VENDOR';

  const toggleMode = () => {
    setAppMode(isVendorMode ? 'CUSTOMER' : 'VENDOR');
  };

  return (
    <View className="flex-1 bg-stone-50">
      <HeaderBar />

      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        {/* Switch Mode Card */}
        <View className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-3">
              <View className="flex-row items-center mb-1">
                <Briefcase size={16} color={isVendorMode ? '#D97706' : colors.primary} />
                <Text className="text-stone-500 font-bold text-[11px] uppercase tracking-wider ml-1.5">
                  {language === 'te' ? 'ప్రస్తుత మోడ్' : 'Current Mode'}
                </Text>
              </View>
              <Text className="text-stone-900 font-black text-lg">
                {isVendorMode
                  ? language === 'te' ? 'వ్యాపార భాగస్వామి (వెండర్)' : 'Vendor & Business Mode'
                  : language === 'te' ? 'పెళ్లివారు / కస్టమర్' : 'Customer & Family Mode'}
              </Text>
              <Text className="text-stone-500 text-xs mt-0.5">
                {isVendorMode
                  ? language === 'te'
                    ? 'మీరు ఇప్పుడు కస్టమర్ ఆర్డర్లు మరియు లీడ్స్ చూస్తున్నారు'
                    : 'Managing incoming wedding leads & quotes'
                  : language === 'te'
                    ? 'మీరు స్థానిక వెండర్లను అన్వేషిస్తున్నారు'
                    : 'Browsing & hiring local wedding professionals'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={toggleMode}
              style={{ backgroundColor: isVendorMode ? '#D97706' : colors.primary }}
              className="p-3.5 rounded-2xl flex-row items-center shadow-sm"
            >
              <ArrowLeftRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/mode-select')}
            className="mt-4 pt-3 border-t border-stone-100 flex-row items-center justify-between"
          >
            <Text className="text-amber-800 text-xs font-bold">
              {language === 'te' ? 'ఎంపిక స్క్రీన్‌కు తిరిగి వెళ్లండి' : 'Choose Mode Selection Screen'}
            </Text>
            <Sparkles size={14} color="#D4AF37" />
          </TouchableOpacity>
        </View>

        {isAuthenticated && user ? (
          <View>
            <View className="bg-white p-6 rounded-3xl border border-stone-200 mb-4 items-center">
              <View style={{ backgroundColor: colors.secondaryLight }} className="w-16 h-16 rounded-full items-center justify-center mb-3">
                <User size={32} color={colors.primary} />
              </View>
              <Text className="text-stone-900 font-extrabold text-lg">{user.fullName || 'Valued User'}</Text>
              <Text className="text-stone-500 font-medium text-xs mt-0.5">{user.phone}</Text>

              <View className="flex-row items-center mt-3 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <ShieldCheck size={14} color="#D4AF37" />
                <Text className="text-amber-900 font-bold text-xs ml-1">
                  Roles: {user.roles.join(', ')}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={logout}
              className="bg-red-50 border border-red-200 p-4 rounded-2xl flex-row items-center justify-center"
            >
              <LogOut size={18} color="#DC2626" />
              <Text className="text-red-700 font-bold text-sm ml-2">Log Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm items-center text-center">
            <View style={{ backgroundColor: colors.secondaryLight }} className="p-4 rounded-full mb-3">
              <User size={36} color={colors.primary} />
            </View>
            <Text className="text-stone-900 font-extrabold text-lg mb-1">
              {isVendorMode
                ? language === 'te' ? 'వెండర్ ఖాతా లాగిన్' : 'Vendor Business Login'
                : language === 'te' ? 'కస్టమర్ ఖాతా లాగిన్' : 'Customer Account Login'}
            </Text>
            <Text className="text-stone-500 text-xs text-center mb-6 leading-relaxed">
              {isVendorMode
                ? language === 'te'
                  ? 'మీ మొబైల్ నంబర్ మరియు OTP తో లాగిన్ అయి మీ వివాహ లీడ్స్ & బుకింగ్‌లను నిర్వహించండి.'
                  : 'Log in with your registered vendor mobile number to manage leads, service packages, and wallet.'
                : language === 'te'
                  ? 'మీ మొబైల్ నంబర్ మరియు OTP తో లాగిన్ అయి గతంలో పంపిన విచారణలు & సేవ్ చేసిన వివరాలు చూడండి.'
                  : 'Log in with your mobile number to view past enquiries, save favourite vendors, and track status.'}
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/auth/login')}
              style={{ backgroundColor: isVendorMode ? '#D97706' : colors.primary }}
              className="w-full py-3.5 rounded-xl flex-row items-center justify-center shadow-sm"
            >
              <LogIn size={18} color="#FFFFFF" />
              <Text className="text-white font-bold text-sm ml-2">Login / Register with OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Support Card */}
        <View className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mt-6">
          <View className="flex-row items-center mb-2">
            <HeartHandshake size={20} color="#701A1E" />
            <Text className="text-stone-900 font-bold text-sm ml-2">Telangana Weddings Support</Text>
          </View>
          <Text className="text-stone-600 text-xs leading-relaxed">
            Need direct assistance with vendor booking or vendor partnership? Contact our regional helpline at +91 94940 00000.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

