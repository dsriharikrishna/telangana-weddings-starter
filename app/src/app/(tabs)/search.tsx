import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HeaderBar } from '@/components/HeaderBar';
import { VendorCard } from '@/components/VendorCard';
import {
  fetchVendors,
  fetchVendorPortalServices,
  createVendorPortalService,
  updateVendorPortalService,
  deleteVendorPortalService,
  fetchVendorPortalWallet,
  fetchCategories,
  Vendor,
  VendorServiceItem,
} from '@/services/marketplaceApi';
import { useLocationStore } from '@/stores/locationStore';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';
import {
  Search as SearchIcon,
  Plus,
  Trash2,
  CheckCircle,
  Coins,
  Sparkles,
  Info,
  X,
  Award,
  CalendarCheck,
  Camera,
  Image as ImageIcon,
} from 'lucide-react-native';

export default function SearchOrServicesScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { district, mandal, language } = useLocationStore();
  const appMode = useAuthStore((state) => state.appMode);
  const isVendorMode = appMode === 'VENDOR';

  // --- Customer State ---
  const [searchQuery, setSearchQuery] = useState('');

  // --- Vendor Add Modal State ---
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [serviceTitle, setServiceTitle] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceInclusions, setServiceInclusions] = useState('');
  const [experienceYrs, setExperienceYrs] = useState('5');
  const [completedDeals, setCompletedDeals] = useState('45');
  const [sampleImageUrl, setSampleImageUrl] = useState('');
  const [sampleImages, setSampleImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
  ]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);

  // Customer Queries
  const { data: vendorData, isLoading: isLoadingCustomerVendors } = useQuery({
    queryKey: ['vendors', district, mandal],
    queryFn: () => fetchVendors({ district, mandal }),
    enabled: !isVendorMode,
  });

  // Vendor Queries
  const {
    data: vendorServices = [],
    isLoading: isLoadingServices,
  } = useQuery({
    queryKey: ['vendorPortalServices'],
    queryFn: () => fetchVendorPortalServices(),
    enabled: isVendorMode,
  });

  const { data: walletData } = useQuery({
    queryKey: ['vendorPortalWallet'],
    queryFn: () => fetchVendorPortalWallet(),
    enabled: isVendorMode,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    enabled: isVendorMode,
  });

  // Mutations
  const createServiceMutation = useMutation({
    mutationFn: (data: {
      title: string;
      pricePaise: number;
      inclusions: string;
      experienceYrs?: number;
      completedDeals?: number;
      sampleImages?: string[];
      subcategoryId?: string;
    }) => createVendorPortalService(data),
    onSuccess: (res) => {
      Alert.alert(
        language === 'te' ? 'శుభాకాంక్షలు!' : 'Service Published!',
        language === 'te'
          ? 'మీ సర్వీస్ విజయవంతంగా పబ్లిష్ చేయబడింది (₹21 శకునం రుసుము మినహాయించబడింది).'
          : 'Your service package is now live. ₹21 listing fee was deducted from your wallet.'
      );
      setIsAddModalVisible(false);
      setServiceTitle('');
      setServicePrice('');
      setServiceInclusions('');
      queryClient.invalidateQueries({ queryKey: ['vendorPortalServices'] });
      queryClient.invalidateQueries({ queryKey: ['vendorPortalWallet'] });
    },
    onError: (err: any) => {
      Alert.alert(
        language === 'te' ? 'బ్యాలెన్స్ చాలదు' : 'Action Failed',
        err.message || 'Please recharge your wallet with ₹21 to add this service.'
      );
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateVendorPortalService(id, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendorPortalServices'] });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (id: string) => deleteVendorPortalService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendorPortalServices'] });
    },
  });

  const handleAddSampleImage = () => {
    if (!sampleImageUrl.trim()) return;
    setSampleImages((prev) => [...prev, sampleImageUrl.trim()]);
    setSampleImageUrl('');
  };

  const handleRemoveSampleImage = (index: number) => {
    setSampleImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateService = () => {
    if (!serviceTitle.trim()) {
      Alert.alert('గమనిక', 'దయచేసి సర్వీస్ పేరును నమోదు చేయండి.');
      return;
    }
    const priceNum = parseFloat(servicePrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('గమనిక', 'దయచేసి సరైన రేటును నమోదు చేయండి.');
      return;
    }

    createServiceMutation.mutate({
      title: serviceTitle.trim(),
      pricePaise: Math.round(priceNum * 100),
      inclusions: serviceInclusions.trim(),
      experienceYrs: parseInt(experienceYrs, 10) || 1,
      completedDeals: parseInt(completedDeals, 10) || 0,
      sampleImages,
      subcategoryId: selectedSubcategory,
    });
  };

  // =========================================================================
  // 1. CUSTOMER EXPLORE VIEW
  // =========================================================================
  if (!isVendorMode) {
    const customerVendors = (vendorData?.items || []).filter((v: Vendor) => {
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
                  ? 'ఫోటోగ్రఫీ, పండితులు, కల్యాణ వేదికల కోసం వెతకండి...'
                  : 'Search photography, pandits, venues, decor...'
              }
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-2 text-stone-900 font-medium text-sm"
            />
          </View>
        </View>

        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          {isLoadingCustomerVendors ? (
            <ActivityIndicator color={colors.primary} className="py-12" />
          ) : customerVendors.length === 0 ? (
            <View className="bg-white p-8 rounded-2xl border border-stone-200 items-center justify-center my-4">
              <Text className="text-stone-700 font-bold text-base mb-1">
                {language === 'te' ? 'ఎవరూ దొరకలేదు' : 'No Vendors Found'}
              </Text>
              <Text className="text-stone-500 text-xs text-center">
                {language === 'te'
                  ? 'మరో పేరుతో వెతకండి లేదా ఉచిత సలహాదారును సంప్రదించండి.'
                  : 'Try adjusting your search terms.'}
              </Text>
            </View>
          ) : (
            customerVendors.map((vendor: Vendor) => (
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
  // 2. VENDOR SERVICES & PACKAGES CRUD VIEW (₹21 LISTING CHARGE)
  // =========================================================================
  const walletRupees = ((walletData?.balancePaise || 0) / 100).toFixed(0);

  return (
    <View className="flex-1 bg-stone-100">
      <HeaderBar />

      <ScrollView className="flex-1 px-4 pt-3 pb-8" showsVerticalScrollIndicator={false}>
        {/* Top Overview & Balance Warning Banner */}
        <View className="bg-amber-900 rounded-3xl p-4 mb-4 shadow-md">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Coins size={18} color="#FDE68A" />
              <Text className="text-amber-200 font-extrabold text-xs ml-1.5 uppercase tracking-wider">
                {language === 'te' ? 'వాలెట్ బ్యాలెన్స్' : 'Wallet Balance'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/assisted')}
              className="bg-amber-400 px-3 py-1 rounded-full"
            >
              <Text className="text-stone-900 text-xs font-black">
                {language === 'te' ? '+ రీఛార్జ్' : '+ Top Up'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-baseline">
            <Text className="text-white text-3xl font-black">₹{walletRupees}</Text>
            <Text className="text-amber-200 text-xs font-bold ml-2">
              ({walletData?.balanceCredits || 0} {language === 'te' ? 'ఉచిత లీడ్స్' : 'Leads'})
            </Text>
          </View>

          <View className="mt-2.5 pt-2.5 border-t border-amber-800/80 flex-row items-center">
            <Sparkles size={13} color="#FDE68A" />
            <Text className="text-amber-200 text-[11px] font-semibold ml-1.5 flex-1">
              {language === 'te'
                ? 'ప్రతి కొత్త సర్వీస్‌కు ₹21 శకునం నామమాత్రపు ఫీజు వర్తిస్తుంది.'
                : 'A nominal ₹21 Shagun fee applies when creating a new service package.'}
            </Text>
          </View>
        </View>

        {/* Section Header with Add Button */}
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-stone-900 font-black text-lg">
              {language === 'te' ? 'నా సర్వీసులు & ప్యాకేజీలు' : 'My Service Packages'}
            </Text>
            <Text className="text-stone-500 text-xs font-semibold">
              {vendorServices.length} {language === 'te' ? 'ప్యాకేజీలు ఉన్నాయి' : 'services listed'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsAddModalVisible(true)}
            activeOpacity={0.85}
            className="bg-amber-600 px-4 py-2 rounded-2xl flex-row items-center shadow-xs"
          >
            <Plus size={16} color="#FFFFFF" />
            <Text className="text-white font-black text-xs ml-1">
              {language === 'te' ? 'కొత్త సర్వీస్ (₹21)' : 'Add (₹21)'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Cards List */}
        {isLoadingServices ? (
          <ActivityIndicator color="#D97706" className="py-12" />
        ) : vendorServices.length === 0 ? (
          <View className="bg-white p-7 rounded-3xl border border-stone-200 items-center justify-center my-4">
            <Text className="text-stone-800 font-black text-base mb-1">
              {language === 'te' ? 'ఇంకా సర్వీసులు జోడించలేదు' : 'No Service Packages Yet'}
            </Text>
            <Text className="text-stone-500 text-xs text-center leading-relaxed mb-4">
              {language === 'te'
                ? 'మీ టెంట్ హౌస్, వంట, ఫోటో లేదా పూజ ప్యాకేజీలను ఇప్పుడే జోడించి బుకింగ్‌లు పొందండి.'
                : 'List your packages with work samples, experience, and deals closed.'}
            </Text>
            <TouchableOpacity
              onPress={() => setIsAddModalVisible(true)}
              className="bg-amber-600 px-5 py-2.5 rounded-full flex-row items-center"
            >
              <Plus size={16} color="#FFFFFF" />
              <Text className="text-white font-bold text-xs ml-1.5">
                {language === 'te' ? 'మొదటి సర్వీస్ జోడించండి' : 'Add First Service'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          vendorServices.map((service: VendorServiceItem) => {
            const priceInr = ((service.pricePaise || 0) / 100).toLocaleString('en-IN');
            const isActive = service.isActive !== false;
            const expYears = service.experienceYrs || 3;
            const closedDeals = service.completedDeals || 25;
            const samples = service.sampleImages || [];

            return (
              <View
                key={service.id}
                className="bg-white rounded-3xl p-4 mb-3.5 border border-stone-200/90 shadow-2xs"
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 mr-2">
                    <View className="flex-row items-center mb-1">
                      <View
                        className={`px-2 py-0.5 rounded-md mr-2 ${
                          isActive ? 'bg-emerald-100' : 'bg-stone-200'
                        }`}
                      >
                        <Text
                          className={`text-[10px] font-black ${
                            isActive ? 'text-emerald-800' : 'text-stone-600'
                          }`}
                        >
                          {isActive
                            ? language === 'te'
                              ? 'కస్టమర్లకు కనిపిస్తోంది'
                              : 'Live'
                            : language === 'te'
                            ? 'ఆపివేయబడింది'
                            : 'Paused'}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-stone-900 font-black text-base leading-snug">
                      {service.title}
                    </Text>
                    {service.description ? (
                      <Text className="text-stone-600 text-xs mt-1 leading-relaxed">
                        {service.description}
                      </Text>
                    ) : null}
                  </View>

                  <Text className="text-amber-800 font-black text-lg">₹{priceInr}</Text>
                </View>

                {/* Experience & Deals Closed Trust Badges */}
                <View className="flex-row items-center gap-2 mt-2.5">
                  <View className="flex-row items-center bg-stone-100 px-2.5 py-1 rounded-xl">
                    <Award size={13} color="#D97706" />
                    <Text className="text-stone-800 font-extrabold text-[11px] ml-1">
                      {expYears}+ {language === 'te' ? 'సంవత్సరాల అనుభవం' : 'Years Exp'}
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    <CalendarCheck size={13} color="#059669" />
                    <Text className="text-emerald-800 font-extrabold text-[11px] ml-1">
                      {closedDeals}+ {language === 'te' ? 'ఈవెంట్లు పూర్తి' : 'Deals Done'}
                    </Text>
                  </View>
                </View>

                {/* Sample Photos Gallery */}
                {samples.length > 0 && (
                  <View className="mt-3">
                    <Text className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      {language === 'te' ? 'పని నమూనాలు (Work Samples)' : 'Work Samples'}:
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                      {samples.map((imgUrl, idx) => (
                        <Image
                          key={idx}
                          source={{ uri: imgUrl }}
                          className="w-20 h-16 rounded-xl mr-2 bg-stone-200"
                          resizeMode="cover"
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {service.inclusions && (
                  <View className="mt-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <Text className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                      {language === 'te' ? 'ప్రత్యేకతలు & సదుపాయాలు' : 'Inclusions'}:
                    </Text>
                    <Text className="text-stone-700 text-xs">{service.inclusions}</Text>
                  </View>
                )}

                {/* Action Buttons: Pause/Resume, Delete */}
                <View className="mt-3 pt-3 border-t border-stone-100 flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() =>
                      toggleStatusMutation.mutate({ id: service.id, isActive: !isActive })
                    }
                    className="flex-row items-center"
                  >
                    <CheckCircle size={14} color={isActive ? '#059669' : '#9CA3AF'} />
                    <Text className="text-stone-600 text-xs font-bold ml-1">
                      {isActive
                        ? language === 'te'
                          ? 'తాత్కాలికంగా ఆపండి'
                          : 'Pause'
                        : language === 'te'
                        ? 'తిరిగి లైవ్ చేయండి'
                        : 'Resume'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        language === 'te' ? 'సర్వీస్ తొలగింపు' : 'Delete Service',
                        language === 'te'
                          ? 'ఈ సర్వీస్‌ను శాశ్వతంగా తీసివేయాలనుకుంటున్నారా?'
                          : 'Are you sure you want to remove this service?',
                        [
                          { text: 'Cancel', style: 'cancel' },
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => deleteServiceMutation.mutate(service.id),
                          },
                        ]
                      );
                    }}
                    className="p-1.5 rounded-lg bg-red-50"
                  >
                    <Trash2 size={15} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* =========================================================================
          ADD NEW SERVICE MODAL WITH EXPERIENCE, DEALS CLOSED & WORK SAMPLES
         ========================================================================= */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-white rounded-t-3xl p-5 max-h-[90%]">
            <View className="flex-row items-center justify-between pb-3 border-b border-stone-200">
              <View>
                <Text className="text-stone-900 font-black text-lg">
                  {language === 'te' ? 'కొత్త సర్వీస్ ప్యాకేజ్' : 'Add Service Package'}
                </Text>
                <Text className="text-amber-800 text-xs font-bold">
                  {language === 'te' ? '₹21 శకునం రుసుము మినహాయించబడుతుంది' : '₹21 Shagun fee applies'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsAddModalVisible(false)}
                className="p-1.5 rounded-full bg-stone-100"
              >
                <X size={18} color="#44403C" />
              </TouchableOpacity>
            </View>

            <ScrollView className="py-4" showsVerticalScrollIndicator={false}>
              {/* Service Title */}
              <Text className="text-stone-800 font-bold text-xs mb-1">
                {language === 'te' ? 'సర్వీస్ పేరు (Title) *' : 'Service Title *'}
              </Text>
              <TextInput
                value={serviceTitle}
                onChangeText={setServiceTitle}
                placeholder={
                  language === 'te'
                    ? 'ఉదా: తాటి ఆకుల పందిరి & 200 కుర్చీలు'
                    : 'e.g., Traditional Pandiri with 200 Chairs'
                }
                placeholderTextColor="#A8A29E"
                className="bg-stone-50 border border-stone-300 rounded-2xl p-3 text-stone-900 font-medium text-sm mb-3"
              />

              {/* Service Price */}
              <Text className="text-stone-800 font-bold text-xs mb-1">
                {language === 'te' ? 'ధర (రూపాయల్లో ₹) *' : 'Price in INR (₹) *'}
              </Text>
              <TextInput
                value={servicePrice}
                onChangeText={setServicePrice}
                keyboardType="numeric"
                placeholder="5000"
                placeholderTextColor="#A8A29E"
                className="bg-stone-50 border border-stone-300 rounded-2xl p-3 text-stone-900 font-bold text-sm mb-3"
              />

              {/* Experience and Deals Closed in Row */}
              <View className="flex-row gap-2.5 mb-3">
                <View className="flex-1">
                  <Text className="text-stone-800 font-bold text-xs mb-1">
                    {language === 'te' ? 'అనుభవం (సంవత్సరాలు)' : 'Experience (Years)'}
                  </Text>
                  <TextInput
                    value={experienceYrs}
                    onChangeText={setExperienceYrs}
                    keyboardType="numeric"
                    placeholder="5"
                    placeholderTextColor="#A8A29E"
                    className="bg-stone-50 border border-stone-300 rounded-2xl p-3 text-stone-900 font-bold text-sm"
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-stone-800 font-bold text-xs mb-1">
                    {language === 'te' ? 'పూర్తి చేసిన ఈవెంట్లు' : 'Deals / Events Done'}
                  </Text>
                  <TextInput
                    value={completedDeals}
                    onChangeText={setCompletedDeals}
                    keyboardType="numeric"
                    placeholder="50"
                    placeholderTextColor="#A8A29E"
                    className="bg-stone-50 border border-stone-300 rounded-2xl p-3 text-stone-900 font-bold text-sm"
                  />
                </View>
              </View>

              {/* Work Samples (Photos) Collection */}
              <Text className="text-stone-800 font-bold text-xs mb-1">
                {language === 'te' ? 'పని నమూనాలు (Work Sample Photo URLs)' : 'Work Samples (Photo URLs)'}
              </Text>
              <View className="flex-row items-center mb-2">
                <TextInput
                  value={sampleImageUrl}
                  onChangeText={setSampleImageUrl}
                  placeholder="https://... (Photo URL)"
                  placeholderTextColor="#A8A29E"
                  className="bg-stone-50 border border-stone-300 rounded-2xl p-3 text-stone-900 text-xs flex-1 mr-2"
                />
                <TouchableOpacity
                  onPress={handleAddSampleImage}
                  className="bg-stone-800 px-3.5 py-3 rounded-2xl"
                >
                  <Text className="text-white font-bold text-xs">+ Add</Text>
                </TouchableOpacity>
              </View>

              {/* Preview thumbnails */}
              {sampleImages.length > 0 && (
                <View className="flex-row flex-wrap gap-2 mb-3">
                  {sampleImages.map((url, i) => (
                    <View key={i} className="relative">
                      <Image source={{ uri: url }} className="w-16 h-14 rounded-xl bg-stone-200" />
                      <TouchableOpacity
                        onPress={() => handleRemoveSampleImage(i)}
                        className="absolute -top-1 -right-1 bg-red-600 rounded-full w-5 h-5 items-center justify-center"
                      >
                        <Text className="text-white text-[10px] font-black">×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Inclusions */}
              <Text className="text-stone-800 font-bold text-xs mb-1">
                {language === 'te' ? 'ప్రత్యేకతలు / సదుపాయాలు (Inclusions)' : 'Inclusions'}
              </Text>
              <TextInput
                value={serviceInclusions}
                onChangeText={setServiceInclusions}
                multiline
                numberOfLines={3}
                placeholder={
                  language === 'te'
                    ? 'ఉదా: రవాణా ఖర్చులు మావే, లైటింగ్ ఉచితం, సమయానికి అమర్చబడును'
                    : 'e.g. Free transport within mandal, lights included'
                }
                placeholderTextColor="#A8A29E"
                className="bg-stone-50 border border-stone-300 rounded-2xl p-3 text-stone-900 text-sm mb-4"
                style={{ textAlignVertical: 'top' }}
              />

              {/* ₹21 Fee Confirmation Callout */}
              <View className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 mb-5 flex-row items-center">
                <Info size={18} color="#D97706" />
                <View className="ml-2 flex-1">
                  <Text className="text-amber-950 font-bold text-xs">
                    {language === 'te'
                      ? 'మీ వాలెట్ బ్యాలెన్స్ నుండి ₹21 మినహాయించబడుతుంది.'
                      : '₹21 will be debited from your current wallet balance.'}
                  </Text>
                  <Text className="text-amber-800 text-[11px]">
                    {language === 'te'
                      ? `ప్రస్తుత బ్యాలెన్స్: ₹${walletRupees}`
                      : `Current Balance: ₹${walletRupees}`}
                  </Text>
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleCreateService}
                disabled={createServiceMutation.isPending}
                activeOpacity={0.85}
                className="bg-amber-600 p-4 rounded-2xl items-center shadow-md mb-6"
              >
                {createServiceMutation.isPending ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-black text-sm">
                    {language === 'te'
                      ? 'ప్రచురించండి (₹21 చెల్లించండి)'
                      : 'Publish Service (Pay ₹21)'}
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
