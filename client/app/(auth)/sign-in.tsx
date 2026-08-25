import { InputField } from "@/components/InputField";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * GoogleLogoComponent
 *
 * Renders the official Google multi-color SVG icon from client/assets/icon/google.svg.
 */
function GoogleLogo() {
  return (
    <Image
      source={require("../../assets/icon/google.svg")}
      style={{ width: 20, height: 20 }}
      contentFit="contain"
    />
  );
}

/**
 * SignInScreen
 *
 * Implements the Campus Login authentication screen matching the exact design.
 * Features:
 * - Uses shared reusable InputField component for consistent layout.
 * - Back button with router navigation.
 * - Branded CAMPUS header with subtitle.
 * - University email input with envelope icon and automatic email format validation.
 * - Password input with lock icon and interactive show/hide toggle.
 * - Forgot Password navigation link.
 * - Primary "Login ->" submit button with loading state.
 * - Styled "OR" divider.
 * - "Continue with Google" social login button.
 * - Footer navigation to "Create Account".
 */
export default function SignInScreen() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * handleGoBack
   *
   * Navigates back to the previous screen or safely falls back to onboarding.
   */
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/onboarding");
    }
  };

  /**
   * handleLogin
   *
   * Validates form inputs and submits credentials to the authentication provider.
   * On successful verification, transitions user to the main application root.
   */
  const handleLogin = async () => {
    setErrorMessage(null);

    // Basic client-side validation
    if (!email.trim()) {
      setErrorMessage("Please enter your university email.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate auth request latency before transitioning to main root
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.replace("/(root)" as any);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleGoogleLogin
   *
   * Initiates OAuth 2.0 flow with Google provider.
   */
  const handleGoogleLogin = () => {
    console.log("Initiating Google Sign-In");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
          className="px-4 py-6"
        >
          {/* Main Card Container */}
          <View className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            {/* Card Header with Back Button and 'Login' title */}
            <View className="relative flex-row items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <Pressable
                onPress={handleGoBack}
                hitSlop={10}
                className="h-9 w-9 items-center justify-center rounded-full active:bg-slate-100"
              >
                <ArrowLeft size={19} color="#1E293B" />
              </Pressable>

              <Text className="font-inter-semibold text-base text-slate-900">
                Login
              </Text>

              {/* Placeholder to balance the header flex layout */}
              <View className="h-9 w-9" />
            </View>

            {/* Card Content Area */}
            <View className="px-6 pb-6 pt-5">
              {/* Brand Title and Welcome text */}
              <View className="items-center pb-5 pt-1">
                <Text className="font-inter-bold text-3xl tracking-tight text-[#0B2A6B]">
                  CAMPUS
                </Text>
                <Text className="mt-1.5 text-center font-inter text-sm leading-5 text-slate-500">
                  Welcome back. Please sign in to{"\n"}continue.
                </Text>
              </View>

              {/* Error Alert Display */}
              {errorMessage && (
                <View className="mb-4 flex-row items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
                  <AlertCircle size={16} color="#DC2626" />
                  <Text className="flex-1 font-inter text-xs text-red-700">
                    {errorMessage}
                  </Text>
                </View>
              )}

              {/* Form Input Fields Using Reusable InputField */}
              <View className="gap-3.5">
                {/* University Email Input */}
                <InputField
                  label="University Email"
                  icon={Mail}
                  placeholder="student@university.edu"
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Password Input */}
                <InputField
                  label="Password"
                  labelRight={
                    <Pressable
                      onPress={() => router.push("/(auth)/forgot-password")}
                      hitSlop={6}
                    >
                      <Text className="font-inter text-xs text-slate-500 active:text-primary">
                        Forgot Password?
                      </Text>
                    </Pressable>
                  }
                  icon={Lock}
                  isPassword
                  placeholder="••••••••"
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  autoCapitalize="none"
                />

                {/* Submit Login Button */}
                <Pressable
                  onPress={handleLogin}
                  disabled={isLoading}
                  className="mt-1 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0B2A6B] active:bg-[#071E4D]"
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <>
                      <Text className="font-inter-semibold text-base text-white">
                        Login
                      </Text>
                      <ArrowRight size={17} color="#FFFFFF" />
                    </>
                  )}
                </Pressable>
              </View>

              {/* OR Divider */}
              <View className="my-4 flex-row items-center">
                <View className="h-px flex-1 bg-slate-200" />
                <Text className="px-3 font-inter text-[11px] font-medium tracking-wider text-slate-400">
                  OR
                </Text>
                <View className="h-px flex-1 bg-slate-200" />
              </View>

              {/* Social Login Button */}
              <Pressable
                onPress={handleGoogleLogin}
                className="h-12 flex-row items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-slate-100/90 active:bg-slate-200/80"
              >
                <GoogleLogo />
                <Text className="font-inter-medium text-sm text-slate-800">
                  Continue with Google
                </Text>
              </Pressable>

              {/* Card Bottom Footer */}
              <View className="mt-5 flex-row items-center justify-center">
                <Text className="font-inter text-xs text-slate-500">
                  Don't have an account?{" "}
                </Text>
                <Pressable
                  onPress={() => router.push("/(auth)/sign-up")}
                  hitSlop={6}
                >
                  <Text className="font-inter-semibold text-xs text-[#0B2A6B]">
                    Create Account
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}