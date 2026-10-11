import { useCallback, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { authenticate } from "../../lib/validation/biomatrics.validators";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const unlock = useCallback(async () => {
    if (await authenticate()) onUnlock();
  }, [onUnlock]);

  useEffect(() => { unlock(); }, [unlock]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0f0f0f" }}>
      <Pressable onPress={unlock}>
        <Text>Unlock</Text>
      </Pressable>
    </View>
  );
}