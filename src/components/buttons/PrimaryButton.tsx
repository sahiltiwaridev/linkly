import { Pressable, Text, View, PressableProps } from "react-native";

type PrimaryButtonProps = {
  text: string;
  icon?: React.ComponentType<any>;
} & PressableProps;

export default function PrimaryButton({
  text,
  icon: Icon,
  disabled,
  ...rest
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      className={`w-full h-14 justify-center items-center rounded-xl ${
        disabled ? "bg-[#4f8cff]/50" : "bg-[#4f8cff]"
      }`}
      {...rest}
    >
      <View className="flex-row justify-center items-center gap-2">
        {Icon && (
          <Icon
            width={18}
            height={18}
            fill="#ffffff"
            opacity={disabled ? 0.6 : 1}
          />
        )}
        <Text
          className={`text-white font-semibold text-lg ${
            disabled ? "opacity-60" : ""
          }`}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
