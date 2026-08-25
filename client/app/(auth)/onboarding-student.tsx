import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Department / Program options matching the university curriculum
const DEPARTMENTS = [
  { id: "bba", name: "Bachelor of Business Administration" },
  { id: "cse", name: "Computer Science & Engineering" },
  { id: "bba-english", name: "Bachelor of Business Administration in English" },
  { id: "llb", name: "Bachelor of Laws" },
];

// Academic Year / Batch options
const BATCHES = [
  "2022-2023",
  "2023-2024",
  "2024-2025",
  "2025-2026",
];

// Academic Term options
const TERMS = [
  { value: "SUMMER", label: "Summer" },
  { value: "FALL", label: "Fall" },
];

/**
 * OnboardingStudentScreen (Step 2 of 3)
 *
 * Implements the Student Academic Information selection screen.
 * Features:
 * - Top Progress Indicator: "Step 2 of 3", "Student Information", and filled progress bar.
 * - Uniform shared input styling: rounded-[10px], border-neutral-300, bg-slate-50, px-3.
 * - Three modal-based select options:
 *     1. Department / Program (DEPARTMENTS)
 *     2. Academic Year / Batch (BATCHES)
 *     3. Academic Term (TERMS)
 * - Tapping any select bar opens a dedicated interactive Modal dialog with backdrop and list.
 * - Validation error banner for missing selections.
 * - "Back" navigation and "Continue ->" completion action.
 */
