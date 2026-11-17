import { Tabs } from 'expo-router';
import React from 'react';
import { Home, Search, Heart, User, PhoneCall, Inbox, Layers, Wallet, UserCheck } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { useAuthStore } from '@/stores/authStore';

export default function TabLayout() {
  const appMode = useAuthStore((state) => state.appMode);
  const isVendorMode = appMode === 'VENDOR';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isVendorMode ? '#D97706' : colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: isVendorMode ? 'Leads' : 'Home',
          tabBarIcon: ({ color, size }) =>
            isVendorMode ? <Inbox size={size} color={color} /> : <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: isVendorMode ? 'Services' : 'Explore',
          tabBarIcon: ({ color, size }) =>
            isVendorMode ? <Layers size={size} color={color} /> : <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="assisted"
        options={{
          title: isVendorMode ? 'Wallet' : 'Concierge',
          tabBarIcon: ({ color, size }) =>
            isVendorMode ? <Wallet size={size} color={color} /> : <PhoneCall size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: isVendorMode ? 'Reviews' : 'Saved',
          tabBarIcon: ({ color, size }) =>
            isVendorMode ? <UserCheck size={size} color={color} /> : <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: isVendorMode ? 'Business' : 'Account',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

