import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../global.css";

// Configure Reanimated logger to disable strict mode warnings per Swmansion docs
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Keep the native splash visible until the gate (app/index.tsx) has decided
// where to send the user. Called in global scope, without awaiting, per docs.
SplashScreen.preventAutoHideAsync();

// The fade-out animation (setOptions) isn't supported in Expo Go — only in
// development/release builds — so guard it to avoid a warning there.
if (Constants.executionEnvironment !== ExecutionEnvironment.StoreClient) {
  SplashScreen.setOptions({ duration: 400, fade: true });
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Keep the native splash up (it's already prevented from auto-hiding) until
  // Inter is ready, so text never flashes in the system font first. We only
  // gate rendering here — app/index.tsx still owns SplashScreen.hideAsync().
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
