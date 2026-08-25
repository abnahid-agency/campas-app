import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, MailCheck } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CODE_LENGTH = 6;
const RESEND_TIMEOUT_SECONDS = 30;

/**
 * VerifyEmailScreen
 *
 * Implements the 6-digit OTP verification screen matching the uploaded design.
 * Features:
 * - Back button with router navigation.
 * - Branded Hero Badge with email confirmation icon.
 * - Title and target university email display.
 * - 6 separate OTP input slots with:
 *     * Auto-focus advance to next slot on digit entry.
 *     * Backspace fallback to previous slot.
 *     * Paste / multi-digit auto distribution.
 *     * Visual active border highlight.
 * - Primary "Verify" action button with loading spinner state.
 * - 30-second countdown timer with interactive "Resend code" trigger on expiry.
 */
export default function VerifyEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string; flow?: string }>();
  const email = params.email || "student@university.edu";
  const flow = params.flow || "signup";

  // OTP Array state storing individual digits ['','','','','','']
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Countdown timer state
  const [timer, setTimer] = useState<number>(RESEND_TIMEOUT_SECONDS);

  // Refs for the 6 text inputs to manage programmatic focus shifts
  const inputRefs = useRef<(TextInput | null)[]>([]);

  /**
   * Countdown Timer Effect
   *
   * Decrements timer every second until reaching 0 to control resend availability.
   */
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /**
   * handleGoBack
   *
   * Returns user to previous step.
   */
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/sign-in");
    }
  };

  /**
   * handleOtpChange
   *
   * Handles single-character digit entries and full clipboard pasted strings.
   * Advances focus to the subsequent input slot automatically.
   *
   * @param text - The typed or pasted string value
   * @param index - The slot index (0 to 5)
   */
  const handleOtpChange = (text: string, index: number) => {
    setErrorMessage(null);

    // If a multi-digit string was pasted
    if (text.length > 1) {
      const cleanDigits = text.replace(/\D/g, "").slice(0, CODE_LENGTH).split("");
      const newCode = [...code];
      cleanDigits.forEach((digit, i) => {
        if (i < CODE_LENGTH) {
          newCode[i] = digit;
        }
      });
      setCode(newCode);

      // Focus last filled index or final input
      const nextIndex = Math.min(cleanDigits.length, CODE_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      setActiveSlot(nextIndex);
      return;
    }

    // Single digit input
    const cleanDigit = text.replace(/\D/g, "");
    const newCode = [...code];
    newCode[index] = cleanDigit;
    setCode(newCode);

    if (cleanDigit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveSlot(index + 1);
    }
  };

  /**
   * handleKeyPress
   *
   * Detects Backspace keypress when current box is already empty and
   * moves cursor focus backwards to the previous input box.
   *
   * @param e - KeyPress event data
   * @param index - The current slot index
   */
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveSlot(index - 1);
    }
  };

  /**
   * handleVerify
   *
   * Validates that all 6 digits are provided and submits verification to the backend.
   * Routes to reset-password if in password reset flow, or welcome-success on signup.
   */
  const handleVerify = async () => {
    setErrorMessage(null);
    const enteredCode = code.join("");

    if (enteredCode.length < CODE_LENGTH) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API verification call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (flow === "reset") {
        router.replace("/(auth)/reset-password" as any);
      } else {
        router.replace("/(auth)/welcome-success" as any);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleResendCode
   *
   * Resends OTP code to the university email and resets the 30s countdown timer.
   */
  const handleResendCode = async () => {
    if (timer > 0) return;

    setErrorMessage(null);
    setTimer(RESEND_TIMEOUT_SECONDS);
    setCode(Array(CODE_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    setActiveSlot(0);

    try {
      console.log(`Resending verification code to ${email}`);
    } catch (err: any) {
      setErrorMessage("Failed to resend code. Please try again.");
    }
  };

  // Format countdown string mm:ss (e.g. 00:29)
  const formatTimer = (seconds: number) => {
    const s = seconds % 60;
    return `00:${s < 10 ? `0${s}` : s}`;
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
          <View className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            {/* Top Back Button */}
            <View className="mb-4 flex-row items-center">
              <Pressable
                onPress={handleGoBack}
                hitSlop={10}
                className="h-9 w-9 items-center justify-center rounded-full active:bg-slate-100"
              >
                <ArrowLeft size={20} color="#1E293B" />
              </Pressable>
            </View>

            {/* Centered Email Verification Badge Icon */}
            <View className="items-center pb-2">
              <View className="h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                <MailCheck size={30} color="#0B2A6B" />
              </View>
            </View>

            {/* Title & Email Display */}
            <View className="items-center pb-6 pt-2">
              <Text className="font-inter-bold text-2xl tracking-tight text-slate-900">
                Verify your email
              </Text>
              <Text className="mt-2 text-center font-inter text-sm text-slate-500">
                We've sent a 6-digit code to
              </Text>
              <Text className="mt-0.5 text-center font-inter-bold text-sm text-slate-900">
                {email}
              </Text>
            </View>

            {/* Error Message Display */}
            {errorMessage && (
              <View className="mb-4 rounded-xl border border-red-200 bg-red-50 p-2.5">
                <Text className="text-center font-inter text-xs text-red-600">
                  {errorMessage}
                </Text>
              </View>
            )}

            {/* 6 OTP Input Boxes */}
            <View className="flex-row items-center justify-between gap-1.5 px-1">
              {code.map((digit, index) => {
                const isFocused = activeSlot === index;
                return (
                  <TextInput
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className={`h-13 w-11 rounded-xl border text-center font-inter-bold text-lg text-slate-900 ${
                      isFocused
                        ? "border-2 border-primary bg-white"
                        : "border-slate-200 bg-slate-50"
                    }`}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setActiveSlot(index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                );
              })}
            </View>

            {/* Verify CTA Button */}
            <Pressable
              onPress={handleVerify}
              disabled={isLoading}
              className="mt-6 h-12 flex-row items-center justify-center rounded-xl bg-primary active:bg-primary-dark"
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text className="font-inter-semibold text-base text-white">
                  Verify
                </Text>
              )}
            </Pressable>

            {/* Resend Countdown Footer */}
            <View className="mt-6 flex-row items-center justify-center">
              <Text className="font-inter text-xs text-slate-500">
                Didn't receive the code?{" "}
              </Text>
              {timer > 0 ? (
                <Text className="font-inter-semibold text-xs text-slate-700">
                  {formatTimer(timer)}
                </Text>
              ) : (
                <Pressable onPress={handleResendCode} hitSlop={6}>
                  <Text className="font-inter-semibold text-xs text-primary">
                    Resend Code
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
