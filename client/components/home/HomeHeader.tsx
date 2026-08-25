import { Image } from "expo-image";
import { Bell, Menu } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeHeaderProps {
  /** Callback when menu button is pressed */
  onMenuPress?: () => void;
  /** Callback when notification bell is pressed */
  onNotificationPress?: () => void;
  /** Callback when profile avatar is pressed */
  onProfilePress?: () => void;
}

/**
 * HomeHeader
 *
 * Top royal blue bar displaying North East University Bangladesh / Campus App branding.
 */
export function HomeHeader({
  onMenuPress,
  onNotificationPress,
  onProfilePress,
}: HomeHeaderProps) {
  return (
    <View className="bg-[#062966] pt-12 pb-6 px-5">
      <SafeAreaView edges={["top"]} className="-mt-12">
        <View className="flex-row items-center justify-between pt-2">
          {/* Hamburger Menu */}
          <Pressable
            onPress={onMenuPress}
            hitSlop={10}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-white/10"
          >
            <Menu size={22} color="#FFFFFF" />
          </Pressable>

          {/* University Title & Subtitle */}
          <View className="items-center max-w-[220px]">
            <Text
              className="font-inter-bold text-base text-white text-center"
              numberOfLines={1}
            >
              North East University
            </Text>
            <Text className="mt-0.5 font-inter text-[11px] text-blue-200/90">
              Campus App • Sylhet
            </Text>
          </View>

          {/* Right Accessories: Notifications & Avatar */}
          <View className="flex-row items-center gap-2.5">
            {/* Notification Bell with Badge */}
            <Pressable
              onPress={onNotificationPress}
              hitSlop={8}
              className="relative h-10 w-10 items-center justify-center rounded-full active:bg-white/10"
            >
              <Bell size={21} color="#FFFFFF" />
              {/* Notification count badge */}
              <View className="absolute right-1.5 top-1.5 h-4 w-4 items-center justify-center rounded-full bg-red-500 border border-[#062966]">
                <Text className="font-inter-bold text-[9px] text-white">
                  3
                </Text>
              </View>
            </Pressable>

            {/* Profile Avatar */}
            <Pressable
              onPress={onProfilePress}
              className="h-9 w-9 overflow-hidden rounded-full border-2 border-white/80 active:opacity-80"
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default HomeHeader;
