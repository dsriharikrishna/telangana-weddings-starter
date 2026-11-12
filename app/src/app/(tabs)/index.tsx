import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { HeaderBar } from '@/components/HeaderBar';
import { VendorCard } from '@/components/VendorCard';
import { fetchCategories, fetchVendors, Category, Vendor } from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { colors } from '@/theme/colors';
import { PhoneCall, Sparkles } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { district, mandal, language } = useLocationStore();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const {
    data: vendorData,
    isLoading: isLoadingVendors,
    refetch: refetchVendors,
    isRefetching,
  } = useQuery({
    queryKey: ['vendors', selectedCategory, district, mandal],
    queryFn: () =>
      fetchVendors({
        category: selectedCategory,
        district,
        mandal,
      }),
  });

  const vendors = vendorData?.items || [];

  const onRefresh = () => {
    refetchCategories();
    refetchVendors();
  };

  return (
    <View className="flex-1 bg-stone-50">
      <HeaderBar onOpenLocationModal={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Assisted Wedding Banner */}
        <View className="m-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-3">
              <View className="flex-row items-center mb-1">
                <Sparkles size={16} color="#D4AF37" />
                <Text className="text-amber-900 font-bold text-xs uppercase tracking-wider ml-1">
                  {language === 'te' ? 'ఉచిత సలహాదారు' : 'Free Wedding Concierge'}
                </Text>
              </View>
              <Text className="text-stone-900 font-bold text-base leading-snug">
                {language === 'te'
                  ? 'మీ పెళ్లి సేవలను ఎంచుకోవడంలో సహాయం కావాలా?'
                  : 'Need help choosing the right local wedding vendors?'}
              </Text>
              <Text className="text-stone-600 text-xs mt-1">
                {language === 'te'
                  ? 'మా నిపుణులు మీకు సరైన స్థానిక ప్రొఫెషనల్స్‌ను కనుగొంటారు.'
                  : 'Request a quick callback from our local wedding specialist.'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/assisted')}
              style={{ backgroundColor: colors.primary }}
              className="p-3 rounded-xl flex-row items-center shadow-sm"
            >
              <PhoneCall size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <View className="px-4 mt-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-stone-900 font-bold text-lg">
              {language === 'te' ? 'పెళ్లి సేవా విభాగాలు' : 'Wedding Categories'}
            </Text>
            {selectedCategory && (
              <TouchableOpacity onPress={() => setSelectedCategory(undefined)}>
                <Text className="text-amber-800 font-semibold text-xs">
                  {language === 'te' ? 'అన్నీ చూపించు' : 'Show All'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {isLoadingCategories ? (
            <ActivityIndicator color={colors.primary} className="py-4" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {categories.map((cat: Category) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(isSelected ? undefined : cat.slug)}
                    style={{
                      backgroundColor: isSelected ? colors.primary : '#FFFFFF',
                      borderColor: isSelected ? colors.primary : '#E5E7EB',
                    }}
                    className="mr-3 px-4 py-2.5 rounded-full border shadow-2xs"
                  >
                    <Text
                      style={{ color: isSelected ? '#FFFFFF' : '#374151' }}
                      className="text-xs font-semibold"
                    >
                      {language === 'te' ? cat.nameTe : cat.nameEn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* Vendors List Section */}
        <View className="px-4 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-stone-900 font-bold text-lg">
              {language === 'te' ? 'స్థానిక నిపుణులు' : 'Featured Local Vendors'}
            </Text>
            <Text className="text-stone-500 text-xs font-medium">
              {vendors.length} {language === 'te' ? 'లభ్యమయ్యారు' : 'available'}
            </Text>
          </View>

          {isLoadingVendors ? (
            <ActivityIndicator color={colors.primary} className="py-12" />
          ) : vendors.length === 0 ? (
            <View className="bg-white p-8 rounded-2xl border border-stone-200 items-center justify-center my-4">
              <Text className="text-stone-700 font-bold text-base mb-1">
                {language === 'te' ? 'ఎవరూ దొరకలేదు' : 'No Vendors Found in this Location'}
              </Text>
              <Text className="text-stone-500 text-xs text-center">
                {language === 'te'
                  ? 'మరో మండలం లేదా విభాగం ఎంచుకోండి లేదా ఉచిత సలహాదారును సంప్రదించండి.'
                  : 'Try selecting a different mandal or category, or request an assisted match.'}
              </Text>
            </View>
          ) : (
            vendors.map((vendor: Vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                language={language}
                onPress={() => router.push(`/vendor/${vendor.slug}`)}
                onEnquire={() => router.push(`/enquiry/new?vendorId=${vendor.id}&vendorName=${encodeURIComponent(vendor.businessName)}`)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

