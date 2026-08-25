import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { GraduationCap } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

/**
 * HeroUniversityCard
 *
 * Implements the Campus Hero Banner matching the exact design mockup:
 * - 70% dark royal navy background (#052866) perfectly matching the top header.
 * - Architecture photography on the right blended seamlessly using a multi-stop LinearGradient (0% to 100% opacity fade).
 * - Left shield badge with university crest and clean hierarchy.
 * - Compact 4-5 letter punchy tagline ("We Are. 🦁" / "NEUB 🎓").
 * - Carousel pagination dots (pill indicator + circular dots).
 */
export function HeroUniversityCard() {
  return (
 <View className="overflow-hidden rounded-3xl border border-blue-400/25 bg-primary shadow-lg shadow-blue-950/40">
  <View className="relative h-44 w-full justify-between p-5">
        {/* Right Campus Architecture Image (68% width) */}
        <Image
      source={{
        uri: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=85",
      }}
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "68%",
      }}
      contentFit="cover"
    />

    <LinearGradient
      colors={[
        "#0B2F6F",
        "rgba(11, 47, 111, 0.95)",
        "rgba(11, 47, 111, 0.70)",
        "rgba(11, 47, 111, 0.20)",
        "transparent",
      ]}
      locations={[0, 0.3, 0.55, 0.8, 1]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
    />



      
        {/* Top Content: Shield Crest & University Name */}
        <View className="relative z-10 flex-row items-center gap-3">
          {/* Shield Badge */}
          <View className="h-13 w-13 items-center justify-center rounded-2xl border border-white/30 bg-white/10 shadow-sm backdrop-blur-md">
            <GraduationCap size={26} color="#FFFFFF" strokeWidth={2.2} />
          </View>

          {/* University Name */}
          <View className="flex-1">
            <Text
              className="font-inter-bold text-xl tracking-tight text-white"
              numberOfLines={1}
            >
              North East University
            </Text>
            <Text className="mt-0.5 font-inter text-xs text-blue-200">
              Bangladesh • Sylhet
            </Text>
          </View>
        </View>

        {/* Bottom Content: Compact 5-Letter Tagline & Carousel Dots */}
        <View className="relative z-10 flex-row items-end justify-between">
          {/* Short compact tagline */}
          <Text className="font-inter-semibold text-sm tracking-wide text-white">
            {"We Are. 🦁"}
          </Text>

          {/* Carousel Pagination Dots */}
          <View className="flex-row items-center gap-1.5 pb-0.5">
            {/* Active Pill Dot */}
            <View className="h-1.5 w-6 rounded-full bg-white shadow-sm" />
            {/* Inactive Dots */}
            <View className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <View className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <View className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default HeroUniversityCard;
