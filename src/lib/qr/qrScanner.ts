import { useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";

export const useQRScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanLocked, setIsScanLocked] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  const handleQRCodeScanned = (data: string) => {
    if (isScanLocked) return;
    setIsScanLocked(true);
    return data;
  };
  return {
    permission,
    isScanLocked,
    handleQRCodeScanned,
    resetScan: () => setIsScanLocked(false),
  };
};
