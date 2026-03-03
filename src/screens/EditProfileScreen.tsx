import {
  BackHandler,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import userContext from "../context/user/user.context";
import Header from "../components/Header";
import SecondaryButton from "../components/SecondaryButton";
import DeleteIcon from "../assets/icons/trash.svg";
import SaveIcon from "../assets/icons/save.svg";
import NutralIcon from "../assets/icons/user.svg";
import MaleIcon from "../assets/avatar/male-avatar.svg";
import FemaleIcon from "../assets/avatar/female-avatar.svg";
import ConfirmModal from "../components/ConfirmModal";
import {
  getUser,
  removeUser,
  updateUser,
  UserData,
} from "../lib/storage/user.storage";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryInput from "../components/PrimaryInput";
import UserLinkInput from "../components/UserLinkInput";
import {
  userEmailValidator,
  userNameValidator,
} from "../lib/validation/user.validators";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const phoneValidator = (value: string): string | null => {
  if (!value) return null;
  if (value.length !== 10) return "Must be exactly 10 digits.";
  return null;
};

type Gender = "male" | "female" | "neutral";

const hasLinkPairError = (title: string, url: string) => {
  const trimmedTitle = title.trim();
  const trimmedUrl = url.trim();
  return Boolean((trimmedUrl && !trimmedTitle) || (trimmedTitle && !trimmedUrl));
};

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("neutral");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [userLinkFirst, setUserLinkFirst] = useState("");
  const [userLinkSecond, setUserLinkSecond] = useState("");
  const [userLinkThird, setUserLinkThird] = useState("");
  const [userLinkFourth, setUserLinkFourth] = useState("");
  const [userLinkFifth, setUserLinkFifth] = useState("");
  const [userLinkTitleFirst, setUserLinkTitleFirst] = useState("");
  const [userLinkTitleSecond, setUserLinkTitleSecond] = useState("");
  const [userLinkTitleThird, setUserLinkTitleThird] = useState("");
  const [userLinkTitleFourth, setUserLinkTitleFourth] = useState("");
  const [userLinkTitleFifth, setUserLinkTitleFifth] = useState("");

  const userCtx = useContext(userContext);
  const nameError = userNameValidator(name);
  const phoneError = phoneValidator(phone);
  const whatsappError = phoneValidator(whatsapp);
  const emailError = userEmailValidator(email);

  const shortNameError = !nameError
    ? null
    : nameError === "Name is required"
      ? "Required"
      : nameError === "Name must be at least 3 characters"
      ? "Too short"
        : "Invalid name";

  const shortPhoneError = phoneError ? "Invalid number" : null;
  const shortWhatsappError = whatsappError ? "Invalid WhatsApp" : null;
  const shortEmailError = emailError ? "Invalid email" : null;

  const linkError =
    hasLinkPairError(userLinkTitleFirst, userLinkFirst) ||
    hasLinkPairError(userLinkTitleSecond, userLinkSecond) ||
    hasLinkPairError(userLinkTitleThird, userLinkThird) ||
    hasLinkPairError(userLinkTitleFourth, userLinkFourth) ||
    hasLinkPairError(userLinkTitleFifth, userLinkFifth);

  const hasChanges = Boolean(
    userProfile &&
      (
        name !== userProfile.name ||
        gender !== userProfile.gender ||
        profession !== userProfile.profession ||
        bio !== userProfile.bio ||
        phone !== userProfile.phone ||
        whatsapp !== userProfile.whatsapp ||
        email !== userProfile.email ||
        userLinkFirst !== userProfile.userLinkFirst ||
        userLinkSecond !== userProfile.userLinkSecond ||
        userLinkThird !== userProfile.userLinkThird ||
        userLinkFourth !== userProfile.userLinkFourth ||
        userLinkFifth !== userProfile.userLinkFifth ||
        userLinkTitleFirst !== userProfile.userLinkTitleFirst ||
        userLinkTitleSecond !== userProfile.userLinkTitleSecond ||
        userLinkTitleThird !== userProfile.userLinkTitleThird ||
        userLinkTitleFourth !== userProfile.userLinkTitleFourth ||
        userLinkTitleFifth !== userProfile.userLinkTitleFifth
      ),
  );

  const canSave =
    hasChanges &&
    !nameError &&
    name.trim().length > 0 &&
    !phoneError &&
    !whatsappError &&
    !emailError &&
    !linkError;

  const handleAttemptBack = useCallback(() => {
    if (keyboardVisible) {
      Keyboard.dismiss();
      return;
    }
    if (hasChanges) {
      setShowDiscardConfirm(true);
      return;
    }
    navigation.goBack();
  }, [hasChanges, keyboardVisible, navigation]);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        handleAttemptBack();
        return true;
      });

      return () => sub.remove();
    }, [handleAttemptBack]),
  );

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleDeleteProfile = () => {
    removeUser();
    userCtx?.setHasAccount(false);
    setShowConfirm(false);
  };

  useEffect(() => {
    const userData = getUser();

    if (userData) {
      setUserProfile(userData);
      setName(userData.name);
      setGender(userData.gender);
      setProfession(userData.profession);
      setBio(userData.bio);
      setPhone(userData.phone);
      setWhatsapp(userData.whatsapp);
      setEmail(userData.email);
      setUserLinkFirst(userData.userLinkFirst);
      setUserLinkSecond(userData.userLinkSecond);
      setUserLinkThird(userData.userLinkThird);
      setUserLinkFourth(userData.userLinkFourth);
      setUserLinkFifth(userData.userLinkFifth);
      setUserLinkTitleFirst(userData.userLinkTitleFirst);
      setUserLinkTitleSecond(userData.userLinkTitleSecond);
      setUserLinkTitleThird(userData.userLinkTitleThird);
      setUserLinkTitleFourth(userData.userLinkTitleFourth);
      setUserLinkTitleFifth(userData.userLinkTitleFifth);
    }
  }, []);

  const applyProfileUpdate = () => {
    if (!canSave || !userProfile) return;
    try {
      updateUser({
        ...userProfile,
        name,
        gender,
        profession,
        bio,
        phone,
        whatsapp,
        email,
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
      const refreshed = getUser();
      setUserProfile(refreshed);
      setShowUpdateConfirm(false);
    } catch {
      alert("Something went wrong! Please try again.");
    }
  };

  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const SelectedIcon = iconMap[gender as keyof typeof iconMap];

  return (
    <View className="flex-1 p-5 h-full">
      <View className="flex-1">
        <Header
          currentScreenName={"Edit Profile"}
          backButtonProps={{ onPress: handleAttemptBack }}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 180, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          enableOnAndroid
          enableAutomaticScroll
          enableResetScrollToCoords={false}
          keyboardOpeningTime={250}
          extraScrollHeight={120}
          extraHeight={150}
        >
        <View className="gap-4">
          <View className="bg-[#4f8cff]/15 w-28 h-28 rounded-full items-center justify-center self-center">
            {SelectedIcon && (
              <SelectedIcon width={50} height={50} fill="#4f8cff" />
            )}
          </View>

        <View className="gap-2">
          <Text className="text-white text-2xl font-bold">Gender</Text>
          <View className="flex-row w-full h-12 justify-between">
            <Pressable
              className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
              onPress={() => setGender("male")}
            >
              <Text
                style={{ color: gender === "male" ? "#4F8CFF" : "#ffffff" }}
              >
                Male
              </Text>
            </Pressable>
            <Pressable
              className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
              onPress={() => setGender("female")}
            >
              <Text
                style={{ color: gender === "female" ? "#4F8CFF" : "#ffffff" }}
              >
                Female
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-bold">Full name</Text>
          {shortNameError && (
            <Text className="text-red-600 text-sm">{shortNameError}</Text>
          )}
        </View>
        <PrimaryInput
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder="e.g. Tony Stark"
        />

        <View className="gap-2">
          <Text className="text-white text-2xl font-bold">Profession</Text>
          <PrimaryInput
            value={profession}
            onChangeText={setProfession}
            placeholder="e.g. Software Engineer"
          />
        </View>

        <View className="gap-2">
          <View className="flex-row justify-between">
            <Text className="text-white text-2xl font-bold">Bio</Text>
            <Text className="text-[#B3B3B3] text-right mt-2">
              {bio.length}/150
            </Text>
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

        <View className="gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold">Phone</Text>
            {shortPhoneError && (
              <Text className="text-red-600 text-sm">{shortPhoneError}</Text>
            )}
          </View>
          <PrimaryInput
            value={phone}
            onChangeText={(text) => {
              const digits = text.replace(/\D/g, "").slice(0, 10);
              setPhone(digits);
            }}
            placeholder="e.g. 9876543210"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>

        <View className="gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold">WhatsApp</Text>
            {shortWhatsappError && (
              <Text className="text-red-600 text-sm">{shortWhatsappError}</Text>
            )}
          </View>
          <PrimaryInput
            value={whatsapp}
            onChangeText={(text) => {
              const digits = text.replace(/\D/g, "").slice(0, 10);
              setWhatsapp(digits);
            }}
            placeholder="e.g. 9876543210"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>

        <View className="gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold">Email</Text>
            {shortEmailError && (
              <Text className="text-red-600 text-sm">{shortEmailError}</Text>
            )}
          </View>
          <PrimaryInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="e.g. name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="gap-4">
          <Text className="text-white text-2xl font-bold text-center">
            Profile Links
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
          <UserLinkInput
            titleValue={userLinkTitleThird}
            urlValue={userLinkThird}
            onChangeTitle={setUserLinkTitleThird}
            onChangeUrl={setUserLinkThird}
            titlePlaceholder="Link title"
            urlPlaceholder="e.g. https://linkedin.com/in/username"
          />
          <UserLinkInput
            titleValue={userLinkTitleFourth}
            urlValue={userLinkFourth}
            onChangeTitle={setUserLinkTitleFourth}
            onChangeUrl={setUserLinkFourth}
            titlePlaceholder="Link title"
            urlPlaceholder="e.g. https://x.com/username"
          />
          <UserLinkInput
            titleValue={userLinkTitleFifth}
            urlValue={userLinkFifth}
            onChangeTitle={setUserLinkTitleFifth}
            onChangeUrl={setUserLinkFifth}
            titlePlaceholder="Link title"
            urlPlaceholder="e.g. https://your-website.com"
          />
        </View>

        <View className="gap-6">
          <SecondaryButton
            onPress={() => setShowConfirm(true)}
            text={"Delete Profile"}
            icon={DeleteIcon}
          />
        </View>
        </View>
        <ConfirmModal
          visible={showConfirm}
          title="Delete Profile?"
          message="This will permanently remove your profile and all local data. This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteProfile}
          onCancel={() => setShowConfirm(false)}
        />
        </KeyboardAwareScrollView>
      </View>
      <ConfirmModal
        visible={showDiscardConfirm}
        title="Discard changes?"
        message="You have unsaved changes. Going back will discard them."
        confirmText="Discard"
        cancelText="Stay"
        onConfirm={() => {
          setShowDiscardConfirm(false);
          navigation.goBack();
        }}
        onCancel={() => setShowDiscardConfirm(false)}
      />
      <ConfirmModal
        visible={showUpdateConfirm}
        title="Update profile?"
        message="Do you want to save these profile changes?"
        confirmText="Update"
        cancelText="Cancel"
        onConfirm={applyProfileUpdate}
        onCancel={() => setShowUpdateConfirm(false)}
      />
      {!keyboardVisible && (
        <PrimaryButton
          text={"Save"}
          icon={SaveIcon}
          onPress={() => setShowUpdateConfirm(true)}
          disabled={!canSave}
        />
      )}
    </View>
  );
}
