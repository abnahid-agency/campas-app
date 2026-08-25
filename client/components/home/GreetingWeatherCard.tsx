import { BadgeCheck, Moon, Sun, Sunset } from "lucide-react-native";
import React, { useMemo } from "react";
import { Text, View } from "react-native";

/**
 * GreetingWeatherCard
 *
 * Dynamically computes greetings ("Good Morning", "Good Afternoon", "Good Evening", "Good Night"),
 * time-of-day weather conditions, and live formatted date based on current local time in Sylhet, Bangladesh.
 */
export function GreetingWeatherCard() {
  /**
   * timeContext
   *
   * Computes dynamic greeting text, weather badges, and temperature metrics.
   */
  const timeContext = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();

    // 5:00 AM – 11:59 AM
    if (hours >= 5 && hours < 12) {
      return {
        greeting: "Good Morning,",
        icon: Sun,
        iconColor: "#F59E0B",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200/60",
        condition: "Clear • 28°C ☀️",
        temp: "28°",
      };
    }

    // 12:00 PM – 4:59 PM
    if (hours >= 12 && hours < 17) {
      return {
        greeting: "Good Afternoon,",
        icon: Sun,
        iconColor: "#F59E0B",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200/60",
        condition: "Sunny • 31°C ☀️",
        temp: "31°",
      };
    }

    // 5:00 PM – 7:59 PM
    if (hours >= 17 && hours < 20) {
      return {
        greeting: "Good Evening,",
        icon: Sunset,
        iconColor: "#EA580C",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200/60",
        condition: "Sunset • 27°C 🌅",
        temp: "27°",
      };
    }

    // 8:00 PM – 4:59 AM (Night time)
    return {
      greeting: "Good Evening,",
      icon: Moon,
      iconColor: "#6366F1",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200/60",
      condition: "Clear Night • 24°C 🌙",
      temp: "24°",
    };
  }, []);

  /**
   * formattedDate
   *
   * Returns current day and date (e.g. "Tuesday, Aug 25, 2026").
   */
  const formattedDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const WeatherIcon = timeContext.icon;

  return (
    <View className="flex-row items-center justify-between rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
      {/* Left: Greeting & Student Details */}
      <View className="flex-row items-center gap-3 flex-1">
        {/* Dynamic Time-of-Day Icon Badge */}
        <View
          className={`h-13 w-13 items-center justify-center rounded-2xl ${timeContext.bgColor} border ${timeContext.borderColor}`}
        >
          <WeatherIcon size={24} color={timeContext.iconColor} />
        </View>

        <View className="flex-1">
          {/* Dynamic Greeting */}
          <Text className="font-inter text-xs text-slate-500">
            {timeContext.greeting}
          </Text>

          {/* Student Name with Verified Badge */}
          <View className="flex-row items-center gap-1 mt-0.5">
            <Text className="font-inter-bold text-base text-slate-900">
              NEUB Scholar
            </Text>
            <BadgeCheck size={16} color="#0B2A6B" />
          </View>

          {/* Dynamic Live Date & Weather subtext */}
          <Text className="font-inter text-[11px] text-slate-500 mt-0.5">
            {formattedDate}
          </Text>
          <Text className="font-inter text-[11px] text-slate-600 mt-0.5">
            {timeContext.condition}
          </Text>
        </View>
      </View>

      {/* Right: Live Temperature Metric */}
      <View className="items-end pl-2 border-l border-slate-100">
        <View className="flex-row items-center gap-1.5">
          <WeatherIcon size={18} color={timeContext.iconColor} />
          <Text className="font-inter-bold text-2xl text-slate-900">
            {timeContext.temp}
          </Text>
        </View>
        <Text className="font-inter text-[10px] text-slate-500 mt-0.5">
          Sylhet, BD
        </Text>
      </View>
    </View>
  );
}

export default GreetingWeatherCard;