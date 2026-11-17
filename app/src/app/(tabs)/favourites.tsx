import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { HeaderBar } from '@/components/HeaderBar';
import { VendorCard } from '@/components/VendorCard';
import { useFavouritesStore } from '@/stores/favouritesStore';
import { useLocationStore } from '@/stores/locationStore';
import { useAuthStore } from '@/stores/authStore';
import { fetchVendorPortalReviews, VendorReviewItem } from '@/services/marketplaceApi';
import { Heart, Star, ThumbsUp, MessageSquare } from 'lucide-react-native';
import { colors } from '@/theme/colors';

export default function FavouritesOrReviewsScreen() {
  const router = useRouter();
  const { savedVendors } = useFavouritesStore();
  const { language } = useLocationStore();
  const appMode = useAuthStore((state) => state.appMode);
  const isVendorMode = appMode === 'VENDOR';

  // Vendor Reviews Query
  const { data: reviews = [], isLoading: isLoadingReviews } = useQuery({
    queryKey: ['vendorPortalReviews'],
    queryFn: () => fetchVendorPortalReviews(),
    enabled: isVendorMode,
  });

  // =========================================================================
  // 1. CUSTOMER FAVOURITES VIEW
  // =========================================================================
  if (!isVendorMode) {
    return (
      <View className="flex-1 bg-stone-50">
        <HeaderBar />

        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-stone-900 font-extrabold text-xl">
              {language === 'te' ? 'సేవ్ చేసిన ప్రొఫైల్స్' : 'Saved Vendors'}
            </Text>
            <Text className="text-stone-500 font-semibold text-xs">
              {savedVendors.length} {language === 'te' ? 'సేవ్ చేసారు' : 'saved'}
            </Text>
          </View>

          {savedVendors.length === 0 ? (
            <View className="bg-white p-8 rounded-3xl border border-stone-200 items-center justify-center my-6">
              <View style={{ backgroundColor: colors.secondaryLight }} className="p-4 rounded-full mb-3">
                <Heart size={32} color={colors.primary} />
              </View>
              <Text className="text-stone-900 font-bold text-lg mb-1">
                {language === 'te' ? 'ఎవరూ సేవ్ చేయబడలేదు' : 'No Saved Vendors Yet'}
              </Text>
              <Text className="text-stone-500 text-xs text-center leading-relaxed px-4">
                {language === 'te'
                  ? 'హోమ్ పేజీలో లేదా వెండర్ కార్డ్‌పై ఉన్న బుక్‌మార్క్ బటన్‌ను నొక్కడం ద్వారా ఇష్టమైన వెండర్‌లను సేవ్ చేయవచ్చు.'
                  : 'Tap the bookmark icon on any vendor card to save them here for quick access.'}
              </Text>
            </View>
          ) : (
            savedVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                language={language}
                onPress={() => router.push(`/vendor/${vendor.slug}`)}
                onEnquire={() =>
                  router.push(
                    `/enquiry/new?vendorId=${vendor.id}&vendorName=${encodeURIComponent(
                      vendor.businessName
                    )}`
                  )
                }
              />
            ))
          )}
        </ScrollView>
      </View>
    );
  }

  // =========================================================================
  // 2. VENDOR CUSTOMER REVIEWS & FEEDBACK VIEW
  // =========================================================================
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <View className="flex-1 bg-stone-100">
      <HeaderBar />

      <ScrollView className="flex-1 px-4 pt-3 pb-8" showsVerticalScrollIndicator={false}>
        {/* Rating Hero Card */}
        <View className="bg-white rounded-3xl p-5 mb-4 border border-stone-200 shadow-2xs">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-stone-500 text-xs font-bold uppercase tracking-wider">
                {language === 'te' ? 'గ్రామ ప్రజల విశ్వసనీయత' : 'Overall Trust Rating'}
              </Text>
              <View className="flex-row items-baseline mt-1">
                <Text className="text-stone-900 text-4xl font-black">{avgRating}</Text>
                <Text className="text-stone-500 text-sm font-bold ml-1">/ 5.0</Text>
              </View>
              <View className="flex-row items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    color="#D97706"
                    fill="#D97706"
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>

            <View className="bg-amber-50 px-4 py-3 rounded-2xl border border-amber-200 items-center">
              <ThumbsUp size={22} color="#D97706" />
              <Text className="text-amber-950 font-black text-sm mt-1">
                {reviews.length} {language === 'te' ? 'సమీక్షలు' : 'Reviews'}
              </Text>
            </View>
          </View>
        </View>

        {/* Reviews List */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-stone-900 font-black text-base">
            {language === 'te' ? 'కస్టమర్ల అభిప్రాయాలు & అనుభవాలు' : 'Customer Reviews & Feedback'}
          </Text>
        </View>

        {isLoadingReviews ? (
          <ActivityIndicator color="#D97706" className="py-12" />
        ) : reviews.length === 0 ? (
          <View className="bg-white p-7 rounded-3xl border border-stone-200 items-center justify-center my-4">
            <MessageSquare size={32} color="#A8A29E" className="mb-2" />
            <Text className="text-stone-800 font-black text-base mb-1">
              {language === 'te' ? 'ఇంకా సమీక్షలు రాలేదు' : 'No Reviews Yet'}
            </Text>
            <Text className="text-stone-500 text-xs text-center leading-relaxed">
              {language === 'te'
                ? 'మీరు ఆర్డర్లు పూర్తి చేసినప్పుడు కస్టమర్లు ఇచ్చే రేటింగ్‌లు మరియు ఫీడ్‌బ్యాక్ ఇక్కడ కనిపిస్తాయి.'
                : 'Customer ratings and feedback from completed events will appear here.'}
            </Text>
          </View>
        ) : (
          reviews.map((review: VendorReviewItem) => {
            const formattedDate = new Date(review.createdAt).toLocaleDateString('te-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <View
                key={review.id}
                className="bg-white rounded-3xl p-4 mb-3 border border-stone-200 shadow-2xs"
              >
                <View className="flex-row items-center justify-between mb-1.5">
                  <View>
                    <Text className="text-stone-900 font-bold text-sm">
                      {review.authorName}
                    </Text>
                    {review.village && (
                      <Text className="text-stone-500 text-[11px]">
                        {review.village}
                      </Text>
                    )}
                  </View>
                  <View className="flex-row items-center bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Star size={12} color="#D97706" fill="#D97706" style={{ marginRight: 3 }} />
                    <Text className="text-amber-950 font-black text-xs">{review.rating}.0</Text>
                  </View>
                </View>

                <Text className="text-stone-700 text-xs leading-relaxed mt-1">
                  "{review.comment}"
                </Text>

                <Text className="text-stone-400 text-[10px] mt-2">
                  {formattedDate}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
