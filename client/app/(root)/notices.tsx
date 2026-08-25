import { StatusBar } from "expo-status-bar";
import { Bell, ChevronRight, FileText } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTICES = [
  {
    id: "1",
    title: "Fall 2024 Registration",
    description: "Registration for Fall 2024 semester courses is now officially open.",
    department: "Academic Office",
    time: "2h ago",
    isUnread: true,
  },
  {
    id: "2",
    title: "Mid-Term Examination Schedule",
    description: "The complete examination schedule has been published for all departments.",
    department: "Examination Controller",
    time: "1d ago",
    isUnread: false,
  },
  {
    id: "3",
    title: "Library Extended Hours",
    description: "The University Central Library will remain open until 11:00 PM starting this week.",
    department: "Library Services",
    time: "3d ago",
    isUnread: false,
  },
];

/**
 * NoticesScreen
 *
 * Official campus announcements, alerts, and department notices.
 */
export default function NoticesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="border-b border-slate-200 bg-white px-5 py-4">
        <Text className="font-inter-bold text-2xl text-slate-900">
          Notices & Announcements
        </Text>
        <Text className="font-inter text-xs text-slate-500 mt-0.5">
          Stay updated with official university communications.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        className="gap-3"
      >
        {NOTICES.map((notice) => (
          <Pressable
            key={notice.id}
            className="flex-row items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm active:bg-slate-50"
          >
            <View className="flex-row items-center gap-3.5 flex-1">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <FileText size={20} color="#0B2A6B" />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="font-inter-bold text-sm text-slate-900 flex-1" numberOfLines={1}>
                    {notice.title}
                  </Text>
                  {notice.isUnread && (
                    <View className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </View>

                <Text className="font-inter text-xs text-slate-600 mt-0.5" numberOfLines={2}>
                  {notice.description}
                </Text>

                <Text className="font-inter-medium text-[11px] text-[#0B2A6B] mt-1.5">
                  {notice.department} • {notice.time}
                </Text>
              </View>
            </View>

            <ChevronRight size={18} color="#94A3B8" />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
