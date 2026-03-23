import { useCallback, useState } from "react";
import { View, Text, BackHandler } from "react-native";
import ContactIcon from "../../assets/icons/contacts.svg";
import LockIcon from "../../assets/icons/secure.svg";
import SaveIcon from "../../assets/icons/save.svg";
import { useAccountStore } from "../../store/accountStore";
import { useUserStore } from "../../store/userStore";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import UserLinkInput from "../../components/inputs/UserLinkInput";
import { createUser } from "../../lib/storage/user.storage";
import Header from "../../components/layout/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ConfirmModal from "../../components/modals/ConfirmModal";

export default function ProfileLinksScreen() {
  const navigation = useNavigation<any>();
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const name = useAccountStore((state: any) => state.name);
  const gender = useAccountStore((state: any) => state.gender);
  const profession = useAccountStore((state: any) => state.profession);
  const bio = useAccountStore((state: any) => state.bio);
  const email = useAccountStore((state: any) => state.email);
  const phone = useAccountStore((state: any) => state.phone);
  const whatsapp = useAccountStore((state: any) => state.whatsapp);

  const linkOneUrl = useAccountStore((state: any) => state.linkOneUrl);
  const setLinkOneUrl = useAccountStore((state: any) => state.setLinkOneUrl);
  const linkOneTitle = useAccountStore((state: any) => state.linkOneTitle);
  const setLinkOneTitle = useAccountStore(
    (state: any) => state.setLinkOneTitle,
  );

  const linkTwoUrl = useAccountStore((state: any) => state.linkTwoUrl);
  const setLinkTwoUrl = useAccountStore((state: any) => state.setLinkTwoUrl);
  const linkTwoTitle = useAccountStore((state: any) => state.linkTwoTitle);
  const setLinkTwoTitle = useAccountStore(
    (state: any) => state.setLinkTwoTitle,
  );

  const linkThreeUrl = useAccountStore((state: any) => state.linkThreeUrl);
  const setLinkThreeUrl = useAccountStore(
    (state: any) => state.setLinkThreeUrl,
  );
  const linkThreeTitle = useAccountStore((state: any) => state.linkThreeTitle);
  const setLinkThreeTitle = useAccountStore(
    (state: any) => state.setLinkThreeTitle,
  );

  const linkFourUrl = useAccountStore((state: any) => state.linkFourUrl);
  const setLinkFourUrl = useAccountStore((state: any) => state.setLinkFourUrl);
  const linkFourTitle = useAccountStore((state: any) => state.linkFourTitle);
  const setLinkFourTitle = useAccountStore(
    (state: any) => state.setLinkFourTitle,
  );

  const linkFiveUrl = useAccountStore((state: any) => state.linkFiveUrl);
  const setLinkFiveUrl = useAccountStore((state: any) => state.setLinkFiveUrl);
  const linkFiveTitle = useAccountStore((state: any) => state.linkFiveTitle);
  const setLinkFiveTitle = useAccountStore(
    (state: any) => state.setLinkFiveTitle,
  );

  const resetAccount = useAccountStore((state: any) => state.resetAccount);
  const setHasAccount = useUserStore((state: any) => state.setHasAccount);

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
        linkOneUrl,
        linkOneTitle,
        linkTwoUrl,
        linkTwoTitle,
        linkThreeUrl,
        linkThreeTitle,
        linkFourUrl,
        linkFourTitle,
        linkFiveUrl,
        linkFiveTitle,
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
          titleValue={linkOneTitle}
          urlValue={linkOneUrl}
          onChangeTitle={setLinkOneTitle}
          onChangeUrl={setLinkOneUrl}
          titlePlaceholder="Link title"
          urlPlaceholder="e.g. https://instagram.com/username"
        />
        <UserLinkInput
          titleValue={linkTwoTitle}
          urlValue={linkTwoUrl}
          onChangeTitle={setLinkTwoTitle}
          onChangeUrl={setLinkTwoUrl}
          titlePlaceholder="Link title"
          urlPlaceholder="e.g. https://github.com/username"
        />
      </View>

      <View className="items-center gap-3">
        <PrimaryButton
          icon={SaveIcon}
          text="Save Profile"
          onPress={() => setShowSaveConfirm(true)}
        />
        <View className="flex-row items-center gap-1">
          <LockIcon width={12} height={12} fill={"#4f8cff"} />
          <Text className="text-[#B3B3B3]">
            Your data is stored locally on this device
          </Text>
        </View>
      </View>

      <ConfirmModal
        visible={showSaveConfirm}
        title="Save Profile?"
        message="Don't worry! You can always edit your details in the edit profile screen later."
        confirmText="Save"
        cancelText="Review"
        onConfirm={() => {
          setShowSaveConfirm(false);
          saveUserData();
        }}
        onCancel={() => setShowSaveConfirm(false)}
      />
    </View>
  );
}
