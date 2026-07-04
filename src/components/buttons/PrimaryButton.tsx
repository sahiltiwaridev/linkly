import { Pressable, Text, View, PressableProps } from "react-native";
import { useResponsive } from "../../lib/utils/responsive.utils";

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
  const { sizes, ui } = useResponsive();

  return (
    <Pressable
      disabled={disabled}
      style={{
        width: '100%',
        height: ui.buttonHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: disabled ? 'rgba(79, 140, 255, 0.5)' : '#4f8cff',
      }}
      {...rest}
    >
      <View className="flex-row justify-center items-center gap-2">
        {Icon && (
          <Icon
            width={sizes.iconMd}
            height={sizes.iconMd}
            fill="#ffffff"
            opacity={disabled ? 0.6 : 1}
          />
        )}
        <Text
          style={{
            color: '#ffffff',
            fontSize: ui.bodyFontSize,
            fontWeight: '600',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
