import {
  Bookmark,
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  FlaskConical,
  LayoutGrid,
  MapPin,
  Search,
  Users,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

export interface QuickAccessItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  route?: string;
}

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: "notices",
    label: "Notices",
    icon: FileText,
    iconColor: "#0B2A6B",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    route: "/(root)/notices",
  },
  {
    id: "community",
    label: "Community",
    icon: Users,
    iconColor: "#4F46E5",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100",
    route: "/(root)/community",
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    iconColor: "#D97706",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
  },
  {
    id: "qbank",
    label: "Q. Bank",
    icon: BookOpen,
    iconColor: "#059669",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    route: "/(root)/qbank",
  },
  {
    id: "maps",
    label: "Campus Map",
    icon: MapPin,
    iconColor: "#0D9488",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100",
  },
  {
    id: "lost_found",
    label: "Lost & Found",
    icon: Search,
    iconColor: "#7C3AED",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
  },
  {
    id: "labs",
    label: "Labs",
    icon: FlaskConical,
    iconColor: "#E11D48",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
  },
  {
    id: "more",
    label: "More",
    icon: LayoutGrid,
    iconColor: "#64748B",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
  },
];

interface QuickAccessGridProps {
  onItemPress?: (item: QuickAccessItem) => void;
  onViewAllPress?: () => void;
}

/**
 * QuickAccessGrid
 *
 * 4x2 grid of campus quick-action tiles for North East University Bangladesh.
 * Includes: Notice Board, Community, Events, Question Bank, Campus Map, Lost & Found, Labs, and More.
 */
export function QuickAccessGrid({
  onItemPress,
  onViewAllPress,
}: QuickAccessGridProps) {
  return (
    <View className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3.5">
        <View className="flex-row items-center gap-2">
          <Bookmark size={18} color="#0B2A6B" />
          <Text className="font-inter-bold text-sm text-slate-900">
            Quick Access
          </Text>
        </View>

        <Pressable
          onPress={onViewAllPress}
          hitSlop={6}
          className="flex-row items-center gap-0.5"
        >
          <Text className="font-inter-semibold text-xs text-[#0B2A6B]">
            View All
          </Text>
          <ChevronRight size={13} color="#0B2A6B" />
        </Pressable>
      </View>

      {/* 4x2 Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-3.5">
        {QUICK_ACCESS_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <Pressable
              key={item.id}
              onPress={() => onItemPress?.(item)}
              className="w-[22%] items-center active:opacity-75"
            >
              {/* Rounded App Icon Box */}
              <View
                className={`h-14 w-14 items-center justify-center rounded-2xl border ${item.bgColor} ${item.borderColor} shadow-sm`}
              >
                <IconComponent
                  size={23}
                  color={item.iconColor}
                  strokeWidth={2.1}
                />
              </View>

              {/* App Label */}
              <Text
                className="mt-1.5 text-center font-inter-medium text-[11px] text-slate-800"
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default QuickAccessGrid;
