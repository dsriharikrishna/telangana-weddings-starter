import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Star, MapPin, PhoneCall } from 'lucide-react-native';
import { Vendor } from '../services/marketplaceApi';
import { colors } from '../theme/colors';

interface VendorCardProps {
  vendor: Vendor;
  onPress: () => void;
  onEnquire: () => void;
  language: 'te' | 'en';
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  onPress,
  onEnquire,
  language,
}) => {
  const priceInRupees = Math.round(vendor.startingPricePaise / 100);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="bg-white rounded-2xl mb-4 p-4 border border-stone-200 shadow-sm"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-2">
          {/* Business Name */}
          <Text className="text-stone-900 font-bold text-lg leading-tight" numberOfLines={1}>
            {vendor.businessName}
          </Text>

          {/* Category Tag */}
          <Text className="text-amber-800 font-medium text-xs mt-0.5">
            {language === 'te'
              ? vendor.primaryCategory?.nameTe || 'పెళ్లి సేవ'
              : vendor.primaryCategory?.nameEn || 'Wedding Service'}
          </Text>

          {/* Location */}
          <View className="flex-row items-center mt-2">
            <MapPin size={13} color={colors.textMuted} />
            <Text className="text-stone-500 text-xs ml-1 font-medium">
              {vendor.baseVillageOrTown}, {vendor.baseMandal}
            </Text>
          </View>
        </View>

        {/* Rating Badge */}
        <View className="flex-row items-center bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
          <Star size={13} color="#D4AF37" fill="#D4AF37" />
          <Text className="text-amber-900 font-bold text-xs ml-1">
            {vendor.ratingAverage.toFixed(1)}
          </Text>
        </View>
      </View>

      {/* Starting Price & Action */}
      <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-stone-100">
        <View>
          <Text className="text-stone-400 text-[11px] uppercase font-semibold">
            {language === 'te' ? 'ప్రారంభ ధర' : 'Starting From'}
          </Text>
          <Text className="text-stone-900 font-extrabold text-base">
            {priceInRupees > 0 ? `₹${priceInRupees.toLocaleString('en-IN')}` : 'On Request'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onEnquire}
          style={{ backgroundColor: colors.primary }}
          className="flex-row items-center px-4 py-2 rounded-xl"
        >
          <PhoneCall size={14} color="#FFFFFF" />
          <Text className="text-white font-bold text-xs ml-1.5">
            {language === 'te' ? 'సంప్రదించండి' : 'Enquire'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

