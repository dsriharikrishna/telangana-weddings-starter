import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { HeaderBar } from '@/components/HeaderBar';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';
import { User, LogIn, LogOut, Phone, ShieldCheck, HeartHandshake } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <View className="flex-1 bg-stone-50">
      <HeaderBar />

      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        {isAuthenticated && user ? (
          <View>
            <View className="bg-white p-6 rounded-3xl border border-stone-200 mb-4 items-center">
              <View style={{ backgroundColor: colors.secondaryLight }} className="w-16 h-16 rounded-full items-center justify-center mb-3">
                <User size={32} color={colors.primary} />
              </View>
              <Text className="text-stone-900 font-extrabold text-lg">{user.fullName || 'Valued User'}</Text>
              <Text className="text-stone-500 font-medium text-xs mt-0.5">{user.phone}</Text>

              <View className="flex-row items-center mt-3 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <ShieldCheck size={14} color="#D4AF37" />
                <Text className="text-amber-900 font-bold text-xs ml-1">
                  Roles: {user.roles.join(', ')}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={logout}
              className="bg-red-50 border border-red-200 p-4 rounded-2xl flex-row items-center justify-center"
            >
              <LogOut size={18} color="#DC2626" />
              <Text className="text-red-700 font-bold text-sm ml-2">Log Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm items-center text-center">
            <View style={{ backgroundColor: colors.secondaryLight }} className="p-4 rounded-full mb-3">
              <User size={36} color={colors.primary} />
            </View>
            <Text className="text-stone-900 font-extrabold text-lg mb-1">Customer Account</Text>
            <Text className="text-stone-500 text-xs text-center mb-6 leading-relaxed">
              Log in with your mobile number to view past enquiries, save favourite vendors, and track status.
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/auth/login')}
              style={{ backgroundColor: colors.primary }}
              className="w-full py-3.5 rounded-xl flex-row items-center justify-center shadow-sm"
            >
              <LogIn size={18} color="#FFFFFF" />
              <Text className="text-white font-bold text-sm ml-2">Login / Register with OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Support Card */}
        <View className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mt-6">
          <View className="flex-row items-center mb-2">
            <HeartHandshake size={20} color="#701A1E" />
            <Text className="text-stone-900 font-bold text-sm ml-2">Telangana Weddings Support</Text>
          </View>
          <Text className="text-stone-600 text-xs leading-relaxed">
            Need direct assistance with vendor booking or have questions? Contact our regional helpline at +91 94940 00000.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

