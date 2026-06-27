import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useState, useCallback } from "react";
import {
  decodeUserQRPayload,
  generateUserQRPayload,
  SelectedFields,
} from "../../lib/qr/qr.parser";
import ErrorIcon from "../../assets/icons/error.svg";
import NutralIcon from "../../assets/icons/user.svg";
import { useResponsive } from "../../lib/utils/responsive.utils";
import EditIcon from "../../assets/icons/edit.svg";
import LockIcon from "../../assets/icons/secure.svg";
import MaleIcon from "../../assets/avatar/male-avatar.svg";
import FemaleIcon from "../../assets/avatar/female-avatar.svg";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { UserData } from "../../types/user.types";

export default function MyQRScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { sizes, width } = useResponsive();
  const selectedFields: SelectedFields | undefined = route.params?.selectedFields;

  const [qrPayload, setQrPayload] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const hydrateQR = async () => {
        const payload = await generateUserQRPayload(selectedFields);
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
    }, [selectedFields]),
  );

  const gender = (userData?.gender ?? "neutral") as "male" | "female" | "neutral";

  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const SelectedIcon = iconMap[gender];

  if (!qrPayload) {
    return (
      <View className="flex-1 justify-center items-center h-full gap-5">
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
        <View
          style={{
            width: sizes.avatarMd,
            height: sizes.avatarMd,
            borderRadius: sizes.avatarMd / 2,
            backgroundColor: 'rgba(79, 140, 255, 0.15)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {SelectedIcon && (
            <SelectedIcon width={Math.min(sizes.iconXl, sizes.avatarMd * 0.4)} height={Math.min(sizes.iconXl, sizes.avatarMd * 0.4)} fill="#4f8cff" />
          )}
        </View>
        <View className="items-center">
          <Text className="text-white text-2xl font-bold">
            {userData?.name}
          </Text>
          <Text className="text-[#B3B3B3] text-xl">{userData?.profession}</Text>
        </View>
      </View>
      <View className="justify-center items-center gap-3">
        <View className="bg-white p-4 rounded-2xl">
          <QRCode
            value={qrPayload}
            size={Math.min(sizes.qrLarge, width * 0.8 - 16)}
            backgroundColor="white"
            color="black"
          />
        </View>
        <View className="flex-row justify-center items-center gap-2 opacity-80">
          <LockIcon width={12} height={12} fill={"#4f8cff"} />
          <Text className="text-[#B3B3B3] text-sm">Offline & Secure</Text>
        </View>
      </View>
      <PrimaryButton
        text={"Edit Profile"}
        icon={EditIcon}
        onPress={() => navigation.navigate("EditProfileScreen")}
      />
    </View>
  );
}