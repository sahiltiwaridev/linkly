import { View, Text } from "react-native";
import React from "react";

type FeatureHighlighterProps = {
  headingText: string;
  primaryText: string;
  icon: React.ComponentType<any>;
};

export default function FeatureHighlighter({
  headingText,
  primaryText,
  icon: Icon,
}: FeatureHighlighterProps) {
  return (
    <View className="flex-row items-center gap-4 bg-[#1a1a1a] p-5 rounded-xl">
      <View className="bg-[#4f8cff]/15 justify-center items-center h-16 w-16 rounded-full">
        <Icon width={24} height={24} fill={"#4f8cff"} />
      </View>
      <View className="flex-1">
        <Text className="text-white font-semibold">{headingText}</Text>
        <Text className="text-[#b3b3b3]">{primaryText}</Text>
      </View>
    </View>
  );
}
