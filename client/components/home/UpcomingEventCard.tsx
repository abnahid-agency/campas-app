import { Calendar, ChevronRight, MapPin } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface UpcomingEventCardProps {
  onEventPress?: () => void;
  onViewAllPress?: () => void;
}

/**
 * UpcomingEventCard
 *
 * Displays upcoming campus events at North East University Bangladesh.
 */
export function UpcomingEventCard({
  onEventPress,
  onViewAllPress,
}: UpcomingEventCardProps) {
  return (
    <View className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Calendar size={18} color="#0B2A6B" />
          <Text className="font-inter-bold text-sm text-slate-900">
            Upcoming Event
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

      {/* Event Item */}
      <Pressable
        onPress={onEventPress}
        className="relative overflow-hidden flex-row items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 active:bg-slate-100"
      >
        <View className="flex-row items-center gap-3.5 flex-1">
          {/* Calendar Date Badge */}
          <View className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm w-12 items-center">
            <View className="w-full bg-[#0B2A6B] py-0.5 items-center">
              <Text className="font-inter-bold text-[9px] text-white">
                SEP
              </Text>
            </View>
            <Text className="font-inter-bold text-lg text-slate-900 py-0.5">
              15
            </Text>
            <Text className="font-inter-medium text-[9px] text-slate-400 pb-1">
              SUN
            </Text>
          </View>

          {/* Event Details */}
          <View className="flex-1">
            <Text className="font-inter-bold text-sm text-slate-900">
              NEUB Tech Fest & Orientation
            </Text>
            <Text
              className="font-inter text-xs text-slate-600 mt-0.5"
              numberOfLines={1}
            >
              Annual campus innovation exhibition and welcome!
            </Text>

            <View className="flex-row items-center justify-between mt-1.5">
              <View className="flex-row items-center gap-1">
                <MapPin size={12} color="#64748B" />
                <Text className="font-inter text-[11px] text-slate-500">
                  NEUB Auditorium, Sylhet
                </Text>
              </View>

              <Text className="font-inter-bold text-xs text-[#0B2A6B]">
                10:00 AM
              </Text>
            </View>
          </View>
        </View>

        {/* Chevron */}
        <View className="items-center pl-2">
          <ChevronRight size={18} color="#94A3B8" />
        </View>
      </Pressable>
    </View>
  );
}

export default UpcomingEventCard;
