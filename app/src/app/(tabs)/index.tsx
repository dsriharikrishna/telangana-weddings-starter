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
import { fetchCategories, fetchVendors, Category, Vendor, Subcategory } from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { colors } from '@/theme/colors';
import {
  PhoneCall,
  Sparkles,
  Layers,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Check,
} from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { district, mandal, language } = useLocationStore();
  
  // 1. Level 1: Main Event Mode (All / Subham / Asubham)
  const [eventTypeFilter, setEventTypeFilter] = useState<'ALL' | 'SUBHAM' | 'ASUBHAM'>('ALL');
  
  // 2. Level 2: Selected Main Category
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>(undefined);
  
  // 3. Level 3: Selected Subcategory
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState<string | undefined>(undefined);

  const {
    data: allCategories = [],
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Filter categories by Main Event Type (Subham vs Asubham)
  const filteredCategories = allCategories.filter((cat: Category) => {
    if (eventTypeFilter === 'ALL') return true;
    const isAsubham =
      cat.slug.includes('asubha') ||
      cat.slug.includes('funeral') ||
      cat.slug.includes('freezer') ||
      cat.slug.includes('memorial');
    return eventTypeFilter === 'ASUBHAM' ? isAsubham : !isAsubham;
  });

  // Active category object
  const activeCategory = allCategories.find((c) => c.slug === selectedCategorySlug);
  const activeSubcategories: Subcategory[] = activeCategory?.subcategories || [];

  // Fetch Vendors according to selected category, subcategory and locations
  const {
    data: vendorData,
    isLoading: isLoadingVendors,
    refetch: refetchVendors,
    isRefetching,
  } = useQuery({
    queryKey: ['vendors', selectedCategorySlug, selectedSubcategorySlug, district, mandal],
    queryFn: () =>
      fetchVendors({
        category: selectedCategorySlug,
        subcategory: selectedSubcategorySlug,
        district,
        mandal,
      }),
  });

  const rawVendors = vendorData?.items || [];

  // Filter vendors based on Level 1 Event Type (Subham vs Asubham) when no specific category is picked yet
  const vendors = rawVendors.filter((v: Vendor) => {
    if (eventTypeFilter === 'ALL' || selectedCategorySlug) return true;
    const catSlug = v.primaryCategory?.slug || '';
    const isAsubham =
      catSlug.includes('asubha') ||
      catSlug.includes('funeral') ||
      catSlug.includes('freezer') ||
      catSlug.includes('memorial');
    return eventTypeFilter === 'ASUBHAM' ? isAsubham : !isAsubham;
  });

  const onRefresh = () => {
    refetchCategories();
    refetchVendors();
  };

  const handleSelectCategory = (catSlug: string) => {
    if (selectedCategorySlug === catSlug) {
      setSelectedCategorySlug(undefined);
      setSelectedSubcategorySlug(undefined);
    } else {
      setSelectedCategorySlug(catSlug);
      setSelectedSubcategorySlug(undefined);
    }
  };

  const handleSelectSubcategory = (subSlug: string) => {
    setSelectedSubcategorySlug((prev) => (prev === subSlug ? undefined : subSlug));
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
        {/* =========================================================================
            LEVEL 1: MAIN OCCASION / EVENT TYPE SELECTOR (ముఖ్య కార్యక్రమం)
           ========================================================================= */}
        <View className="px-4 mt-3">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-stone-900 font-extrabold text-xs uppercase tracking-wider">
              {language === 'te' ? '1. శుభ / అశుభ కార్యక్రమం ఎంచుకోండి' : '1. Choose Event Type'}
            </Text>
            <Text className="text-amber-800 text-[11px] font-bold">
              {language === 'te' ? 'గ్రామ అవసరాలు' : 'Village Needs'}
            </Text>
          </View>

          <View className="flex-row bg-stone-200/90 p-1.5 rounded-2xl border border-stone-300/60 shadow-2xs">
            <TouchableOpacity
              onPress={() => {
                setEventTypeFilter('ALL');
                setSelectedCategorySlug(undefined);
                setSelectedSubcategorySlug(undefined);
              }}
              activeOpacity={0.8}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                eventTypeFilter === 'ALL' ? 'bg-white shadow-xs' : ''
              }`}
            >
              <Text
                className={`text-xs font-black ${
                  eventTypeFilter === 'ALL' ? 'text-stone-900' : 'text-stone-600'
                }`}
              >
                {language === 'te' ? 'అన్నీ (All)' : 'All Needs'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setEventTypeFilter('SUBHAM');
                setSelectedCategorySlug(undefined);
                setSelectedSubcategorySlug(undefined);
              }}
              activeOpacity={0.8}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                eventTypeFilter === 'SUBHAM' ? 'bg-white shadow-xs' : ''
              }`}
            >
              <Text
                className={`text-xs font-black ${
                  eventTypeFilter === 'SUBHAM' ? 'text-amber-900' : 'text-stone-600'
                }`}
              >
                {language === 'te' ? '🌺 శుభకార్యాలు' : '🌺 Auspicious'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setEventTypeFilter('ASUBHAM');
                setSelectedCategorySlug(undefined);
                setSelectedSubcategorySlug(undefined);
              }}
              activeOpacity={0.8}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                eventTypeFilter === 'ASUBHAM' ? 'bg-white shadow-xs' : ''
              }`}
            >
              <Text
                className={`text-xs font-black ${
                  eventTypeFilter === 'ASUBHAM' ? 'text-stone-900' : 'text-stone-600'
                }`}
              >
                {language === 'te' ? '🕊️ అశుభ / దినవారాలు' : '🕊️ Bereavement'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================================================================
            ASSISTED EMERGENCY & WEDDING COORDINATOR HELPLINE
           ========================================================================= */}
        <View className="mx-4 mt-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-3">
              <View className="flex-row items-center mb-0.5">
                <Sparkles size={14} color="#D4AF37" />
                <Text className="text-amber-900 font-extrabold text-[10px] uppercase tracking-wider ml-1">
                  {language === 'te' ? 'ఉచిత గ్రామ సలహాదారు' : 'Free Village Coordinator'}
                </Text>
              </View>
              <Text className="text-stone-900 font-black text-sm leading-snug">
                {language === 'te'
                  ? 'ఏ పనులవారు కావాలో అర్థం కావడం లేదా?'
                  : 'Unsure which vendor or items to book?'}
              </Text>
              <Text className="text-stone-600 text-[11px] mt-0.5 leading-tight">
                {language === 'te'
                  ? 'ఒక్క ఫోన్ కాల్‌తో సరైన రేటులో పనులవారిని మేము మాట్లాడిస్తాం.'
                  : 'Direct phone assistance to connect you with local trusted organizers.'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/assisted')}
              style={{ backgroundColor: colors.primary }}
              activeOpacity={0.85}
              className="p-3 rounded-2xl flex-row items-center shadow-md"
            >
              <PhoneCall size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================================================================
            LEVEL 2: CATEGORY HIERARCHY (విభాగం)
           ========================================================================= */}
        <View className="px-4 mt-4">
          <View className="flex-row justify-between items-center mb-2.5">
            <View className="flex-row items-center">
              <Layers size={16} color={colors.primary} />
              <Text className="text-stone-900 font-extrabold text-sm ml-1.5">
                {language === 'te' ? '2. సేవా విభాగం ఎంచుకోండి' : '2. Select Service Category'}
              </Text>
            </View>

            {selectedCategorySlug && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategorySlug(undefined);
                  setSelectedSubcategorySlug(undefined);
                }}
              >
                <Text className="text-amber-800 font-bold text-xs bg-amber-100 px-2 py-0.5 rounded-full">
                  {language === 'te' ? 'అన్నీ చూపించు' : 'Clear Filter'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {isLoadingCategories ? (
            <ActivityIndicator color={colors.primary} className="py-4" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
              {filteredCategories.map((cat: Category) => {
                const isSelected = selectedCategorySlug === cat.slug;
                const hasSubs = cat.subcategories && cat.subcategories.length > 0;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => handleSelectCategory(cat.slug)}
                    activeOpacity={0.85}
                    style={{
                      backgroundColor: isSelected ? colors.primary : '#FFFFFF',
                      borderColor: isSelected ? colors.primary : '#E5E7EB',
                    }}
                    className="mr-2.5 px-3.5 py-2.5 rounded-2xl border shadow-2xs flex-row items-center"
                  >
                    <Text
                      style={{ color: isSelected ? '#FFFFFF' : '#1C1917' }}
                      className="text-xs font-bold"
                    >
                      {language === 'te' ? cat.nameTe : cat.nameEn}
                    </Text>
                    {hasSubs && (
                      <View
                        className={`ml-1.5 px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-white/20' : 'bg-stone-100'
                        }`}
                      >
                        <Text
                          className={`text-[9px] font-black ${
                            isSelected ? 'text-white' : 'text-stone-500'
                          }`}
                        >
                          {cat.subcategories?.length}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* =========================================================================
            LEVEL 3: SUBCATEGORY SPECIFIC TASKS (ఉప విభాగాలు / ప్రత్యెక పనులు)
           ========================================================================= */}
        {activeSubcategories.length > 0 && (
          <View className="mx-4 mt-3 p-3.5 bg-amber-500/10 rounded-2xl border border-amber-300/40">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <SlidersHorizontal size={14} color="#B45309" />
                <Text className="text-amber-950 font-extrabold text-xs ml-1">
                  {language === 'te'
                    ? `3. '${activeCategory?.nameTe}' లో నిర్దిష్ట సేవలు:`
                    : `3. Specific Services under '${activeCategory?.nameEn}':`}
                </Text>
              </View>
              {selectedSubcategorySlug && (
                <TouchableOpacity onPress={() => setSelectedSubcategorySlug(undefined)}>
                  <Text className="text-stone-500 text-[10px] font-bold">
                    {language === 'te' ? 'రీసెట్' : 'Reset'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="flex-row flex-wrap gap-1.5">
              {activeSubcategories.map((sub: Subcategory) => {
                const isSubSelected = selectedSubcategorySlug === sub.slug;
                return (
                  <TouchableOpacity
                    key={sub.id}
                    onPress={() => handleSelectSubcategory(sub.slug)}
                    activeOpacity={0.8}
                    className={`px-3 py-1.5 rounded-xl border flex-row items-center ${
                      isSubSelected
                        ? 'bg-amber-800 border-amber-800'
                        : 'bg-white border-amber-200 shadow-2xs'
                    }`}
                  >
                    {isSubSelected && (
                      <Check size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                    )}
                    <Text
                      className={`text-[11px] font-bold ${
                        isSubSelected ? 'text-white' : 'text-amber-950'
                      }`}
                    >
                      {language === 'te' ? sub.nameTe : sub.nameEn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* =========================================================================
            ACTIVE FILTER BREADCRUMB (సులభంగా అర్థం చేసుకునే సూచిక)
           ========================================================================= */}
        <View className="px-4 mt-3">
          <View className="bg-stone-100 p-2.5 rounded-xl flex-row items-center flex-wrap border border-stone-200">
            <Text className="text-stone-500 text-[11px] font-bold mr-1">
              {language === 'te' ? 'ఎంచుకున్న మార్గం:' : 'Browsing:'}
            </Text>
            <Text className="text-stone-800 text-[11px] font-black">
              {eventTypeFilter === 'ALL'
                ? language === 'te'
                  ? 'అన్ని పనులు'
                  : 'All Events'
                : eventTypeFilter === 'SUBHAM'
                ? language === 'te'
                  ? '🌺 శుభకార్యాలు'
                  : '🌺 Auspicious'
                : language === 'te'
                ? '🕊️ అశుభ / దినవారాలు'
                : '🕊️ Bereavement'}
            </Text>

            {activeCategory && (
              <>
                <ChevronRight size={12} color="#78716C" style={{ marginHorizontal: 3 }} />
                <Text className="text-amber-900 text-[11px] font-black">
                  {language === 'te' ? activeCategory.nameTe : activeCategory.nameEn}
                </Text>
              </>
            )}

            {selectedSubcategorySlug && (
              <>
                <ChevronRight size={12} color="#78716C" style={{ marginHorizontal: 3 }} />
                <Text className="text-emerald-800 text-[11px] font-black">
                  {language === 'te'
                    ? activeSubcategories.find((s) => s.slug === selectedSubcategorySlug)?.nameTe
                    : activeSubcategories.find((s) => s.slug === selectedSubcategorySlug)?.nameEn}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* =========================================================================
            VENDORS LIST SECTION (లభ్యమయ్యే నిపుణులు)
           ========================================================================= */}
        <View className="px-4 mt-4">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-stone-900 font-extrabold text-base">
                {language === 'te' ? 'స్థానిక సేవా నిపుణులు' : 'Available Local Providers'}
              </Text>
              <Text className="text-stone-500 text-xs">
                {district} {mandal ? `• ${mandal}` : ''}
              </Text>
            </View>
            <View className="bg-stone-200 px-2.5 py-1 rounded-full">
              <Text className="text-stone-800 text-xs font-black">
                {vendors.length} {language === 'te' ? 'లభ్యం' : 'found'}
              </Text>
            </View>
          </View>

          {isLoadingVendors ? (
            <ActivityIndicator color={colors.primary} className="py-12" />
          ) : vendors.length === 0 ? (
            <View className="bg-white p-7 rounded-3xl border border-stone-200 items-center justify-center my-4 shadow-xs">
              <Text className="text-stone-800 font-black text-base mb-1.5 text-center">
                {language === 'te'
                  ? 'ఈ విభాగానికి సంబంధించి నిపుణులు రికార్డులో లేరు'
                  : 'No Specific Providers Registered Here Yet'}
              </Text>
              <Text className="text-stone-500 text-xs text-center leading-relaxed mb-4">
                {language === 'te'
                  ? 'మీ ఊరిలో ఇతర అందుబాటులో ఉన్న నిపుణులను సంప్రదించడానికి ఉచిత కాల్ చేయండి.'
                  : 'Try removing specific subcategory filters or tap below for our coordinator to arrange local village providers.'}
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/assisted')}
                style={{ backgroundColor: colors.primary }}
                className="px-5 py-2.5 rounded-full flex-row items-center shadow-xs"
              >
                <PhoneCall size={14} color="#FFFFFF" />
                <Text className="text-white font-bold text-xs ml-2">
                  {language === 'te' ? 'ఉచితంగా పనులవారిని ఏర్పాటు చేయండి' : 'Request Assisted Match'}
                </Text>
              </TouchableOpacity>
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
                      vendor.businessName
                    )}`
                  )
                }
              />
            ))
          )}
        </View>

        {/* Bottom spacer for comfort */}
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
