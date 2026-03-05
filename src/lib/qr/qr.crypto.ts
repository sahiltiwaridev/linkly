import CryptoJS from "crypto-js";
import { getQRSecretKey } from "./secure.key";

let secretKey: string | null = null;

export const initQRCrypto = async () => {
  secretKey = await getQRSecretKey();
  return secretKey;
};

const getActiveSecretKey = (): string => {
  if (!secretKey) {
    throw new Error("QR crypto not initialized. Call initQRCrypto() first.");
  }

  return secretKey;
};

export const encryptQR = (plainText: string): string => {
  return CryptoJS.AES.encrypt(plainText, getActiveSecretKey()).toString();
};

export const decryptQR = (cipherText: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, getActiveSecretKey());
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted || null;
  } catch {
    return null;
  }
};
