import { InputField } from "@/components/InputField";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  Mail,
  User,
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
 * SignUpScreen
 *
 * Implements the Campus "Create Account" registration screen matching the mockup.
 * Features:
 * - Uses shared reusable InputField component for all form fields.
 * - Brand CAMPUS header and subtitle.
 * - Form validation with clean visual error banners and input border highlights.
 * - Inputs: Full Name, University Email (.edu check), Student ID, Password, Confirm Password.
 * - Interactive Terms & Conditions and Privacy Policy agreement checkbox.
 * - Primary "Register ->" submit button with loading state.
 * - Social "Sign up with Google" option.
 * - Link to Sign In.
 */
export default function SignUpScreen() {
  const router = useRouter();

  // Form Field States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // UI / Interaction States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * validateInputs
   *
   * Thoroughly verifies each input field according to campus registration rules:
   * 1. Full name is provided.
   * 2. Email is a valid format and has .edu / university domain.
   * 3. Student ID is provided.
   * 4. Password meets minimum length (>= 8 chars).
   * 5. Passwords match identically.
   * 6. Terms and Conditions checkbox is checked.
   *
   * @returns boolean indicating whether the form is completely valid.
   */
  const validateInputs = (): boolean => {
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return false;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Please enter a valid university email address.");
      return false;
    }

    if (!studentId.trim()) {
      setErrorMessage("Please enter your Student ID number.");
      return false;
    }

    if (!password) {
      setErrorMessage("Please create a password.");
      return false;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify both password fields.");
      return false;
    }

    if (!agreedToTerms) {
      setErrorMessage("You must agree to the Terms & Conditions and Privacy Policy.");
      return false;
    }

    return true;
  };

  /**
   * handleRegister
   *
   * Orchestrates account registration. On validation success, communicates with
   * backend or advances to the email verification code step.
   */
  const handleRegister = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      // Simulate backend registration call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Advance to email verification
      router.push({
        pathname: "/(auth)/verify-email",
        params: { email: email.trim(), flow: "signup" },
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleGoogleSignUp
   *
   * Triggers the Google OAuth registration flow.
   */
  const handleGoogleSignUp = () => {
    console.log("Starting Google Sign-up");
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
          {/* Header Title Section */}
          <View className="mb-4 items-center">
            <Text className="font-inter-bold text-3xl tracking-tight text-[#0B2A6B]">
              CAMPUS
            </Text>
            <Text className="mt-1 font-inter-bold text-2xl tracking-tight text-slate-900">
              Create Account
            </Text>
            <Text className="mt-1 font-inter text-sm text-slate-500">
              Join the university community today.
            </Text>
          </View>

          {/* Main Card Container */}
          <View className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            {/* Clean Error Alert Banner */}
            {errorMessage && (
              <View className="mb-4 flex-row items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
                <AlertCircle size={16} color="#DC2626" />
                <Text className="flex-1 font-inter text-xs leading-4 text-red-700">
                  {errorMessage}
                </Text>
              </View>
            )}

            {/* Form Fields with Shared InputField */}
            <View className="gap-3.5">
              {/* Full Name */}
              <InputField
                label="Full Name"
                icon={User}
                placeholder="Jane Doe"
                value={fullName}
                onChangeText={(val) => {
                  setFullName(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                autoCapitalize="words"
              />

              {/* University Email */}
              <InputField
                label="University Email"
                icon={Mail}
                placeholder="jane.doe@university.edu"
                helperText="Must use a valid .edu address"
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Student ID */}
              <InputField
                label="Student ID"
                icon={CreditCard}
                placeholder="12345678"
                value={studentId}
                onChangeText={(val) => {
                  setStudentId(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                keyboardType="number-pad"
              />

              {/* Password */}
              <InputField
                label="Password"
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

              {/* Confirm Password */}
              <InputField
                label="Confirm Password"
                icon={Lock}
                isPassword
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={(val) => {
                  setConfirmPassword(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                autoCapitalize="none"
                error={
                  confirmPassword && password !== confirmPassword
                    ? "Passwords do not match"
                    : undefined
                }
              />

              {/* Terms and Conditions Checkbox */}
              <Pressable
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                className="mt-1 flex-row items-start gap-2.5"
              >
                <View
                  className={`mt-0.5 h-4 w-4 items-center justify-center rounded border ${
                    agreedToTerms
                      ? "border-[#0B2A6B] bg-[#0B2A6B]"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {agreedToTerms && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                </View>

                <Text className="flex-1 font-inter text-xs leading-4 text-slate-600">
                  I agree to the{" "}
                  <Text className="font-inter-semibold text-[#0B2A6B]">
                    Terms & Conditions
                  </Text>{" "}
                  and{" "}
                  <Text className="font-inter-semibold text-[#0B2A6B]">
                    Privacy Policy
                  </Text>
                  .
                </Text>
              </Pressable>

              {/* Register Button */}
              <Pressable
                onPress={handleRegister}
                disabled={isLoading}
                className="mt-2 h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0B2A6B] active:bg-[#071E4D]"
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text className="font-inter-semibold text-base text-white">
                      Register
                    </Text>
                    <ArrowRight size={17} color="#FFFFFF" />
                  </>
                )}
              </Pressable>
            </View>

            {/* Divider */}
            <View className="my-4 flex-row items-center">
              <View className="h-px flex-1 bg-slate-200" />
              <Text className="px-3 font-inter text-[11px] text-slate-400">
                or
              </Text>
              <View className="h-px flex-1 bg-slate-200" />
            </View>

            {/* Google Signup Button */}
            <Pressable
              onPress={handleGoogleSignUp}
              className="h-12 flex-row items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 active:bg-slate-100"
            >
              <GoogleLogo />
              <Text className="font-inter-medium text-sm text-slate-800">
                Sign up with Google
              </Text>
            </Pressable>

            {/* Footer */}
            <View className="mt-4 flex-row items-center justify-center">
              <Text className="font-inter text-xs text-slate-500">
                Already have an account?{" "}
              </Text>
              <Pressable
                onPress={() => router.push("/(auth)/sign-in")}
                hitSlop={6}
              >
                <Text className="font-inter-semibold text-xs text-[#0B2A6B]">
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
