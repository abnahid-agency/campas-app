import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import {
  BookOpen,
  FileText,
  Home,
  User,
  Users,
} from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

const useNativeTabs = Platform.OS === "ios";

/**
 * RootTabLayout
 *
 * Implements native platform-adaptive tab navigation for the Campus app:
 * - On iOS: Renders native liquid glass tabs using expo-router/unstable-native-tabs with Apple SF Symbols.
 * - On Android / Web: Renders high-performance, polished JavaScript-based tabs with vector icons.
 * - Routes:
 *     1. Home (index)
 *     2. Community (community)
 *     3. Notices (notices)
 *     4. Q. Bank (qbank)
 *     5. Profile (profile)
 */
export default function RootTabLayout() {
  if (useNativeTabs) {
    return (
      <NativeTabs
        backgroundColor="#FFFFFF"
        tintColor="#0B2A6B"
        iconColor={{ default: "#64748B", selected: "#0B2A6B" }}
        labelStyle={{
          default: { color: "#64748B" },
          selected: { color: "#0B2A6B" },
        }}
      >
        {/* 1. Home */}
        <NativeTabs.Trigger name="index">
          <Icon sf="house.fill" />
          <Label>Home</Label>
        </NativeTabs.Trigger>

        {/* 2. Community */}
        <NativeTabs.Trigger name="community">
          <Icon sf="person.3.fill" />
          <Label>Community</Label>
        </NativeTabs.Trigger>

        {/* 3. Notices */}
        <NativeTabs.Trigger name="notices">
          <Icon sf="bell.badge.fill" />
          <Label>Notices</Label>
        </NativeTabs.Trigger>

        {/* 4. Question Bank */}
        <NativeTabs.Trigger name="qbank">
          <Icon sf="book.closed.fill" />
          <Label>Q. Bank</Label>
        </NativeTabs.Trigger>

        {/* 5. Profile */}
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.crop.circle.fill" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // Android / Fallback — Elevated material tabs matching design system
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0B2A6B",
        tabBarInactiveTintColor: "#64748B",
        tabBarLabelStyle: {
          fontFamily: "Inter-SemiBold",
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          borderTopWidth: 1,
          height: 65,
          paddingTop: 6,
          paddingBottom: 8,
          elevation: 8,
        },
      }}
    >
      {/* 1. Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home size={21} color={color} strokeWidth={2.2} />
          ),
        }}
      />

      {/* 2. Community */}
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <Users size={21} color={color} strokeWidth={2.2} />
          ),
        }}
      />

      {/* 3. Notices */}
      <Tabs.Screen
        name="notices"
        options={{
          title: "Notices",
          tabBarIcon: ({ color, size }) => (
            <FileText size={21} color={color} strokeWidth={2.2} />
          ),
        }}
      />

      {/* 4. Question Bank */}
      <Tabs.Screen
        name="qbank"
        options={{
          title: "Q. Bank",
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={21} color={color} strokeWidth={2.2} />
          ),
        }}
      />

      {/* 5. Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User size={21} color={color} strokeWidth={2.2} />
          ),
        }}
      />
    </Tabs>
  );
}
