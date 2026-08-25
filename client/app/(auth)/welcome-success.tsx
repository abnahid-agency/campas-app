import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, Check } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeSuccessScreen() {
  const router = useRouter();

  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );

    glowLoop.start();

    return () => glowLoop.stop();
  }, [opacityAnim, scaleAnim, glowAnim]);

  const handleGoToHome = () => {
    router.replace("/(root)" as any);
  };

  const handleCompleteProfile = () => {
    router.push("/(auth)/onboarding-student" as any);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      edges={["top", "bottom"]}
    >
      <StatusBar style="dark" />

      <View className="flex-1 items-center justify-center px-6">
        <Animated.View
          style={{
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="w-full max-w-md items-center"
        >
          {/* Success Badge */}
          <View className="relative mb-6 h-28 w-28 items-center justify-center">
            {/* Animated outer glow */}
            <Animated.View
              style={{
                opacity: glowAnim,
                transform: [{ scale: 1.15 }],
              }}
              className="absolute h-28 w-28 rounded-full bg-blue-200"
            />

            {/* Navy ring */}
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#0B2A6B]">
              {/* White center */}
              <View className="h-12 w-12 items-center justify-center rounded-full bg-white">
                <Check
                  size={29}
                  color="#0B2A6B"
                  strokeWidth={3.2}
                />
              </View>
            </View>
          </View>

          {/* Heading */}
          <Text className="text-center font-inter-bold text-3xl leading-10 tracking-tight text-[#0B2A6B]">
            Welcome to CAMPUS!
          </Text>

          {/* Description */}
          <Text className="mt-4 px-2 text-center font-inter text-base leading-6 text-slate-600">
            Your account has been successfully created. You're all set to
            explore the vibrant digital academic experience, connect with
            peers, and access your resources.
          </Text>

          {/* Buttons */}
          <View className="mt-8 w-full gap-3">
            {/* Go to Home */}
            <Pressable
              onPress={handleGoToHome}
              className="h-12 w-full flex-row items-center justify-center rounded-[10px] bg-[#0B2A6B] active:bg-[#071E4D]"
            >
              <Text className="font-inter-semibold text-base text-white">
                Go to Home
              </Text>

              <ArrowRight
                size={21}
                color="#FFFFFF"
                strokeWidth={2.5}
                style={{ marginLeft: 8 }}
              />
            </Pressable>

            {/* Complete Profile */}
            <Pressable
              onPress={handleCompleteProfile}
              className="h-12 w-full items-center justify-center rounded-[10px] bg-blue-100 active:bg-blue-200"
            >
              <Text className="font-inter-semibold text-base text-[#0B2A6B]">
                Complete Your Profile
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}