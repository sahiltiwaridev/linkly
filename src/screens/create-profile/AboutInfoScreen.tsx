import { View, Text, TextInput, BackHandler, Keyboard } from "react-native";
import { useCallback, useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import AboutIcon from "../../assets/icons/about.svg";
import NextIcon from "../../assets/icons/next.svg";
import { useAccountStore } from "../../store/accountStore";
import { AccountStore } from "../../store/accountStore";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AboutInfoScreen() {
  const navigation = useNavigation<any>();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const profession = useAccountStore((state: AccountStore) => state.profession);
  const setProfession = useAccountStore((state: AccountStore) => state.setProfession);
  const bio = useAccountStore((state: AccountStore) => state.bio);
  const setBio = useAccountStore((state: AccountStore) => state.setBio);
  const resetAccount = useAccountStore((state: AccountStore) => state.resetAccount);

  const handleBack = useCallback(() => {
    resetAccount();
    navigation.goBack();
  }, [navigation, resetAccount]);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        handleBack();
        return true;
      });
      return () => sub.remove();
    }, [handleBack]),
  );

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  return (
    <View className="flex-1 p-5">
      <Header
        currentScreenName={"About Info"}
        backButtonProps={{ onPress: handleBack }}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={120}
        extraHeight={150}
      >
        <View className="gap-4 mt-4">
          <View className="items-center">
            <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center">
              <AboutIcon width={50} height={50} fill="#4f8cff" />
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-white text-2xl font-bold">What you do</Text>
            <PrimaryInput
              value={profession}
              onChangeText={setProfession}
              placeholder={"e.g. Software Engineer"}
            />
          </View>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-white text-2xl font-bold">Quick intro</Text>
              <Text className="text-[#B3B3B3] text-right mt-2">{bio.length}/150</Text>
            </View>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Briefly describe yourself"
              className="bg-[#222222] p-5 h-32 w-full text-white rounded-md"
              multiline
              textAlignVertical="top"
              placeholderTextColor="#B3B3B3"
              maxLength={150}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {!keyboardVisible && (
        <PrimaryButton
          icon={NextIcon}
          text="Next"
          onPress={() => navigation.navigate("ContactInfoScreen")}
        />
      )}
    </View>
  );
}