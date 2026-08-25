import { GreetingWeatherCard } from "@/components/home/GreetingWeatherCard";
import { HeroUniversityCard } from "@/components/home/HeroUniversityCard";
import { HomeHeader } from "@/components/home/HomeHeader";
import { LatestNoticesCard } from "@/components/home/LatestNoticesCard";
import { QuickAccessGrid } from "@/components/home/QuickAccessGrid";
import { UpcomingEventCard } from "@/components/home/UpcomingEventCard";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, View } from "react-native";

/**
 * HomeScreen
 *
 * Implements the Campus Home Screen matching the exact design mockup.
 * Tab navigation is rendered natively by the root TabLayout.
 */
export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar style="light" />

      <View
        pointerEvents="none"
        className="absolute left-0 right-0 top-0 h-[210px] bg-[#0B2A6B]"
      />

      {/* 1. Top Header */}
      <HomeHeader
        onMenuPress={() => console.log("Menu pressed")}
        onNotificationPress={() => console.log("Notifications pressed")}
        onProfilePress={() => router.push("/(root)/profile" as any)}
      />

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 -mt-3"
      >
        <View className="px-4 gap-4">
          {/* 2. Hero Banner Card */}
          <HeroUniversityCard />

          {/* 3. Greeting & Weather Card */}
          <GreetingWeatherCard />

          {/* 4. Quick Access 4x2 Grid */}
          <QuickAccessGrid
            onItemPress={(item) => {
              if (item.route) {
                router.push(item.route as any);
              } else {
                console.log(`Quick action tapped: ${item.id}`);
              }
            }}
            onViewAllPress={() => console.log("View all quick access")}
          />

          {/* 5. Latest Notices Section */}
          <LatestNoticesCard
            onNoticePress={() => router.push("/(root)/notices" as any)}
            onViewAllPress={() => router.push("/(root)/notices" as any)}
          />

          {/* 6. Upcoming Events Section */}
          <UpcomingEventCard
            onEventPress={() => console.log("Event opened")}
            onViewAllPress={() => console.log("View all events")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
