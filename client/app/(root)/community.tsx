import { StatusBar } from "expo-status-bar";
import { MessageSquare, Search, Users } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * CommunityScreen
 *
 * Campus student community hub, student forums, and peer groups.
 */
export default function CommunityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="border-b border-slate-200 bg-white px-5 py-4">
        <Text className="font-inter-bold text-2xl text-slate-900">
          Community
        </Text>
        <Text className="font-inter text-xs text-slate-500 mt-0.5">
          Connect with campus peers, clubs, and study groups.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm items-center justify-center py-12">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-blue-50 mb-3">
            <Users size={32} color="#0B2A6B" />
          </View>
          <Text className="font-inter-bold text-lg text-slate-800">
            Student Groups & Forums
          </Text>
          <Text className="text-center font-inter text-xs text-slate-500 mt-1 max-w-[240px]">
            Explore student organizations, discussion channels, and campus events.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
