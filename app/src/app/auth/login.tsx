import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { apiClient } from '@/services/apiClient';
import { useAuthStore } from '@/stores/authStore';
import { colors } from '@/theme/colors';
import { ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react-native';

export default function LoginModal() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/auth/send-otp', { phone });
      setStep('OTP');
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Could not send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit verification code.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/verify-otp', {
        phone,
        otp,
        role: 'CUSTOMER',
      });
      setAuth({
        accessToken: res.data.accessToken,
        user: res.data.user,
      });
      Alert.alert('Success', 'Logged in successfully!');
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Incorrect or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-stone-900/40 justify-center p-4">
      <View className="bg-white rounded-3xl p-6 shadow-2xl">
        <TouchableOpacity onPress={() => router.back()} className="mb-4 self-start p-1">
          <ArrowLeft size={22} color="#1F2937" />
        </TouchableOpacity>

        <Text className="text-stone-900 font-extrabold text-2xl mb-1">
          {step === 'PHONE' ? 'Welcome Back' : 'Verify OTP'}
        </Text>
        <Text className="text-stone-500 text-xs mb-6">
          {step === 'PHONE'
            ? 'Enter your mobile number to receive a one-time login PIN.'
            : `Enter the 6-digit code sent to ${phone}. (Mock dev OTP: 123456)`}
        </Text>

        {step === 'PHONE' ? (
          <View>
            <View className="mb-6">
              <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">Mobile Number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="9876543210"
                keyboardType="phone-pad"
                className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-bold text-base"
              />
            </View>

            <TouchableOpacity
              onPress={handleSendOtp}
              disabled={loading}
              style={{ backgroundColor: colors.primary }}
              className="py-3.5 rounded-xl items-center"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white font-bold text-base">Send OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View className="mb-6">
              <Text className="text-stone-700 text-xs font-bold uppercase mb-1.5">6-Digit OTP</Text>
              <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="123456"
                keyboardType="number-pad"
                maxLength={6}
                className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 font-bold text-lg text-center tracking-widest"
              />
            </View>

            <TouchableOpacity
              onPress={handleVerifyOtp}
              disabled={loading}
              style={{ backgroundColor: colors.primary }}
              className="py-3.5 rounded-xl items-center mb-3"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white font-bold text-base">Verify & Continue</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep('PHONE')} className="py-2 items-center">
              <Text className="text-stone-500 text-xs font-medium">Change Mobile Number</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

