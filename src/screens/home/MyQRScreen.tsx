import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";
import {
  decodeUserQRPayload,
  generateUserQRPayload,
} from "../../lib/qr/qr.parser";
import ErrorIcon from "../../assets/icons/error.svg";
import NutralIcon from "../../assets/icons/user.svg";
import EditIcon from "../../assets/icons/edit.svg";
import LockIcon from "../../assets/icons/secure.svg";
import MaleIcon from "../../assets/avatar/male-avatar.svg";
import FemaleIcon from "../../assets/avatar/female-avatar.svg";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { UserData } from "../../types/user.types";

export default function MyQRScreen() {
  const navigation = useNavigation<any>();
  const [qrPayload, setQrPayload] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    let active = true;

    const hydrateQR = async () => {
      const payload = await generateUserQRPayload();
      if (!active) return;

      setQrPayload(payload);
      if (!payload) {
        setUserData(null);
        return;
      }

      const decoded = await decodeUserQRPayload(payload);
      if (!active) return;
      setUserData(decoded);
    };

    hydrateQR();

    return () => {
      active = false;
    };
  }, []);

  const gender = userData?.gender;

  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const SelectedIcon = iconMap[gender as keyof typeof iconMap];

  if (!qrPayload) {
    return (
      <View className="flex justify-center items-center h-full gap-5">
        <ErrorIcon width={72} height={72} fill="#e53e3e" />
        <Text className="text-white font-semibold text-2xl">
          Unable to generate QR code
        </Text>
      </View>
    );
  }

  return (
    <View className="h-full justify-between items-center gap-10 p-5">
      <View className="items-center gap-3">
        <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
          {SelectedIcon && (
            <SelectedIcon width={70} height={70} fill="#4f8cff" />
          )}
        </View>
        <View className="items-center">
          <Text className="text-white text-2xl font-bold">
            {userData?.name}
          </Text>
          <Text className="text-[#B3B3B3] text-xl">{userData?.profession}</Text>
        </View>
      </View>
      <View className="h-96 w-90 justify-center items-center bg-[#1A1A1A] rounded-2xl gap-3">
        <QRCode value={qrPayload} size={280} />
        <View className="flex-row justify-center items-center gap-3">
          <LockIcon width={12} height={12} fill={"#4f8cff"} />
          <Text className="text-[#B3B3B3]">Offline & Secure</Text>
        </View>
      </View>
      <PrimaryButton
        text={"Edit Profile"}
        icon={EditIcon}
        onPress={() => {
          navigation.navigate("EditProfileScreen");
        }}
      />
    </View>
  );
}

