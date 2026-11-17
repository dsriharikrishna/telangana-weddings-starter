import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HeaderBar } from '@/components/HeaderBar';
import {
  requestCallback,
  fetchVendorPortalWallet,
  rechargeVendorWallet,
} from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';
import {
  PhoneCall,
  CheckCircle2,
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Zap,
  ShieldCheck,
} from 'lucide-react-native';

export default function AssistedOrWalletScreen() {
  const queryClient = useQueryClient();
  const { district, mandal, language } = useLocationStore();
  const appMode = useAuthStore((state) => state.appMode);
  const isVendorMode = appMode === 'VENDOR';

  // --- Customer State ---
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Vendor State ---
  const [selectedPack, setSelectedPack] = useState<number>(5100); // default ₹51

  // Customer Mutation
  const customerMutation = useMutation({
    mutationFn: requestCallback,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err: any) => {
      Alert.alert('Error', err?.message || 'Could not submit request.');
    },
  });

  // Vendor Wallet Query
  const {
    data: walletData,
    isLoading: isLoadingWallet,
    refetch: refetchWallet,
  } = useQuery({
    queryKey: ['vendorPortalWallet'],
    queryFn: () => fetchVendorPortalWallet(),
    enabled: isVendorMode,
  });

  // Vendor Wallet Recharge Mutation
  const rechargeMutation = useMutation({
    mutationFn: (amountPaise: number) => rechargeVendorWallet(amountPaise),
    onSuccess: (res) => {
      Alert.alert(
        language === 'te' ? 'రీఛార్జ్ విజయవంతమైంది!' : 'Recharge Successful!',
        language === 'te'
          ? `మీ వాలెట్‌కు నిధులు విజయవంతంగా జమ చేయబడ్డాయి.`
          : 'Your wallet has been recharged successfully.'
      );
      queryClient.invalidateQueries({ queryKey: ['vendorPortalWallet'] });
    },
    onError: (err: any) => {
      Alert.alert('Recharge Failed', err?.message || 'Could not process recharge.');
    },
  });

  // =========================================================================
  // 1. CUSTOMER ASSISTED CONCIERGE VIEW
  // =========================================================================
  if (!isVendorMode) {
    const handleCustomerSubmit = () => {
      if (!customerName.trim() || !customerPhone.trim()) {
        Alert.alert('Required', 'Please enter your name and 10-digit mobile number.');
        return;
      }
      customerMutation.mutate({
        customerName,
        customerPhone,
        district,
        mandal,
        notes,
      });
    };

    return (
      <View className="flex-1 bg-stone-50">
        <HeaderBar />

        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          <View className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm mb-6">
            <View className="flex-row items-center mb-4">
              <View style={{ backgroundColor: colors.secondaryLight }} className="p-3 rounded-2xl mr-3">
                <PhoneCall size={24} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-stone-900 font-black text-xl">
                  {language === 'te' ? 'ఉచిత గ్రామ సలహాదారు' : 'Free Event Concierge'}
                </Text>
                <Text className="text-amber-800 text-xs font-semibold">
                  {language === 'te' ? 'నేరుగా ఫోన్ మాట్లాడండి' : 'Assisted Phone Booking'}
                </Text>
              </View>
            </View>

            {isSuccess ? (
              <View className="items-center py-8">
                <CheckCircle2 size={54} color="#15803D" className="mb-3" />
                <Text className="text-stone-900 font-bold text-lg mb-1 text-center">
                  {language === 'te' ? 'అభ్యర్థన అందింది!' : 'Request Received!'}
                </Text>
                <Text className="text-stone-600 text-xs text-center leading-relaxed">
                  {language === 'te'
                    ? 'మా స్థానిక సమన్వయకర్త 15 నిమిషాల్లో మీకు ఫోన్ చేసి తగిన పనులవారిని మాట్లాడుతారు.'
                    : 'Our local coordinator will call you back shortly.'}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsSuccess(false)}
                  className="mt-6 bg-stone-100 px-6 py-2.5 rounded-full"
                >
                  <Text className="text-stone-800 text-xs font-bold">
                    {language === 'te' ? 'మరో అభ్యర్థన చేయండి' : 'Submit Another Request'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text className="text-stone-700 font-bold text-xs mb-1">
                  {language === 'te' ? 'మీ పేరు (Full Name) *' : 'Your Name *'}
                </Text>
                <TextInput
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder={language === 'te' ? 'ఉదా: వెంకటేశ్వర్లు' : 'e.g. Venkateshwarlu'}
                  placeholderTextColor="#9CA3AF"
                  className="bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 font-medium text-sm mb-3"
                />

                <Text className="text-stone-700 font-bold text-xs mb-1">
                  {language === 'te' ? 'మొబైల్ నంబర్ (Phone) *' : 'Mobile Number *'}
                </Text>
                <TextInput
                  value={customerPhone}
                  onChangeText={setCustomerPhone}
                  keyboardType="phone-pad"
                  placeholder="98480xxxxx"
                  placeholderTextColor="#9CA3AF"
                  className="bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 font-medium text-sm mb-3"
                />

                <Text className="text-stone-700 font-bold text-xs mb-1">
                  {language === 'te' ? 'ఏ విధమైన సహాయం కావాలి? (వివరాలు)' : 'Event Requirements'}
                </Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                  placeholder={
                    language === 'te'
                      ? 'ఉదా: మా ఊరిలో పెళ్లి పందిరి మరియు 500 మందికి వంటవాళ్ళు కావాలి.'
                      : 'e.g. Need tent house and cooks for 500 people.'
                  }
                  placeholderTextColor="#9CA3AF"
                  className="bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 text-sm mb-4"
                  style={{ textAlignVertical: 'top' }}
                />

                <TouchableOpacity
                  onPress={handleCustomerSubmit}
                  disabled={customerMutation.isPending}
                  style={{ backgroundColor: colors.primary }}
                  className="p-3.5 rounded-xl items-center shadow-xs"
                >
                  {customerMutation.isPending ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text className="text-white font-bold text-sm">
                      {language === 'te' ? 'ఉచిత కాల్ అభ్యర్థించండి' : 'Request Free Callback'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  // =========================================================================
  // 2. VENDOR WALLET & TRANSACTIONS VIEW
  // =========================================================================
  const walletRupees = ((walletData?.balancePaise || 0) / 100).toFixed(0);
  const transactions = walletData?.transactions || [];

  return (
    <View className="flex-1 bg-stone-100">
      <HeaderBar />

      <ScrollView className="flex-1 px-4 pt-3 pb-8" showsVerticalScrollIndicator={false}>
        {/* Wallet Balance Hero Card */}
        <View className="bg-gradient-to-r from-amber-900 to-amber-950 bg-amber-900 rounded-3xl p-5 mb-4 shadow-md">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Wallet size={20} color="#FDE68A" />
              <Text className="text-amber-200 font-extrabold text-xs ml-2 uppercase tracking-widest">
                {language === 'te' ? 'వ్యాపార వాలెట్ బ్యాలెన్స్' : 'Vendor Wallet'}
              </Text>
            </View>
            <View className="bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
              <Text className="text-amber-200 text-[10px] font-black uppercase">
                {language === 'te' ? 'ఖాతా సక్రియంగా ఉంది' : 'Active'}
              </Text>
            </View>
          </View>

          <View className="flex-row items-baseline mb-2">
            <Text className="text-white text-4xl font-black">₹{walletRupees}</Text>
            <Text className="text-amber-200 text-sm font-bold ml-2">
              (రూపాయల నిల్వ)
            </Text>
          </View>

          <View className="flex-row items-center bg-black/25 px-3 py-2 rounded-2xl">
            <Zap size={14} color="#FDE68A" />
            <Text className="text-amber-100 text-xs font-bold ml-1.5 flex-1">
              {walletData?.balanceCredits || 0} {language === 'te' ? 'కస్టమర్ ఫోన్ నంబర్ అన్‌లాక్ క్రెడిట్లు మిగిలి ఉన్నాయి' : 'Lead Credits Available'}
            </Text>
          </View>
        </View>

        {/* Quick Sachet Recharge Packs */}
        <View className="bg-white rounded-3xl p-5 mb-4 border border-stone-200 shadow-2xs">
          <View className="flex-row items-center mb-1">
            <Sparkles size={16} color="#D97706" />
            <Text className="text-stone-900 font-black text-base ml-1.5">
              {language === 'te' ? 'శకునం & లీడ్ రీఛార్జ్ ప్యాక్‌లు' : 'Sachet Recharge Packs'}
            </Text>
          </View>
          <Text className="text-stone-500 text-xs mb-3">
            {language === 'te'
              ? 'ఫోన్‌పే లేదా గూగుల్ పే ద్వారా తక్షణమే రీఛార్జ్ చేయండి'
              : 'Instant UPI top-up for ₹21 services & customer lead unlocks'}
          </Text>

          <View className="gap-2.5 mb-4">
            {/* Pack 1: ₹51 */}
            <TouchableOpacity
              onPress={() => setSelectedPack(5100)}
              activeOpacity={0.85}
              className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between ${
                selectedPack === 5100
                  ? 'border-amber-600 bg-amber-50/60'
                  : 'border-stone-200 bg-stone-50'
              }`}
            >
              <View>
                <Text className="text-stone-900 font-black text-sm">
                  {language === 'te' ? 'శకునం ప్యాక్' : 'Shagun Starter Pack'}
                </Text>
                <Text className="text-stone-500 text-[11px] mt-0.5">
                  ₹51 వాలెట్ + 1 బోనస్ లీడ్ అన్‌లాక్
                </Text>
              </View>
              <Text className="text-amber-900 font-black text-lg">₹51</Text>
            </TouchableOpacity>

            {/* Pack 2: ₹116 */}
            <TouchableOpacity
              onPress={() => setSelectedPack(11600)}
              activeOpacity={0.85}
              className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between ${
                selectedPack === 11600
                  ? 'border-amber-600 bg-amber-50/60'
                  : 'border-stone-200 bg-stone-50'
              }`}
            >
              <View>
                <View className="flex-row items-center">
                  <Text className="text-stone-900 font-black text-sm">
                    {language === 'te' ? 'గ్రామ వ్యాపార ప్యాక్' : 'Village Pro Pack'}
                  </Text>
                  <View className="ml-2 bg-amber-200 px-2 py-0.2 rounded-full">
                    <Text className="text-amber-950 text-[9px] font-black uppercase">
                      Popular
                    </Text>
                  </View>
                </View>
                <Text className="text-stone-500 text-[11px] mt-0.5">
                  ₹116 వాలెట్ + 3 బోనస్ లీడ్ అన్‌లాక్‌లు
                </Text>
              </View>
              <Text className="text-amber-900 font-black text-lg">₹116</Text>
            </TouchableOpacity>

            {/* Pack 3: ₹501 */}
            <TouchableOpacity
              onPress={() => setSelectedPack(50100)}
              activeOpacity={0.85}
              className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between ${
                selectedPack === 50100
                  ? 'border-amber-600 bg-amber-50/60'
                  : 'border-stone-200 bg-stone-50'
              }`}
            >
              <View>
                <Text className="text-stone-900 font-black text-sm">
                  {language === 'te' ? 'శుభకార్యాల సీజన్ ప్యాక్' : 'Festival Season Pack'}
                </Text>
                <Text className="text-stone-500 text-[11px] mt-0.5">
                  ₹501 వాలెట్ + 15 బోనస్ లీడ్ అన్‌లాక్‌లు
                </Text>
              </View>
              <Text className="text-amber-900 font-black text-lg">₹501</Text>
            </TouchableOpacity>
          </View>

          {/* Recharge Submit Button */}
          <TouchableOpacity
            onPress={() => rechargeMutation.mutate(selectedPack)}
            disabled={rechargeMutation.isPending}
            activeOpacity={0.85}
            className="bg-amber-600 p-4 rounded-2xl items-center shadow-sm"
          >
            {rechargeMutation.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-black text-sm">
                {language === 'te'
                  ? `₹${(selectedPack / 100).toFixed(0)} తక్షణ రీఛార్జ్ చేయండి (PhonePe / GPay)`
                  : `Top Up ₹${(selectedPack / 100).toFixed(0)} Now`}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Transaction History Ledger */}
        <View className="bg-white rounded-3xl p-5 border border-stone-200 shadow-2xs">
          <Text className="text-stone-900 font-black text-base mb-3">
            {language === 'te' ? 'లావాదేవీల చరిత్ర (Passbook)' : 'Transaction Ledger'}
          </Text>

          {transactions.length === 0 ? (
            <Text className="text-stone-500 text-xs py-4 text-center">
              {language === 'te' ? 'ఇంకా లావాదేవీలు లేవు' : 'No recent transactions.'}
            </Text>
          ) : (
            transactions.map((tx) => {
              const isCredit = (tx.amountPaise || 0) > 0 || tx.amount > 0;
              const formattedDate = new Date(tx.createdAt).toLocaleDateString('te-IN', {
                day: 'numeric',
                month: 'short',
              });

              return (
                <View
                  key={tx.id}
                  className="py-3 border-b border-stone-100 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center flex-1 mr-2">
                    <View
                      className={`p-2 rounded-xl mr-2.5 ${
                        isCredit ? 'bg-emerald-100' : 'bg-amber-100'
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft size={16} color="#059669" />
                      ) : (
                        <ArrowUpRight size={16} color="#D97706" />
                      )}
                    </View>
                    <View className="flex-1">
                      <Text className="text-stone-900 font-bold text-xs" numberOfLines={1}>
                        {tx.description}
                      </Text>
                      <Text className="text-stone-400 text-[10px] mt-0.5">
                        {formattedDate} • {tx.type}
                      </Text>
                    </View>
                  </View>

                  <Text
                    className={`font-black text-xs ${
                      isCredit ? 'text-emerald-700' : 'text-amber-800'
                    }`}
                  >
                    {isCredit ? '+' : ''}
                    {tx.amountPaise !== 0
                      ? `₹${(tx.amountPaise / 100).toFixed(0)}`
                      : `${tx.amount} లీడ్స్`}
                  </Text>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
