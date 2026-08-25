import { Eye, EyeOff } from "lucide-react-native";
import React, { forwardRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from "react-native";

export interface InputFieldProps extends TextInputProps {
  /** Label text displayed above the input */
  label?: string;
  /** Right-aligned component next to the label (e.g. 'Forgot Password?' link) */
  labelRight?: React.ReactNode;
  /** Optional icon component rendered on the left side of the input (e.g. Mail, Lock, User) */
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  /** When true, automatically provides password obscuring and an Eye/EyeOff toggle button */
  isPassword?: boolean;
  /** Error message string displayed below the input with red highlight */
  error?: string;
  /** Supplementary helper text rendered below the input */
  helperText?: string;
  /** Additional styling classes for the outer wrapper container */
  containerClassName?: string;
}

/**
 * InputField
 *
 * Reusable shared input component used across all Campus authentication & form screens.
 * Features:
 * - Exact uniform UI style: rounded-[10px], border-neutral-300, bg-slate-50, px-3.
 * - Dynamic focus highlighting (border-primary on focus).
 * - Left leading icon support (Mail, Lock, User, etc.).
 * - Built-in secure text entry toggle for password inputs.
 * - Error boundary indicator with red border and helper message.
 * - Forwards ref to underlying TextInput for programmatic focus.
 */
export const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      labelRight,
      icon: Icon,
      isPassword = false,
      error,
      helperText,
      containerClassName = "",
      className = "",
      placeholderTextColor = "#94A3B8",
      onFocus,
      onBlur,
      ...textInputProps
    },
    ref
  ) => {
    // Internal state for password visibility toggle
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // Internal state for focus styling
    const [isFocused, setIsFocused] = useState(false);

    /**
     * handleFocus
     *
     * Sets focused state for visual highlight and triggers consumer onFocus handler.
     */
    const handleFocus: TextInputProps["onFocus"] = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    /**
     * handleBlur
     *
     * Clears focused state and triggers consumer onBlur handler.
     */
    const handleBlur: TextInputProps["onBlur"] = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const hasError = Boolean(error);

    return (
      <View className={`w-full ${containerClassName}`}>
        {/* Top Label Area */}
        {(label || labelRight) && (
          <View className="mb-1 flex-row items-center justify-between">
            {label ? (
              <Text className="font-inter-bold text-xs text-slate-800">
                {label}
              </Text>
            ) : null}

            {labelRight ? labelRight : null}
          </View>
        )}

        {/* Input Box Wrapper */}
        <View
          className={`h-12 flex-row items-center rounded-[10px] border px-3 transition-colors ${
            hasError
              ? "border-red-400 bg-red-50/20"
              : isFocused
              ? "border-[#0B2A6B] bg-white"
              : "border-neutral-300 bg-slate-50"
          }`}
        >
          {/* Leading Icon */}
          {Icon && (
            <View className="items-center justify-center">
              <Icon
                size={17}
                color={hasError ? "#EF4444" : isFocused ? "#0B2A6B" : "#64748B"}
              />
            </View>
          )}

          {/* Core TextInput */}
          <TextInput
            ref={ref}
            className={`flex-1 py-0 font-inter text-sm text-slate-900 ${
              Icon ? "ml-2.5" : ""
            } ${className}`}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={isPassword && !isPasswordVisible}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...textInputProps}
          />

          {/* Password Show/Hide Toggle */}
          {isPassword && (
            <Pressable
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              hitSlop={8}
              className="p-1"
            >
              {isPasswordVisible ? (
                <EyeOff size={18} color="#64748B" />
              ) : (
                <Eye size={18} color="#64748B" />
              )}
            </Pressable>
          )}
        </View>

        {/* Error Message or Helper Text Display */}
        {hasError ? (
          <Text className="mt-1 font-inter text-xs text-red-600">{error}</Text>
        ) : helperText ? (
          <Text className="mt-1 font-inter text-[11px] text-slate-500">
            {helperText}
          </Text>
        ) : null}
      </View>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
