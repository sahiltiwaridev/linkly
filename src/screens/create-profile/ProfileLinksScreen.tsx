import { useContext, useCallback } from "react";
import { View, Text, BackHandler } from "react-native";
import ContactIcon from "../../assets/icons/contacts.svg";
import LockIcon from "../../assets/icons/secure.svg";
import SaveIcon from "../../assets/icons/save.svg";
import { useAccount } from "../../context/account/AccountContextProvider";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import UserLinkInput from "../../components/inputs/UserLinkInput";
import userContext from "../../context/user/user.context";
import { createUser } from "../../lib/storage/user.storage";
import Header from "../../components/layout/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function ProfileLinksScreen() {
  const navigation = useNavigation<any>();
  const {
    name,
    gender,
    profession,
    email,
    phone,
    whatsapp,
    bio,
    userLinkFirst,
    setUserLinkFirst,
    userLinkSecond,
    setUserLinkSecond,
    userLinkThird,
    userLinkTitleFirst,
    setUserLinkTitleFirst,
    userLinkTitleSecond,
    setUserLinkTitleSecond,
    userLinkTitleThird,
    userLinkFourth,
    userLinkFifth,
    userLinkTitleFourth,
    userLinkTitleFifth,
    resetAccount,
  } = useAccount();
  const { setHasAccount } = useContext(userContext)!;

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

  const saveUserData = () => {
    try {
      createUser({
        name,
        gender,
        email,
        profession,
        bio,
        phone,
        whatsapp,

        userLinkFirst,
        userLinkSecond,
        userLinkThird,
        userLinkFourth,
        userLinkFifth,

        userLinkTitleFirst,
        userLinkTitleSecond,
        userLinkTitleThird,
        userLinkTitleFourth,
        userLinkTitleFifth,
      });
      setHasAccount(true);
    } catch {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <View className="p-5 h-full justify-between">
      <View className="gap-4">
        <Header
          currentScreenName={"Profile Links"}
          backButtonProps={{ onPress: handleBack }}
        />
        <View className="items-center">
          <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center">
            <ContactIcon width={50} height={50} fill="#4f8cff" />
          </View>
        </View>
        <Text className="text-white text-2xl font-bold text-center">
          Share any other platforms?
        </Text>
        <UserLinkInput
          titleValue={userLinkTitleFirst}
          urlValue={userLinkFirst}
          onChangeTitle={setUserLinkTitleFirst}
          onChangeUrl={setUserLinkFirst}
          titlePlaceholder="Link title"
          urlPlaceholder="e.g. https://instagram.com/username"
        />
        <UserLinkInput
          titleValue={userLinkTitleSecond}
          urlValue={userLinkSecond}
          onChangeTitle={setUserLinkTitleSecond}
          onChangeUrl={setUserLinkSecond}
          titlePlaceholder="Link title"
          urlPlaceholder="e.g. https://github.com/username"
        />
      </View>
      <View className="items-center gap-3">
        <PrimaryButton
          icon={SaveIcon}
          text="Save Profile"
          onPress={saveUserData}
        />
        <View className="flex-row items-center gap-1">
          <LockIcon width={12} height={12} fill={"#4f8cff"} />
          <Text className="text-[#B3B3B3]">
            Your data is stored locally on this device
          </Text>
        </View>
      </View>
    </View>
  );
}


