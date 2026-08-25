import { useRouter } from "expo-router";
import {
  BookOpen,
  FileText,
  Home,
  User,
  Users,
} from "lucide-react-native";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

export type NavTab = "home" | "community" | "notices" | "qbank" | "profile";

interface BottomNavBarProps {
  /** The currently selected navigation tab */
  activeTab?: NavTab;
  /** Optional callback when a tab is pressed */
  onTabPress?: (tab: NavTab) => void;
}

/**
 * BottomNavBar
 *
 * Platform-adaptive bottom navigation bar:
 * - Liquid glass translucent frosted aesthetic with subtle top border and shadow.
 * - Robust cross-platform support across iOS, Android, and Web without runtime bundling issues.
 * - Tabs: Home, Community, Notices, Q. Bank, Profile.
 */
export function BottomNavBar({
  activeTab = "home",
  onTabPress,
}: BottomNavBarProps) {
  const router = useRouter();

  const tabs: { id: NavTab; label: string; icon: React.ComponentType<any> }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "community", label: "Community", icon: Users },
    { id: "notices", label: "Notices", icon: FileText },
    { id: "qbank", label: "Q. Bank", icon: BookOpen },
    { id: "profile", label: "Profile", icon: User },
  ];

  /**
   * handlePress
   *
   * Triggers tab callback when a user taps a navigation item.
   */
  const handlePress = (tabId: NavTab) => {
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  const isIOS = Platform.OS === "ios";

  return (
    <View
      className={`absolute bottom-0 left-0 right-0 border-t ${
        isIOS
          ? "border-slate-200/60 bg-white/90 pb-6 shadow-lg shadow-black/5"
          : "border-slate-200/90 bg-white pb-3 shadow-lg shadow-black/10"
      }`}
      style={{
        // Frosted glass elevation style
        elevation: 8,
      }}
    >
      <View className="flex-row items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <Pressable
              key={tab.id}
              onPress={() => handlePress(tab.id)}
              className="items-center justify-center py-1 px-3"
              hitSlop={8}
            >
              {/* Active Indicator Top Pill */}
              <View
                className={`h-1 w-6 rounded-full mb-1 ${
                  isActive ? "bg-[#0B2A6B]" : "bg-transparent"
                }`}
              />

              {/* Icon */}
              <IconComponent
                size={22}
                color={isActive ? "#0B2A6B" : "#64748B"}
                strokeWidth={isActive ? 2.4 : 1.8}
              />

              {/* Tab Label */}
              <Text
                className={`mt-1 font-inter text-[11px] ${
                  isActive
                    ? "font-inter-bold text-[#0B2A6B]"
                    : "font-inter-medium text-slate-500"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default BottomNavBar;
