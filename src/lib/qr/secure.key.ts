import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const QR_SECRET_KEY_NAME = "qr_secret_key";
const FALLBACK_QR_SECRET = "4f7b9a1e2c3d8f0a6b1e9c2d4f8a7b6c";

export const getQRSecretKey = async (): Promise<string> => {
  const configKey =
    Constants.expoConfig?.extra?.qrSecretKey ?? FALLBACK_QR_SECRET;
  const savedKey = await SecureStore.getItemAsync(QR_SECRET_KEY_NAME);

  if (savedKey && savedKey === configKey) {
    return savedKey;
  }

  await SecureStore.setItemAsync(QR_SECRET_KEY_NAME, configKey);
  return configKey;
};
