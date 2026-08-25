import {
  Bookmark,
  Bus,
  ChevronRight,
  CreditCard,
  GraduationCap,
  LayoutGrid,
  Mail,
  MapPin,
  Navigation,
  Utensils,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const QUICK_ACCESS_ITEMS = [
  {
    id: "portal",
    label: "Portal",
    icon: Navigation,
    iconColor: "#0B2A6B",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  {
    id: "lms",
    label: "LMS",
    icon: GraduationCap,
    iconColor: "#E11D48",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    iconColor: "#0284C7",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-100",
  },
  {
    id: "cafeteria",
    label: "Cafeteria",
    icon: Utensils,
    iconColor: "#0D9488",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100",
  },
  {
    id: "id_card",
    label: "ID Card",
    icon: CreditCard,
    iconColor: "#2563EB",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100",
  },
  {
    id: "maps",
    label: "Map",
    icon: MapPin,
    iconColor: "#16A34A",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
  },
  {
    id: "transport",
    label: "Transport",
    icon: Bus,
    iconColor: "#0891B2",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-100",
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
  onItemPress?: (id: string) => void;
  onViewAllPress?: () => void;
}

/**
 * QuickAccessGrid
 *
 * 4x2 grid of campus quick-action tiles for North East University Bangladesh.
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

      {/* Grid */}
      <View className="flex-row flex-wrap justify-between gap-y-3.5">
        {QUICK_ACCESS_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <Pressable
              key={item.id}
              onPress={() => onItemPress?.(item.id)}
              className="w-[22%] items-center active:opacity-75"
            >
              {/* Rounded App Icon Box */}
              <View
                className={`h-14 w-14 items-center justify-center rounded-2xl border ${item.bgColor} ${item.borderColor} shadow-sm`}
              >
                <IconComponent
                  size={24}
                  color={item.iconColor}
                  strokeWidth={2}
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
