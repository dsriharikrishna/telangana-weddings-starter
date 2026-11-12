import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { HeaderBar } from '@/components/HeaderBar';
import { requestCallback } from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { colors } from '@/theme/colors';
import { PhoneCall, CheckCircle2 } from 'lucide-react-native';

export default function AssistedScreen() {
  const { district, mandal, language } = useLocationStore();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: requestCallback,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err: any) => {
      Alert.alert('Error', err?.response?.data?.message || 'Could not submit request. Please try again.');
    },
  });

  const handleSubmit = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      Alert.alert('Required', 'Please enter your name and 10-digit mobile number.');
      return;
    }
    mutation.mutate({
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
              <Text className="text-stone-900 font-extrabold text-lg">
                {language === 'te' ? 'ఉచిత పెళ్లి సలహాదారు' : 'Wedding Concierge'}
              </Text>
              <Text className="text-amber-800 text-xs font-semibold">
                {language === 'te' ? 'ప్రత్యేక సహాయం & స్థానిక పరిజ్ఞానం' : 'Personalized Local Matching'}
              </Text>
            </View>
          </View>

          {isSuccess ? (
            <View className="py-8 items-center text-center">
              <CheckCircle2 size={56} color={colors.success} />
              <Text className="text-stone-900 font-bold text-lg mt-4 mb-2 text-center">
                {language === 'te' ? 'అభ్యర్థన నమోదు చేయబడింది!' : 'Request Registered!'}
              </Text>
              <Text className="text-stone-600 text-sm text-center px-4 leading-relaxed">
                {language === 'te'
                  ? 'మా స్థానిక పెళ్లి నిపుణులు అతి త్వరలో మిమ్మల్ని సంప్రదిస్తారు.'
                  : 'Our regional wedding coordinator will call you back shortly with verified local options.'}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setIsSuccess(false);
                  setCustomerName('');
                  setCustomerPhone('');
                  setNotes('');
                }}
                style={{ backgroundColor: colors.primary }}
                className="mt-6 px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-bold text-sm">
                  {language === 'te' ? 'మరో అభ్యర్థన చేయండి' : 'Submit Another Request'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text className="text-stone-600 text-sm leading-relaxed mb-6">
                {language === 'te'
                  ? 'మీ కుటుంబ సంప్రదాయాలు, బడ్జెట్ మరియు స్థానిక అవసరాలకు అనువైన నమ్మకమైన నిపుణులను కనుగొనడంలో మా ఉచిత సర్వీస్ సహాయపడుతుంది.'
                  : 'Leave your contact details and our local team in your district will help you compare, shortlist, and connect with trusted providers.'}
              </Text>

              {/* Name */}
              <View className="mb-4">
                <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">
                  {language === 'te' ? 'మీ పూర్తి పేరు' : 'Full Name *'}
                </Text>
                <TextInput
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="e.g. Ramesh Reddy"
                  placeholderTextColor="#9CA3AF"
                  className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-medium"
                />
              </View>

              {/* Phone */}
              <View className="mb-4">
                <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">
                  {language === 'te' ? 'మొబైల్ నంబర్' : 'Mobile Number *'}
                </Text>
                <TextInput
                  value={customerPhone}
                  onChangeText={setCustomerPhone}
                  placeholder="e.g. 9876543210"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-medium"
                />
              </View>

              {/* Requirements */}
              <View className="mb-6">
                <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">
                  {language === 'te' ? 'మీకు ఏ సేవలు కావాలి? (ఐచ్ఛికం)' : 'Requirements / Notes (Optional)'}
                </Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder={
                    language === 'te'
                      ? 'ఉదా: బాజా భజంత్రీలు, సాంప్రదాయ ఫోటోగ్రఫీ...'
                      : 'e.g. Traditional nadaswaram band, photography for reception...'
                  }
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-medium"
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={mutation.isPending}
                style={{ backgroundColor: colors.primary }}
                className="py-3.5 rounded-xl items-center shadow-md"
              >
                {mutation.isPending ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-bold text-base">
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

