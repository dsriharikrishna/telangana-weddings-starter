import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { HeaderBar } from '@/components/HeaderBar';
import { VendorCard } from '@/components/VendorCard';
import { fetchVendors, Vendor } from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { colors } from '@/theme/colors';
import { Search as SearchIcon } from 'lucide-react-native';

export default function SearchScreen() {
  const router = useRouter();
  const { district, mandal, language } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: vendorData, isLoading } = useQuery({
    queryKey: ['vendors', district, mandal],
    queryFn: () => fetchVendors({ district, mandal }),
  });

  const vendors = (vendorData?.items || []).filter((v: Vendor) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.businessName.toLowerCase().includes(q) ||
      v.baseVillageOrTown.toLowerCase().includes(q) ||
      (v.primaryCategory?.nameEn && v.primaryCategory.nameEn.toLowerCase().includes(q)) ||
      (v.primaryCategory?.nameTe && v.primaryCategory.nameTe.toLowerCase().includes(q))
    );
  });

  return (
    <View className="flex-1 bg-stone-50">
      <HeaderBar />

      <View className="px-4 py-3 bg-white border-b border-stone-200">
        <View className="flex-row items-center bg-stone-100 rounded-xl px-3 py-2 border border-stone-200">
          <SearchIcon size={18} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={
              language === 'te'
                ? 'ఫోటోగ్రఫీ, పండితులు, కళ్యాణ వేదికల కోసం వెతకండి...'
                : 'Search photography, pandits, venues, decor...'
            }
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-stone-900 font-medium text-sm"
          />
        </View>
      </View>

      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        <Text className="text-stone-700 font-bold text-sm mb-3">
          {searchQuery ? `${vendors.length} results found` : 'All Available Services'}
        </Text>

        {isLoading ? (
          <ActivityIndicator color={colors.primary} className="py-12" />
        ) : vendors.length === 0 ? (
          <View className="bg-white p-8 rounded-2xl border border-stone-200 items-center justify-center my-4">
            <Text className="text-stone-600 font-semibold text-sm">No matching vendors found</Text>
          </View>
        ) : (
          vendors.map((vendor: Vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              language={language}
              onPress={() => router.push(`/vendor/${vendor.slug}`)}
              onEnquire={() =>
                router.push(
                  `/enquiry/new?vendorId=${vendor.id}&vendorName=${encodeURIComponent(
                    vendor.businessName,
                  )}`,
                )
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

