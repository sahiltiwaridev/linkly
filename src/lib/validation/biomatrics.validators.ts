import * as LocalAuthentication from "expo-local-authentication";

export async function authenticate(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!hasHardware || !enrolled) return true;

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock Linkly",
    fallbackLabel: "Use PIN",
  });
  return result.success;
}