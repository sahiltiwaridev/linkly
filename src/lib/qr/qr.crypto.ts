import CryptoJS from "crypto-js";
import { getQRSecretKey } from "./secure.key";

let secretKey: string | null = null;
let keyPromise: Promise<string> | null = null;
const LEGACY_QR_KEYS = [
  "change-this-to-long-random-string",
  "4f7b9a1e2c3d8f0a6b1e9c2d4f8a7b6c",
];

const resolveSecretKey = async (): Promise<string> => {
  if (secretKey) return secretKey;
  if (!keyPromise) {
    keyPromise = getQRSecretKey().then((key) => {
      secretKey = key;
      return key;
    });
  }

  return keyPromise;
};

export const encryptQR = async (plainText: string): Promise<string> => {
  const key = await resolveSecretKey();
  return CryptoJS.AES.encrypt(plainText, key).toString();
};

export const decryptQR = async (cipherText: string): Promise<string | null> => {
  try {
    const key = await resolveSecretKey();
    const keysToTry = [key, ...LEGACY_QR_KEYS.filter((k) => k !== key)];

    for (const candidateKey of keysToTry) {
      const bytes = CryptoJS.AES.decrypt(cipherText, candidateKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (decrypted) return decrypted;
    }

    return null;
  } catch {
    return null;
  }
};