export default function OnboardingStudentScreen() {
  const router = useRouter();

  // Selection states
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  // Active modal state: "department" | "batch" | "term" | null
  const [activeModal, setActiveModal] = useState<
    "department" | "batch" | "term" | null
  >(null);

  // Status & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * handleSelectDepartment
   *
   * Assigns chosen department and closes the modal.
   */
  const handleSelectDepartment = (deptId: string) => {
    setSelectedDepartment(deptId);
    setActiveModal(null);
    if (errorMessage) setErrorMessage(null);
  };

  /**
   * handleSelectBatch
   *
   * Assigns chosen batch year and closes the modal.
   */
  const handleSelectBatch = (batchYear: string) => {
    setSelectedBatch(batchYear);
    setActiveModal(null);
    if (errorMessage) setErrorMessage(null);
  };

  /**
   * handleSelectTerm
   *
   * Assigns chosen academic term and closes the modal.
   */
  const handleSelectTerm = (termValue: string) => {
    setSelectedTerm(termValue);
    setActiveModal(null);
    if (errorMessage) setErrorMessage(null);
  };

  /**
   * handleContinue
   *
   * Validates that all 3 study fields are selected before completing Step 2.
   */
  const handleContinue = async () => {
    setErrorMessage(null);

    if (!selectedDepartment) {
      setErrorMessage("Please select your Department / Program.");
      return;
    }

    if (!selectedBatch) {
      setErrorMessage("Please select your Academic Year / Batch.");
      return;
    }

    if (!selectedTerm) {
      setErrorMessage("Please select your Academic Term.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate profile sync
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Transition to welcome congratulations celebration screen
      router.replace("/(auth)/welcome-success" as any);
    } catch (err: any) {
      setErrorMessage("Failed to save student profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleGoBack
   *
   * Navigates back to the previous screen.
   */
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/sign-in");
    }
  };

  // Helper to resolve display name for selected department
  const selectedDepartmentName = DEPARTMENTS.find(
    (d) => d.id === selectedDepartment
  )?.name;

  // Helper to resolve display name for selected term
  const selectedTermLabel = TERMS.find(
    (t) => t.value === selectedTerm
  )?.label;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" />

      {/* Top Header Progress Bar */}
      <View className="px-6 pt-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="font-inter-bold text-xs text-[#0B2A6B]">
            Step 2 of 3
          </Text>
          <Text className="font-inter-medium text-xs text-slate-500">
            Student Information
          </Text>
        </View>

        {/* Track and Progress fill */}
        <View className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <View className="h-full w-2/3 rounded-full bg-[#0B2A6B]" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        className="px-4 py-6"
      >
        {/* Main Card Container */}
        <View className="mx-auto w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          {/* Card Title & Subtitle */}
          <Text className="font-inter-bold text-2xl tracking-tight text-slate-900">
            Tell us about your studies
          </Text>
          <Text className="mt-1.5 font-inter text-sm leading-5 text-slate-500">
            This helps us customize your campus experience.
          </Text>

          {/* Error Alert Display */}
          {errorMessage && (
            <View className="mt-4 flex-row items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
              <AlertCircle size={16} color="#DC2626" />
              <Text className="flex-1 font-inter text-xs leading-4 text-red-700">
                {errorMessage}
              </Text>
            </View>
          )}

          {/* Form Options (3 modal select bars) */}
          <View className="mt-6 gap-4">
            {/* 1. Department / Program Modal Selector */}
            <View>
              <Text className="mb-1 font-inter-bold text-xs text-slate-800">
                Department / Program
              </Text>

              <Pressable
                onPress={() => setActiveModal("department")}
                className={`h-12 flex-row items-center justify-between rounded-[10px] border px-3 active:bg-slate-100/70 ${
                  selectedDepartment
                    ? "border-[#0B2A6B] bg-white"
                    : "border-neutral-300 bg-slate-50"
                }`}
              >
                <Text
                  className={`font-inter text-sm ${
                    selectedDepartment
                      ? "font-inter-medium text-slate-900"
                      : "text-slate-400"
                  }`}
                  numberOfLines={1}
                >
                  {selectedDepartmentName || "Select your department"}
                </Text>
                <ChevronDown size={18} color="#64748B" />
              </Pressable>
            </View>

            {/* 2. Academic Year / Batch Modal Selector */}
            <View>
              <Text className="mb-1 font-inter-bold text-xs text-slate-800">
                Academic Year / Batch
              </Text>

              <Pressable
                onPress={() => setActiveModal("batch")}
                className={`h-12 flex-row items-center justify-between rounded-[10px] border px-3 active:bg-slate-100/70 ${
                  selectedBatch
                    ? "border-[#0B2A6B] bg-white"
                    : "border-neutral-300 bg-slate-50"
                }`}
              >
                <Text
                  className={`font-inter text-sm ${
                    selectedBatch
                      ? "font-inter-medium text-slate-900"
                      : "text-slate-400"
                  }`}
                  numberOfLines={1}
                >
                  {selectedBatch || "Select your academic year"}
                </Text>
                <ChevronDown size={18} color="#64748B" />
              </Pressable>
            </View>

            {/* 3. Academic Term Modal Selector */}
            <View>
              <Text className="mb-1 font-inter-bold text-xs text-slate-800">
                Academic Term
              </Text>

              <Pressable
                onPress={() => setActiveModal("term")}
                className={`h-12 flex-row items-center justify-between rounded-[10px] border px-3 active:bg-slate-100/70 ${
                  selectedTerm
                    ? "border-[#0B2A6B] bg-white"
                    : "border-neutral-300 bg-slate-50"
                }`}
              >
                <Text
                  className={`font-inter text-sm ${
                    selectedTerm
                      ? "font-inter-medium text-slate-900"
                      : "text-slate-400"
                  }`}
                  numberOfLines={1}
                >
                  {selectedTermLabel || "Select your academic term"}
                </Text>
                <ChevronDown size={18} color="#64748B" />
              </Pressable>
            </View>

            {/* Action Buttons: Back & Continue */}
            <View className="mt-4 flex-row items-center gap-3">
              {/* Back Button */}
              <Pressable
                onPress={handleGoBack}
                className="h-12 w-24 items-center justify-center rounded-2xl bg-slate-100 active:bg-slate-200"
              >
                <Text className="font-inter-semibold text-sm text-slate-700">
                  Back
                </Text>
              </Pressable>

              {/* Continue Button */}
              <Pressable
                onPress={handleContinue}
                disabled={isLoading}
                className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-[#0B2A6B] shadow-sm active:bg-[#071E4D]"
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text className="font-inter-semibold text-sm text-white">
                      Continue
                    </Text>
                    <ArrowRight size={16} color="#FFFFFF" />
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 1. Department Modal Dialog */}
      <Modal
        visible={activeModal === "department"}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <Pressable
          onPress={() => setActiveModal(null)}
          className="flex-1 items-center justify-center bg-black/40 px-4"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="max-h-[75%] w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl"
          >
            {/* Modal Header */}
            <View className="mb-3 flex-row items-center justify-between border-b border-slate-100 pb-3">
              <Text className="font-inter-bold text-base text-slate-900">
                Select Department / Program
              </Text>
              <Pressable
                onPress={() => setActiveModal(null)}
                hitSlop={8}
                className="h-8 w-8 items-center justify-center rounded-full active:bg-slate-100"
              >
                <X size={18} color="#64748B" />
              </Pressable>
            </View>

            {/* Options List */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {DEPARTMENTS.map((dept) => {
                const isSelected = selectedDepartment === dept.id;
                return (
                  <Pressable
                    key={dept.id}
                    onPress={() => handleSelectDepartment(dept.id)}
                    className={`mb-2 flex-row items-center justify-between rounded-xl border p-3.5 ${
                      isSelected
                        ? "border-[#0B2A6B] bg-blue-50/60"
                        : "border-slate-100 bg-slate-50/70 active:bg-slate-100"
                    }`}
                  >
                    <Text
                      className={`flex-1 font-inter text-xs ${
                        isSelected
                          ? "font-inter-semibold text-[#0B2A6B]"
                          : "text-slate-800"
                      }`}
                    >
                      {dept.name}
                    </Text>
                    {isSelected && (
                      <Check size={16} color="#0B2A6B" strokeWidth={2.5} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* 2. Academic Year / Batch Modal Dialog */}
      <Modal
        visible={activeModal === "batch"}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <Pressable
          onPress={() => setActiveModal(null)}
          className="flex-1 items-center justify-center bg-black/40 px-4"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="max-h-[75%] w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl"
          >
            {/* Modal Header */}
            <View className="mb-3 flex-row items-center justify-between border-b border-slate-100 pb-3">
              <Text className="font-inter-bold text-base text-slate-900">
                Select Academic Year / Batch
              </Text>
              <Pressable
                onPress={() => setActiveModal(null)}
                hitSlop={8}
                className="h-8 w-8 items-center justify-center rounded-full active:bg-slate-100"
              >
                <X size={18} color="#64748B" />
              </Pressable>
            </View>

            {/* Options List */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {BATCHES.map((batch) => {
                const isSelected = selectedBatch === batch;
                return (
                  <Pressable
                    key={batch}
                    onPress={() => handleSelectBatch(batch)}
                    className={`mb-2 flex-row items-center justify-between rounded-xl border p-3.5 ${
                      isSelected
                        ? "border-[#0B2A6B] bg-blue-50/60"
                        : "border-slate-100 bg-slate-50/70 active:bg-slate-100"
                    }`}
                  >
                    <Text
                      className={`font-inter text-xs ${
                        isSelected
                          ? "font-inter-semibold text-[#0B2A6B]"
                          : "text-slate-800"
                      }`}
                    >
                      {batch}
                    </Text>
                    {isSelected && (
                      <Check size={16} color="#0B2A6B" strokeWidth={2.5} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* 3. Academic Term Modal Dialog */}
      <Modal
        visible={activeModal === "term"}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}
      >
        <Pressable
          onPress={() => setActiveModal(null)}
          className="flex-1 items-center justify-center bg-black/40 px-4"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="max-h-[75%] w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl"
          >
            {/* Modal Header */}
            <View className="mb-3 flex-row items-center justify-between border-b border-slate-100 pb-3">
              <Text className="font-inter-bold text-base text-slate-900">
                Select Academic Term
              </Text>
              <Pressable
                onPress={() => setActiveModal(null)}
                hitSlop={8}
                className="h-8 w-8 items-center justify-center rounded-full active:bg-slate-100"
              >
                <X size={18} color="#64748B" />
              </Pressable>
            </View>

            {/* Options List */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {TERMS.map((term) => {
                const isSelected = selectedTerm === term.value;
                return (
                  <Pressable
                    key={term.value}
                    onPress={() => handleSelectTerm(term.value)}
                    className={`mb-2 flex-row items-center justify-between rounded-xl border p-3.5 ${
                      isSelected
                        ? "border-[#0B2A6B] bg-blue-50/60"
                        : "border-slate-100 bg-slate-50/70 active:bg-slate-100"
                    }`}
                  >
                    <Text
                      className={`font-inter text-xs ${
                        isSelected
                          ? "font-inter-semibold text-[#0B2A6B]"
                          : "text-slate-800"
                      }`}
                    >
                      {term.label}
                    </Text>
                    {isSelected && (
                      <Check size={16} color="#0B2A6B" strokeWidth={2.5} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}