import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export type SavedContactItemProps = {
  itemName: string;
  itemID: string;
  itemProfession: string;
};

export default function SavedContactItem({
  itemName,
  itemProfession,
  itemID,
}: SavedContactItemProps) {
  const navigation = useNavigation<any>();
  return (
    <View className="w-full flex-row justify-between bg-[#1A1A1A] p-3 mb-3 items-center rounded-xl">
      <View>
        <Text className="text-white font-bold text-xl">{itemName}</Text>
        <Text className="text-[#b3b3b3] text-lg">
          {itemProfession}
        </Text>
      </View>

      <Pressable
        className="bg-[#4f8cff] h-12 w-24 items-center justify-center rounded-xl"
        onPress={() =>
          navigation.navigate("PreviewProfileScreen", {
            contactId: itemID,
          })
        }
      >
        <Text className="text-white font-bold text-lg">View</Text>
      </Pressable>
    </View>
  );
}
