import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchVendorBySlug, VendorServiceItem, VendorPortfolioItem, VendorReviewItem } from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { useFavouritesStore } from '@/stores/favouritesStore';
import { colors } from '@/theme/colors';
import {
  ArrowLeft,
  Star,
  MapPin,
  PhoneCall,
  Sparkles,
  CheckCircle,
  Bookmark,
  Camera,
  PackageCheck,
  MessageSquare,
  ShieldCheck,
  Share2,
} from 'lucide-react-native';

export default function VendorDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams();
  const { language } = useLocationStore();

  const { data: vendor, isLoading } = useQuery({
    queryKey: ['vendor', slug],
    queryFn: () => fetchVendorBySlug(slug as string),
    enabled: !!slug,
  });

  const { isSaved, toggleSaveVendor } = useFavouritesStore();
  const saved = vendor ? isSaved(vendor.id) : false;

  if (isLoading || !vendor) {
    return (
      <View className="flex-1 bg-stone-50 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const startingPrice = Math.round(vendor.startingPricePaise / 100);
  const services = vendor.services || [];
  const portfolio = vendor.portfolioMedia || [];
  const reviews = vendor.reviews || [];

  return (
    <View className="flex-1 bg-stone-50">
      {/* Top Banner Navigation */}
      <View style={{ backgroundColor: colors.primary }} className="pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="self-start p-2 bg-white/20 rounded-full"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => vendor && toggleSaveVendor(vendor)}
              className="p-2 bg-white/20 rounded-full"
            >
              <Bookmark
                size={20}
                color="#FFFFFF"
                fill={saved ? '#F9F1DC' : 'transparent'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white text-2xl font-black">{vendor.businessName}</Text>
        <Text className="text-amber-200 font-semibold text-xs mt-1">
          {language === 'te'
            ? vendor.primaryCategory?.nameTe || 'పెళ్లి సేవ'
            : vendor.primaryCategory?.nameEn || 'Wedding Service'}
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
            <Text className="text-stone-400 text-xs uppercase font-bold">
              {language === 'te' ? 'ప్రారంభ ధర' : 'Starting Price'}
            </Text>
            <Text className="text-stone-900 font-extrabold text-xl mt-0.5">
              {startingPrice > 0 ? `₹${startingPrice.toLocaleString('en-IN')}` : 'On Request'}
            </Text>
          </View>

          <View className="flex-row items-center bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <Star size={16} color="#D4AF37" fill="#D4AF37" />
            <Text className="text-amber-900 font-bold text-sm ml-1.5">
              {vendor.ratingAverage.toFixed(1)} ({vendor.ratingCount} {language === 'te' ? 'సమీక్షలు' : 'reviews'})
            </Text>
          </View>
        </View>

        {/* About Vendor */}
        <View className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm mb-4">
          <Text className="text-stone-900 font-bold text-base mb-2">
            {language === 'te' ? 'సేవా వివరాలు' : 'About Vendor'}
          </Text>
          <Text className="text-stone-600 text-sm leading-relaxed">
            {vendor.description ||
              'Experienced local wedding service provider catering to traditional events, muhurtham, and receptions with reliable authentic service.'}
          </Text>
        </View>

        {/* Samples of Work (Portfolio Media) */}
        {portfolio.length > 0 && (
          <View className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <Camera size={18} color={colors.primary} />
                <Text className="text-stone-900 font-bold text-base ml-2">
                  {language === 'te' ? 'పని నమూనాలు' : 'Samples of Work & Portfolio'}
                </Text>
              </View>
              <Text className="text-stone-400 text-xs font-semibold">
                {portfolio.length} {language === 'te' ? 'ఫొటోలు' : 'photos'}
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-1">
              {portfolio.map((item: VendorPortfolioItem) => (
                <View key={item.id} className="mr-3 w-64 bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                  <Image
                    source={{ uri: item.mediaUrl }}
                    style={{ width: '100%', height: 160 }}
                    resizeMode="cover"
                  />
                  {item.caption && (
                    <View className="p-2.5 bg-white">
                      <Text className="text-stone-700 text-xs font-medium leading-snug" numberOfLines={2}>
                        {item.caption}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Services & Packages Offered */}
        {services.length > 0 && (
          <View className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm mb-4">
            <View className="flex-row items-center mb-3">
              <PackageCheck size={18} color={colors.primary} />
              <Text className="text-stone-900 font-bold text-base ml-2">
                {language === 'te' ? 'ప్యాకేజీలు & సేవలు' : 'Services & Packages'}
              </Text>
            </View>

            {services.map((service: VendorServiceItem) => {
              const servicePrice = Math.round(service.pricePaise / 100);
              return (
                <View
                  key={service.id}
                  className="mb-3 p-4 rounded-xl border border-stone-200 bg-stone-50/70"
                >
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-stone-900 font-bold text-sm flex-1 mr-2 leading-tight">
                      {service.title}
                    </Text>
                    <Text className="text-amber-900 font-black text-sm">
                      {servicePrice > 0 ? `₹${servicePrice.toLocaleString('en-IN')}` : 'Custom'}
                    </Text>
                  </View>

                  {service.description && (
                    <Text className="text-stone-600 text-xs mt-1 leading-relaxed">
                      {service.description}
                    </Text>
                  )}

                  {service.inclusions && (
                    <View className="mt-2.5 pt-2 border-t border-stone-200/80">
                      <Text className="text-stone-500 text-[11px] font-semibold">
                        <Text className="text-stone-700 font-bold">
                          {language === 'te' ? 'కలిసి ఉన్నవి: ' : 'Includes: '}
                        </Text>
                        {service.inclusions}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Verified Marketplace Guarantee */}
        <View className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-4">
          <View className="flex-row items-center mb-2">
            <Sparkles size={16} color="#D4AF37" />
            <Text className="text-amber-900 font-bold text-xs uppercase tracking-wider ml-1.5">
              {language === 'te' ? 'ధృవీకరించబడిన మార్కెట్‌ప్లేస్ హామీ' : 'Verified Marketplace Guarantee'}
            </Text>
          </View>
          <View className="flex-row items-center mt-1">
            <CheckCircle size={14} color="#15803D" />
            <Text className="text-stone-700 text-xs ml-2">
              {language === 'te'
                ? 'స్థానిక గుర్తింపు మరియు వ్యాపార ధృవీకరణ పూర్తయింది'
                : 'Identity and local business verification completed'}
            </Text>
          </View>
          <View className="flex-row items-center mt-2">
            <CheckCircle size={14} color="#15803D" />
            <Text className="text-stone-700 text-xs ml-2">
              {language === 'te'
                ? 'నేరుగా సంప్రదించండి — ఎలాంటి కమిషన్ మార్కప్ లేదు'
                : 'Direct contact guarantee — zero commission markup'}
            </Text>
          </View>
        </View>

        {/* Customer Reviews & Testimonials */}
        {reviews.length > 0 && (
          <View className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm mb-8">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <MessageSquare size={18} color={colors.primary} />
                <Text className="text-stone-900 font-bold text-base ml-2">
                  {language === 'te' ? 'కస్టమర్ సమీక్షలు' : 'Customer Reviews'}
                </Text>
              </View>
              <Text className="text-stone-500 text-xs font-medium">
                {reviews.length} {language === 'te' ? 'సమీక్షలు' : 'verified'}
              </Text>
            </View>

            {reviews.map((rev: VendorReviewItem) => (
              <View key={rev.id} className="mb-3 pb-3 border-b border-stone-100 last:border-b-0 last:mb-0">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-stone-800 font-bold text-xs">
                    {rev.authorName} {rev.village ? `(${rev.village})` : ''}
                  </Text>
                  <View className="flex-row items-center">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={11} color="#D4AF37" fill="#D4AF37" />
                    ))}
                  </View>
                </View>
                <Text className="text-stone-600 text-xs leading-relaxed mt-0.5">
                  "{rev.comment}"
                </Text>
              </View>
            ))}
          </View>
        )}
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
          <Text className="text-white font-bold text-base ml-2">
            {language === 'te' ? 'సంప్రదించండి & కోట్ పొందండి' : 'Enquire & Get Quote'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


