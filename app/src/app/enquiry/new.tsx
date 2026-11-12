import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { submitEnquiry } from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { colors } from '@/theme/colors';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';

export default function NewEnquiryModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { district, mandal, language } = useLocationStore();

  const vendorId = params.vendorId as string | undefined;
  const vendorName = params.vendorName as string | undefined;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [eventDate, setEventDate] = useState('2025-12-15');
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: submitEnquiry,
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err: any) => {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to submit enquiry.');
    },
  });

  const handleSubmit = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      Alert.alert('Required', 'Please enter your name and phone number.');
      return;
    }

    mutation.mutate({
      categorySlug: 'traditional-photography',
      vendorId,
      district,
      mandal,
      eventDate: new Date(eventDate).toISOString(),
      customerName,
      customerPhone,
      notes,
    });
  };

  return (
    <View className="flex-1 bg-stone-900/50 justify-end">
      <View className="bg-white rounded-t-3xl max-h-[90%] p-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <ArrowLeft size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-stone-900 font-extrabold text-base">
            {vendorName ? `Enquire with ${vendorName}` : 'Service Enquiry'}
          </Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {isSuccess ? (
            <View className="py-8 items-center text-center">
              <CheckCircle2 size={52} color={colors.success} />
              <Text className="text-stone-900 font-bold text-lg mt-4 mb-2">Enquiry Sent!</Text>
              <Text className="text-stone-600 text-xs text-center mb-6 leading-relaxed">
                Your enquiry has been shared with {vendorName || 'local service providers'}. They will contact you shortly directly on your phone.
              </Text>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ backgroundColor: colors.primary }}
                className="px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-bold text-sm">Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View className="mb-4">
                <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">Your Name *</Text>
                <TextInput
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="e.g. Sridhar Rao"
                  placeholderTextColor="#9CA3AF"
                  className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-medium"
                />
              </View>

              <View className="mb-4">
                <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">Phone Number *</Text>
                <TextInput
                  value={customerPhone}
                  onChangeText={setCustomerPhone}
                  placeholder="e.g. 9876543210"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-medium"
                />
              </View>

              <View className="mb-4">
                <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">Event Date (YYYY-MM-DD)</Text>
                <TextInput
                  value={eventDate}
                  onChangeText={setEventDate}
                  placeholder="2025-12-15"
                  placeholderTextColor="#9CA3AF"
                  className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-medium"
                />
              </View>

              <View className="mb-6">
                <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">Specific Requirements</Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Mention timings, village venue, or any particular custom..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-medium"
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={mutation.isPending}
                style={{ backgroundColor: colors.primary }}
                className="py-3.5 rounded-xl items-center mb-4"
              >
                {mutation.isPending ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-bold text-base">Submit Enquiry</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

