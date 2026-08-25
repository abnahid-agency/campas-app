import { ChevronRight, FileText, Volume2 } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface LatestNoticesCardProps {
  onNoticePress?: () => void;
  onViewAllPress?: () => void;
}

/**
 * LatestNoticesCard
 *
 * Renders latest campus announcement notification card for North East University Bangladesh.
 */
export function LatestNoticesCard({
  onNoticePress,
  onViewAllPress,
}: LatestNoticesCardProps) {
  return (
    <View className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Volume2 size={18} color="#0B2A6B" />
          <Text className="font-inter-bold text-sm text-slate-900">
            Latest Notices
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

      {/* Notice Item */}
      <Pressable
        onPress={onNoticePress}
        className="flex-row items-center justify-between rounded-2xl border border-slate-100 bg-blue-50/40 p-3.5 active:bg-blue-50/80"
      >
        <View className="flex-row items-center gap-3 flex-1">
          {/* Document Icon Badge */}
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#0B2A6B] shadow-sm">
            <FileText size={20} color="#FFFFFF" />
          </View>

          {/* Notice Details */}
          <View className="flex-1">
            <Text className="font-inter-bold text-sm text-slate-900">
              Semester Registration Open
            </Text>
            <Text
              className="font-inter text-xs text-slate-600 mt-0.5"
              numberOfLines={1}
            >
              Course registration for the upcoming term is now live.
            </Text>
            <Text className="font-inter-medium text-[11px] text-[#0B2A6B] mt-1">
              Registrar Office • NEUB
            </Text>
          </View>
        </View>

        <ChevronRight size={18} color="#94A3B8" />
      </Pressable>
    </View>
  );
}

export default LatestNoticesCard;
