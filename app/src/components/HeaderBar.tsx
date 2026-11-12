import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPin, Globe } from 'lucide-react-native';
import { useLocationStore } from '../stores/locationStore';
import { colors } from '../theme/colors';

interface HeaderProps {
  onOpenLocationModal?: () => void;
}

export const HeaderBar: React.FC<HeaderProps> = ({ onOpenLocationModal }) => {
  const { district, mandal, language, setLanguage } = useLocationStore();

  return (
    <View style={{ backgroundColor: colors.primary }} className="pt-12 pb-4 px-4 shadow-md">
      <View className="flex-row items-center justify-between">
        {/* Brand / Logo Title */}
        <View>
          <Text className="text-white text-xs font-semibold uppercase tracking-wider text-amber-200">
            {language === 'te' ? 'తెలంగాణ వెడ్డింగ్స్' : 'Telangana Weddings'}
          </Text>
          <Text className="text-white text-xl font-bold">
            {language === 'te' ? 'పెళ్లి సేవలు' : 'Hyperlocal Services'}
          </Text>
        </View>

        {/* Location & Language controls */}
        <View className="flex-row items-center space-x-2">
          {/* Location Chip */}
          <TouchableOpacity
            onPress={onOpenLocationModal}
            className="flex-row items-center bg-white/15 px-3 py-1.5 rounded-full border border-white/20"
          >
            <MapPin size={14} color="#F9F1DC" />
            <Text className="text-white text-xs font-medium ml-1">
              {mandal ? `${mandal}, ${district}` : district}
            </Text>
          </TouchableOpacity>

          {/* Language Toggle */}
          <TouchableOpacity
            onPress={() => setLanguage(language === 'te' ? 'en' : 'te')}
            className="flex-row items-center bg-amber-400 px-2.5 py-1.5 rounded-full"
          >
            <Globe size={13} color="#4E0D10" />
            <Text className="text-brand-deepMaroon text-xs font-bold ml-1">
              {language === 'te' ? 'EN' : 'తెలుగు'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

