import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "hasOnboarded";

/** Whether the user has already completed (or skipped) onboarding. */
export async function getHasOnboarded(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(ONBOARDING_KEY)) === "true";
  } catch {
    // If storage is unavailable, treat the user as not onboarded.
    return false;
  }
}

/** Persist that onboarding is done so it never shows again. */
export async function setHasOnboarded(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
  } catch {
    // Non-fatal: worst case onboarding shows again next launch.
  }
}
