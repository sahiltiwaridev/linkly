import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../lib/utils/responsive.utils";

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
  const { sizes } = useResponsive();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1A1A1A',
        padding: sizes.spacing.md,
        marginBottom: sizes.spacing.md,
        alignItems: 'center',
        borderRadius: 18,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text className="text-white font-bold text-xl">{itemName}</Text>
        <Text className="text-[#b3b3b3] text-lg">{itemProfession}</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: '#4f8cff',
          paddingVertical: sizes.spacing.sm,
          paddingHorizontal: sizes.spacing.lg,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          marginLeft: sizes.spacing.md,
        }}
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
