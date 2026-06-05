import { View, Text, BackHandler, Keyboard } from "react-native";
import { useCallback, useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import ContactIcon from "../../assets/icons/contacts.svg";
import LockIcon from "../../assets/icons/secure.svg";
import SaveIcon from "../../assets/icons/save.svg";
import { useAccountStore } from "../../store/accountStore";
import { AccountStore } from "../../store/accountStore";
import { useUserStore } from "../../store/userStore";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import UserLinkInput from "../../components/inputs/UserLinkInput";
import { createUser } from "../../lib/storage/user.storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ConfirmModal from "../../components/modals/ConfirmModal";

export default function ProfileLinksScreen() {
  const navigation = useNavigation<any>();
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const name = useAccountStore((state: AccountStore) => state.name);
  const gender = useAccountStore((state: AccountStore) => state.gender);
  const profession = useAccountStore((state: AccountStore) => state.profession);
  const bio = useAccountStore((state: AccountStore) => state.bio);
  const email = useAccountStore((state: AccountStore) => state.email);
  const phone = useAccountStore((state: AccountStore) => state.phone);
  const whatsapp = useAccountStore((state: AccountStore) => state.whatsapp);

  const linkOneUrl = useAccountStore((state: AccountStore) => state.linkOneUrl);
  const setLinkOneUrl = useAccountStore((state: AccountStore) => state.setLinkOneUrl);
  const linkOneTitle = useAccountStore((state: AccountStore) => state.linkOneTitle);
  const setLinkOneTitle = useAccountStore((state: AccountStore) => state.setLinkOneTitle);

  const linkTwoUrl = useAccountStore((state: AccountStore) => state.linkTwoUrl);
  const setLinkTwoUrl = useAccountStore((state: AccountStore) => state.setLinkTwoUrl);
  const linkTwoTitle = useAccountStore((state: AccountStore) => state.linkTwoTitle);
  const setLinkTwoTitle = useAccountStore((state: AccountStore) => state.setLinkTwoTitle);

  const linkThreeUrl = useAccountStore((state: AccountStore) => state.linkThreeUrl);
  const setLinkThreeUrl = useAccountStore((state: AccountStore) => state.setLinkThreeUrl);
  const linkThreeTitle = useAccountStore((state: AccountStore) => state.linkThreeTitle);
  const setLinkThreeTitle = useAccountStore((state: AccountStore) => state.setLinkThreeTitle);

  const linkFourUrl = useAccountStore((state: AccountStore) => state.linkFourUrl);
  const setLinkFourUrl = useAccountStore((state: AccountStore) => state.setLinkFourUrl);
  const linkFourTitle = useAccountStore((state: AccountStore) => state.linkFourTitle);
  const setLinkFourTitle = useAccountStore((state: AccountStore) => state.setLinkFourTitle);

  const linkFiveUrl = useAccountStore((state: AccountStore) => state.linkFiveUrl);
  const setLinkFiveUrl = useAccountStore((state: AccountStore) => state.setLinkFiveUrl);
  const linkFiveTitle = useAccountStore((state: AccountStore) => state.linkFiveTitle);
  const setLinkFiveTitle = useAccountStore((state: AccountStore) => state.setLinkFiveTitle);

  const resetAccount = useAccountStore((state: AccountStore) => state.resetAccount);
  const setHasAccount = useUserStore((state) => state.setHasAccount);

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

  const saveUserData = () => {
    try {
      createUser({
        name, gender, email, profession, bio, phone, whatsapp,
        linkOneUrl, linkOneTitle,
        linkTwoUrl, linkTwoTitle,
        linkThreeUrl, linkThreeTitle,
        linkFourUrl, linkFourTitle,
        linkFiveUrl, linkFiveTitle,
      });
      setHasAccount(true);
    } catch {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <View className="flex-1 p-5">
      <Header
        currentScreenName={"Profile Links"}
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
              <ContactIcon width={50} height={50} fill="#4f8cff" />
            </View>
          </View>
          <Text className="text-white text-2xl font-bold text-center">
            Share any other platforms?
          </Text>
          <UserLinkInput
            titleValue={linkOneTitle} urlValue={linkOneUrl}
            onChangeTitle={setLinkOneTitle} onChangeUrl={setLinkOneUrl}
            titlePlaceholder="Link title" urlPlaceholder="e.g. https://instagram.com/username"
          />
          <UserLinkInput
            titleValue={linkTwoTitle} urlValue={linkTwoUrl}
            onChangeTitle={setLinkTwoTitle} onChangeUrl={setLinkTwoUrl}
            titlePlaceholder="Link title" urlPlaceholder="e.g. https://github.com/username"
          />
          <UserLinkInput
            titleValue={linkThreeTitle} urlValue={linkThreeUrl}
            onChangeTitle={setLinkThreeTitle} onChangeUrl={setLinkThreeUrl}
            titlePlaceholder="Link title" urlPlaceholder="e.g. https://linkedin.com/in/username"
          />
          <UserLinkInput
            titleValue={linkFourTitle} urlValue={linkFourUrl}
            onChangeTitle={setLinkFourTitle} onChangeUrl={setLinkFourUrl}
            titlePlaceholder="Link title" urlPlaceholder="e.g. https://x.com/username"
          />
          <UserLinkInput
            titleValue={linkFiveTitle} urlValue={linkFiveUrl}
            onChangeTitle={setLinkFiveTitle} onChangeUrl={setLinkFiveUrl}
            titlePlaceholder="Link title" urlPlaceholder="e.g. https://your-website.com"
          />
          <View className="flex-row items-center justify-center gap-1 pb-2">
            <LockIcon width={12} height={12} fill={"#4f8cff"} />
            <Text className="text-[#B3B3B3]">Your data is stored locally on this device</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {!keyboardVisible && (
        <PrimaryButton
          icon={SaveIcon}
          text="Save Profile"
          onPress={() => setShowSaveConfirm(true)}
        />
      )}
      <ConfirmModal
        visible={showSaveConfirm}
        title="Save Profile?"
        message="Don't worry! You can always edit your details in the edit profile screen later."
        confirmText="Save"
        cancelText="Review"
        onConfirm={() => { setShowSaveConfirm(false); saveUserData(); }}
        onCancel={() => setShowSaveConfirm(false)}
      />
    </View>
  );
}