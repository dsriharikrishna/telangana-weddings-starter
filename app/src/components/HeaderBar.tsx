import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Globe } from 'lucide-react-native';
import { useLocationStore } from '../stores/locationStore';
import { colors } from '../theme/colors';

interface HeaderProps {
  onOpenLocationModal?: () => void;
}

export const HeaderBar: React.FC<HeaderProps> = ({ onOpenLocationModal }) => {
  const { district, mandal, language, setLanguage } = useLocationStore();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingTop: Math.max(insets.top, 12),
      }}
      className="pb-3 px-4 shadow-md"
    >
      <View className="flex-row items-center justify-between gap-2">
        {/* Brand / Logo Title */}
        <View className="flex-1 shrink min-w-0 mr-2">
          <Text
            className="text-amber-200 text-xs font-semibold uppercase tracking-wider"
            numberOfLines={1}
          >
            {language === 'te' ? 'తెలంగాణ వెడ్డింగ్స్' : 'Telangana Weddings'}
          </Text>
          <Text
            className="text-white text-lg sm:text-xl font-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {language === 'te' ? 'పెళ్లి సేవలు' : 'Hyperlocal Services'}
          </Text>
        </View>

        {/* Location & Language controls */}
        <View className="flex-row items-center gap-1.5 shrink-0">
          {/* Location Chip */}
          <TouchableOpacity
            onPress={onOpenLocationModal}
            activeOpacity={0.7}
            className="flex-row items-center bg-white/15 px-2.5 py-1.5 rounded-full border border-white/20 max-w-[130px]"
          >
            <MapPin size={13} color="#F9F1DC" />
            <Text
              className="text-white text-xs font-medium ml-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {mandal ? `${mandal}, ${district}` : district}
            </Text>
          </TouchableOpacity>

          {/* Language Toggle */}
          <TouchableOpacity
            onPress={() => setLanguage(language === 'te' ? 'en' : 'te')}
            activeOpacity={0.8}
            className="flex-row items-center bg-amber-400 px-2 py-1.5 rounded-full shrink-0"
          >
            <Globe size={12} color="#4E0D10" />
            <Text className="text-amber-950 text-xs font-bold ml-1">
              {language === 'te' ? 'EN' : 'తెలుగు'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


