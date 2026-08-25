import { InputField } from "@/components/InputField";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Lock,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
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
 * ResetPasswordScreen
 *
 * Implements the Reset Password screen matching the design.
 * Features:
 * - Uses shared reusable InputField component.
 * - Brand CAMPUS header with subtitle.
 * - New Password & Confirm New Password input fields with visibility toggle.
 * - Live dynamic "Password must contain" checklist:
 *     * At least 8 characters.
 *     * At least one number (0-9).
 *     * At least one uppercase letter (A-Z).
 * - Real-time rule evaluation with visual green checkmarks when conditions are met.
 * - Primary "Reset Password ->" action button.
 * - "<- Back to Login" return link.
 */
export default function ResetPasswordScreen() {
  const router = useRouter();

  // Input states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Status & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Password Rule Validation
   *
   * Dynamically tests password requirements against the entered string.
   */
  const rules = useMemo(() => {
    return {
      hasMinLength: newPassword.length >= 8,
      hasNumber: /\d/.test(newPassword),
      hasUppercase: /[A-Z]/.test(newPassword),
    };
  }, [newPassword]);

  const allRulesPassed =
    rules.hasMinLength && rules.hasNumber && rules.hasUppercase;

  /**
   * handleResetPassword
   *
   * Validates rule compliance and password match before submitting reset request.
   */
  const handleResetPassword = async () => {
    setErrorMessage(null);

    if (!newPassword) {
      setErrorMessage("Please enter a new password.");
      return;
    }

    if (!allRulesPassed) {
      setErrorMessage("Password does not meet all required criteria.");
      return;
    }

    if (!confirmPassword) {
      setErrorMessage("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify both fields.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate backend reset call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Route to login screen upon successful password change
      router.replace("/(auth)/sign-in");
    } catch (err: any) {
      setErrorMessage("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleBackToLogin
   *
   * Navigates back to the sign-in screen.
   */
  const handleBackToLogin = () => {
    router.replace("/(auth)/sign-in");
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
          {/* Header */}
          <View className="mb-4 items-center">
            <Text className="font-inter-bold text-3xl tracking-tight text-[#0B2A6B]">
              CAMPUS
            </Text>
            <Text className="mt-1 font-inter text-sm text-slate-500">
              Reset your password to continue
            </Text>
          </View>

          {/* Main Card */}
          <View className="mx-auto w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            {/* Error Alert Display */}
            {errorMessage && (
              <View className="mb-4 flex-row items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
                <AlertCircle size={16} color="#DC2626" />
                <Text className="flex-1 font-inter text-xs text-red-700">
                  {errorMessage}
                </Text>
              </View>
            )}

            {/* Input Fields using shared InputField */}
            <View className="gap-4">
              {/* New Password */}
              <InputField
                label="New Password"
                icon={Lock}
                isPassword
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={(val) => {
                  setNewPassword(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                autoCapitalize="none"
              />

              {/* Confirm New Password */}
              <InputField
                label="Confirm New Password"
                icon={Lock}
                isPassword
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={(val) => {
                  setConfirmPassword(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                autoCapitalize="none"
                error={
                  confirmPassword && newPassword !== confirmPassword
                    ? "Passwords do not match"
                    : undefined
                }
              />

              {/* Password Requirements Checklist Box */}
              <View className="rounded-2xl border border-slate-100 bg-slate-50/90 p-4">
                <Text className="mb-2 font-inter-bold text-xs text-slate-700">
                  Password must contain:
                </Text>

                <View className="gap-2">
                  {/* Rule 1: Min 8 characters */}
                  <View className="flex-row items-center gap-2">
                    {rules.hasMinLength ? (
                      <CheckCircle2 size={16} color="#16A34A" />
                    ) : (
                      <Circle size={16} color="#94A3B8" />
                    )}
                    <Text
                      className={`font-inter text-xs ${
                        rules.hasMinLength ? "text-slate-900 font-inter-medium" : "text-slate-500"
                      }`}
                    >
                      At least 8 characters
                    </Text>
                  </View>

                  {/* Rule 2: Number */}
                  <View className="flex-row items-center gap-2">
                    {rules.hasNumber ? (
                      <CheckCircle2 size={16} color="#16A34A" />
                    ) : (
                      <Circle size={16} color="#94A3B8" />
                    )}
                    <Text
                      className={`font-inter text-xs ${
                        rules.hasNumber ? "text-slate-900 font-inter-medium" : "text-slate-500"
                      }`}
                    >
                      At least one number (0-9)
                    </Text>
                  </View>

                  {/* Rule 3: Uppercase */}
                  <View className="flex-row items-center gap-2">
                    {rules.hasUppercase ? (
                      <CheckCircle2 size={16} color="#16A34A" />
                    ) : (
                      <Circle size={16} color="#94A3B8" />
                    )}
                    <Text
                      className={`font-inter text-xs ${
                        rules.hasUppercase ? "text-slate-900 font-inter-medium" : "text-slate-500"
                      }`}
                    >
                      At least one uppercase letter
                    </Text>
                  </View>
                </View>
              </View>

              {/* Reset Password Button */}
              <Pressable
                onPress={handleResetPassword}
                disabled={isLoading}
                className="mt-1 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0B2A6B] active:bg-[#071E4D]"
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text className="font-inter-semibold text-base text-white">
                      Reset Password
                    </Text>
                    <ArrowRight size={17} color="#FFFFFF" />
                  </>
                )}
              </Pressable>

              {/* Back to Login Footer Link */}
              <View className="mt-4 items-center">
                <Pressable
                  onPress={handleBackToLogin}
                  className="flex-row items-center gap-1.5 p-2"
                >
                  <ArrowLeft size={15} color="#0B2A6B" />
                  <Text className="font-inter-semibold text-xs text-[#0B2A6B]">
                    Back to Login
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
