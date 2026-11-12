import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchVendorBySlug } from '@/services/marketplaceApi';
import { colors } from '@/theme/colors';
import { ArrowLeft, Star, MapPin, PhoneCall, Sparkles, CheckCircle } from 'lucide-react-native';

export default function VendorDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams();

  const { data: vendor, isLoading } = useQuery({
    queryKey: ['vendor', slug],
    queryFn: () => fetchVendorBySlug(slug as string),
    enabled: !!slug,
  });

  if (isLoading || !vendor) {
    return (
      <View className="flex-1 bg-stone-50 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const startingPrice = Math.round(vendor.startingPricePaise / 100);

  return (
    <View className="flex-1 bg-stone-50">
      {/* Top Banner Navigation */}
      <View style={{ backgroundColor: colors.primary }} className="pt-12 pb-6 px-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-4 self-start p-1 bg-white/20 rounded-full">
          <ArrowLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-black">{vendor.businessName}</Text>
        <Text className="text-amber-200 font-semibold text-xs mt-1">
          {vendor.primaryCategory?.nameEn}
        </Text>

        <View className="flex-row items-center mt-3">
          <MapPin size={14} color="#F9F1DC" />
          <Text className="text-white/90 text-xs ml-1 font-medium">
            {vendor.baseVillageOrTown}, {vendor.baseMandal}, {vendor.baseDistrict}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Rating and Price Card */}
        <View className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-stone-400 text-xs uppercase font-bold">Starting Price</Text>
            <Text className="text-stone-900 font-extrabold text-xl mt-0.5">
              {startingPrice > 0 ? `₹${startingPrice.toLocaleString('en-IN')}` : 'On Request'}
            </Text>
          </View>

          <View className="flex-row items-center bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <Star size={16} color="#D4AF37" fill="#D4AF37" />
            <Text className="text-amber-900 font-bold text-sm ml-1.5">
              {vendor.ratingAverage.toFixed(1)} ({vendor.ratingCount} reviews)
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm mb-4">
          <Text className="text-stone-900 font-bold text-base mb-2">About Vendor</Text>
          <Text className="text-stone-600 text-sm leading-relaxed">
            {vendor.description ||
              'Experienced local wedding service provider catering to traditional events, muhurtham, and receptions with reliable authentic service.'}
          </Text>
        </View>

        {/* Trust Badges */}
        <View className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-8">
          <View className="flex-row items-center mb-2">
            <Sparkles size={16} color="#D4AF37" />
            <Text className="text-amber-900 font-bold text-xs uppercase tracking-wider ml-1.5">
              Verified Marketplace Guarantee
            </Text>
          </View>
          <View className="flex-row items-center mt-1">
            <CheckCircle size={14} color="#15803D" />
            <Text className="text-stone-700 text-xs ml-2">Identity and local business verification completed</Text>
          </View>
          <View className="flex-row items-center mt-2">
            <CheckCircle size={14} color="#15803D" />
            <Text className="text-stone-700 text-xs ml-2">Direct contact guarantee — zero commission markup</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View className="bg-white p-4 border-t border-stone-200 flex-row items-center">
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/enquiry/new?vendorId=${vendor.id}&vendorName=${encodeURIComponent(vendor.businessName)}`,
            )
          }
          style={{ backgroundColor: colors.primary }}
          className="flex-1 py-3.5 rounded-xl flex-row items-center justify-center shadow-md"
        >
          <PhoneCall size={18} color="#FFFFFF" />
          <Text className="text-white font-bold text-base ml-2">Enquire Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

