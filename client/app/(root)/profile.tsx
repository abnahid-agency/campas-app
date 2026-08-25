import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ChevronRight,
  CreditCard,
  LogOut,
  Mail,
  School,
  Settings,
  Shield,
  User,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * ProfileScreen
 *
 * Student profile view displaying student credentials, university department, settings, and sign-out.
 */
export default function ProfileScreen() {
  const router = useRouter();

  /**
   * handleSignOut
   *
   * Clears active session and routes back to the authentication screen.
   */
  const handleSignOut = () => {
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["top"]}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View className="items-center rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          {/* Avatar */}
          <View className="h-20 w-20 overflow-hidden rounded-full border-4 border-blue-50 shadow-sm mb-3">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
              }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </View>

          <Text className="font-inter-bold text-xl text-slate-900">
            Nittany Lion
          </Text>
          <Text className="font-inter text-xs text-slate-500 mt-0.5">
            student@university.edu
          </Text>

          {/* Badge */}
          <View className="mt-3 flex-row items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1">
            <School size={13} color="#0B2A6B" />
            <Text className="font-inter-semibold text-[11px] text-[#0B2A6B]">
              Computer Science & Engineering
            </Text>
          </View>
        </View>

        {/* Profile Details List */}
        <View className="mt-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm gap-1">
          {/* Student ID */}
          <View className="flex-row items-center justify-between p-3 border-b border-slate-100">
            <View className="flex-row items-center gap-3">
              <CreditCard size={18} color="#64748B" />
              <Text className="font-inter-medium text-xs text-slate-700">
                Student ID
              </Text>
            </View>
            <Text className="font-inter-semibold text-xs text-slate-900">
              12345678
            </Text>
          </View>

          {/* Academic Batch */}
          <View className="flex-row items-center justify-between p-3 border-b border-slate-100">
            <View className="flex-row items-center gap-3">
              <School size={18} color="#64748B" />
              <Text className="font-inter-medium text-xs text-slate-700">
                Academic Batch
              </Text>
            </View>
            <Text className="font-inter-semibold text-xs text-slate-900">
              2024-2025 (Summer)
            </Text>
          </View>

          {/* Security */}
          <Pressable className="flex-row items-center justify-between p-3">
            <View className="flex-row items-center gap-3">
              <Shield size={18} color="#64748B" />
              <Text className="font-inter-medium text-xs text-slate-700">
                Privacy & Security
              </Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </Pressable>
        </View>

        {/* Sign Out Action Button */}
        <Pressable
          onPress={handleSignOut}
          className="mt-5 h-12 flex-row items-center justify-center gap-2 rounded-2xl bg-red-50 border border-red-200 active:bg-red-100"
        >
          <LogOut size={17} color="#DC2626" />
          <Text className="font-inter-semibold text-sm text-red-600">
            Sign Out
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
