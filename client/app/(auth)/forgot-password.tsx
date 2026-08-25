import { InputField } from "@/components/InputField";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AlertCircle, ArrowLeft, ArrowRight, Mail } from "lucide-react-native";
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
 * ForgotPasswordScreen
 *
 * Implements the Forgot Password recovery flow matching the uploaded design.
 * Features:
 * - Uses shared reusable InputField component.
 * - Back button with router navigation.
 * - Branded CAMPUS header title.
 * - Instructional copy explaining the OTP recovery step.
 * - University email input with mail icon.
 * - "Send Code ->" button with loading state.
 * - Transitions to the email verification screen (/verify-email) passing the input email and flow="reset".
 * - "Contact Support" assistance link at the bottom.
 */
export default function ForgotPasswordScreen() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * handleGoBack
   *
   * Navigates back to the login screen.
   */
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/sign-in");
    }
  };

  /**
   * handleSendCode
   *
   * Validates the entered university email and triggers password reset OTP dispatch.
   * On success, routes the user to the verification code screen.
   */
  const handleSendCode = async () => {
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your university email.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API request latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Navigate to the verification screen, passing the email and reset flow
      router.push({
        pathname: "/(auth)/verify-email",
        params: { email: trimmedEmail, flow: "reset" },
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleContactSupport
   *
   * Opens support modal or help channel for users facing account recovery issues.
   */
  const handleContactSupport = () => {
    console.log("Contact Support tapped");
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
            {/* Header with Back Arrow and CAMPUS Title */}
            <View className="relative flex-row items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <Pressable
                onPress={handleGoBack}
                hitSlop={10}
                className="h-9 w-9 items-center justify-center rounded-full active:bg-slate-100"
              >
                <ArrowLeft size={19} color="#1E293B" />
              </Pressable>

              <Text className="font-inter-bold text-xl tracking-tight text-[#0B2A6B]">
                CAMPUS
              </Text>

              {/* Spacer */}
              <View className="h-9 w-9" />
            </View>

            {/* Card Content */}
            <View className="px-6 pb-6 pt-5">
              {/* Heading & Subtitle */}
              <View className="pb-5 pt-1">
                <Text className="font-inter-bold text-2xl tracking-tight text-slate-900">
                  Forgot Password
                </Text>
                <Text className="mt-2 font-inter text-sm leading-5 text-slate-500">
                  Enter your university email address. We'll send you a verification
                  code to reset your password.
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

              {/* Form Input Using Shared InputField */}
              <View className="gap-4">
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

                {/* Send Code Submit Button */}
                <Pressable
                  onPress={handleSendCode}
                  disabled={isLoading}
                  className="mt-1 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0B2A6B] active:bg-[#071E4D]"
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <>
                      <Text className="font-inter-semibold text-base text-white">
                        Send Code
                      </Text>
                      <ArrowRight size={17} color="#FFFFFF" />
                    </>
                  )}
                </Pressable>
              </View>

              {/* Contact Support Link */}
              <View className="mt-8 items-center">
                <Pressable onPress={handleContactSupport} hitSlop={8}>
                  <Text className="font-inter-medium text-xs text-slate-600 active:text-[#0B2A6B]">
                    Contact Support
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
