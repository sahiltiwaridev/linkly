import { View, Text, Switch, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SelectedFields } from "../../lib/qr/qr.parser";
import Header from "../../components/layout/Header";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import NextIcon from "../../assets/icons/next.svg";
import { getUser } from "../../lib/storage/user.storage";

type FieldItem = {
  key: keyof SelectedFields;
  label: string;
  value: string | undefined;
};

export default function SelectFieldsScreen() {
  const navigation = useNavigation<any>();
  const [user] = useState(() => getUser());

  const [selected, setSelected] = useState<SelectedFields>({
    phone: true,
    whatsapp: true,
    email: true,
    linkOne: true,
    linkTwo: true,
    linkThree: true,
    linkFour: true,
    linkFive: true,
  });

  const toggle = (field: keyof SelectedFields) => {
    setSelected((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fields: FieldItem[] = (
    [
      { key: "phone", label: "Phone", value: user?.phone },
      { key: "whatsapp", label: "WhatsApp", value: user?.whatsapp },
      { key: "email", label: "Email", value: user?.email },
      { key: "linkOne", label: user?.linkOneTitle || "Link 1", value: user?.linkOneUrl },
      { key: "linkTwo", label: user?.linkTwoTitle || "Link 2", value: user?.linkTwoUrl },
      { key: "linkThree", label: user?.linkThreeTitle || "Link 3", value: user?.linkThreeUrl },
      { key: "linkFour", label: user?.linkFourTitle || "Link 4", value: user?.linkFourUrl },
      { key: "linkFive", label: user?.linkFiveTitle || "Link 5", value: user?.linkFiveUrl },
    ] as FieldItem[]
  ).filter((f) => f.value);

  return (
    <View className="flex-1 p-5">
      <Header currentScreenName="Share Profile" />
      <ScrollView
        className="flex-1 mt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="gap-2">
          <Text className="text-[#B3B3B3] text-sm mb-2">Always included</Text>
          {["Name", "Profession", "Bio", "Gender"].map((label) => (
            <View
              key={label}
              className="flex-row items-center justify-between bg-[#1a1a1a] px-4 py-4 rounded-xl"
            >
              <Text className="text-white text-base">{label}</Text>
              <Text className="text-[#555] text-sm">Always on</Text>
            </View>
          ))}

          <Text className="text-[#B3B3B3] text-sm mt-4 mb-2">
            Choose what to share
          </Text>
          {fields.map((field) => (
            <View
              key={field.key}
              className="flex-row items-center justify-between bg-[#1a1a1a] px-4 py-4 rounded-xl"
            >
              <View className="flex-1 mr-4">
                <Text className="text-white text-base">{field.label}</Text>
                <Text className="text-[#555] text-sm" numberOfLines={1}>
                  {field.value}
                </Text>
              </View>
              <Switch
                value={selected[field.key]}
                onValueChange={() => toggle(field.key)}
                trackColor={{ false: "#2a2a2a", true: "#4f8cff" }}
                thumbColor="#ffffff"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <PrimaryButton
        icon={NextIcon}
        text="Generate QR"
        onPress={() =>
          navigation.navigate("MyQRScreen", { selectedFields: selected })
        }
      />
    </View>
  );
}