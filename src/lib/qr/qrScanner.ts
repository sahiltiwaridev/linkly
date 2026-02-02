import { useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";

export const useQRScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  const handleScan = (data: string) => {
    if (hasScanned) return;
    setHasScanned(true);
    return data;
  };
  return {
    permission,
    hasScanned,
    handleScan,
    resetScan: () => setHasScanned(false),
  };
};
