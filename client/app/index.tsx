import { getHasOnboarded } from "@/lib/onboarding";
import { Image } from "expo-image";
import { Redirect, type Href } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";

// Minimum time the branded splash stays visible.
const SPLASH_MIN_MS = 1200;

// Logo animation settings.
const LOGO_FADE_IN_MS = 450;
const LOGO_DELAY_MS = 100;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function Index() {
  const [target, setTarget] = useState<Href | null>(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    let mounted = true;

    // Logo fade + scale animation
    const animation = Animated.sequence([
      Animated.delay(LOGO_DELAY_MS),

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: LOGO_FADE_IN_MS,
          useNativeDriver: true,
        }),

        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start();

    // Hide native Expo splash and determine where to navigate.
    const initialize = async () => {
      await SplashScreen.hideAsync().catch(() => {});

      const [hasOnboarded] = await Promise.all([
        getHasOnboarded(),
        delay(SPLASH_MIN_MS),
      ]);

      if (!mounted) return;

      setTarget(
        hasOnboarded
          ? "/(auth)/sign-in"
          : "/onboarding"
      );
    };

    initialize();

    return () => {
      mounted = false;
      animation.stop();
    };
  }, []);

  // Don't render the destination until onboarding status is known.
  if (target) {
    return <Redirect href={target} />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Animated.View
        style={{
          width: "72%",
          opacity,
          transform: [{ scale }],
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{
            width: "100%",
            aspectRatio: 1.35,
          }}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}