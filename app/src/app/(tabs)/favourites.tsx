import React from 'react';
import { View, Text } from 'react-native';
import { HeaderBar } from '@/components/HeaderBar';
import { Heart } from 'lucide-react-native';
import { colors } from '@/theme/colors';

export default function FavouritesScreen() {
  return (
    <View className="flex-1 bg-stone-50">
      <HeaderBar />
      <View className="flex-1 items-center justify-center p-6 text-center">
        <View style={{ backgroundColor: colors.secondaryLight }} className="p-4 rounded-full mb-3">
          <Heart size={32} color={colors.primary} />
        </View>
        <Text className="text-stone-900 font-bold text-lg mb-1">Saved Vendors</Text>
        <Text className="text-stone-500 text-xs text-center">
          Tap the bookmark or favourite icon on any vendor profile to easily revisit them later.
        </Text>
      </View>
    </View>
  );
}

