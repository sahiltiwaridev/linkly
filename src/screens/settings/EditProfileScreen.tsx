import { BackHandler, Keyboard, View } from "react-native";
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import userContext from "../../context/user/user.context";
import Header from "../../components/layout/Header";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import DeleteIcon from "../../assets/icons/trash.svg";
import SaveIcon from "../../assets/icons/save.svg";
import ConfirmModal from "../../components/modals/ConfirmModal";
import {
  getUser,
  removeUser,
  updateUser,
  UserData,
} from "../../lib/storage/user.storage";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import EditProfileBasicSection from "../../components/edit-profile/EditProfileBasicSection";
import EditProfileContactSection from "../../components/edit-profile/EditProfileContactSection";
import EditProfileLinksSection from "../../components/edit-profile/EditProfileLinksSection";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  EMPTY_DRAFT,
  EditProfileDraft,
  buildUpdatedUser,
  createDraftFromUser,
  getShortNameError,
  hasDraftChanges,
  validateDraft,
} from "./editProfile.helpers";

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const scrollRef = useRef<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [draft, setDraft] = useState<EditProfileDraft>(EMPTY_DRAFT);

  const userCtx = useContext(userContext);
  const { nameError, phoneError, whatsappError, emailError, linkError } =
    validateDraft(draft);
  const shortNameError = getShortNameError(nameError);

  const shortPhoneError = phoneError ? "Invalid number" : null;
  const shortWhatsappError = whatsappError ? "Invalid WhatsApp" : null;
  const shortEmailError = emailError ? "Invalid email" : null;

  const hasChanges = hasDraftChanges(draft, userProfile);

  const canSave =
    hasChanges &&
    !nameError &&
    draft.name.trim().length > 0 &&
    !phoneError &&
    !whatsappError &&
    !emailError &&
    !linkError;

  const setField = <K extends keyof EditProfileDraft>(
    key: K,
    value: EditProfileDraft[K],
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

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

  useFocusEffect(
    useCallback(() => {
      const userData = getUser();
      console.log("Loaded user data:", userData); // Debug log

      if (userData) {
        setUserProfile(userData);
        const draftData = createDraftFromUser(userData);
        console.log("Draft created:", draftData); // Debug log
        setDraft(draftData);
      } else {
        setUserProfile(null);
        setDraft(EMPTY_DRAFT);
      }

      setTimeout(() => scrollRef.current?.scrollToPosition(0, 0, false), 50);
    }, []),
  );

  const applyProfileUpdate = () => {
    if (!canSave || !userProfile) return;
    try {
      updateUser(buildUpdatedUser(userProfile, draft));
      const refreshed = getUser();
      setUserProfile(refreshed);
      setShowUpdateConfirm(false);
      // Show success message or navigate back
      navigation.goBack();
    } catch {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <View className="flex-1 p-5 h-full">
      <View className="flex-1">
        <Header
          currentScreenName={"Edit Profile"}
          backButtonProps={{ onPress: handleAttemptBack }}
        />
        <KeyboardAwareScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 180, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          enableOnAndroid
          enableAutomaticScroll
          enableResetScrollToCoords={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          keyboardOpeningTime={250}
          extraScrollHeight={120}
          extraHeight={150}
        >
          <View className="gap-4">
            <EditProfileBasicSection
              gender={draft.gender}
              name={draft.name}
              profession={draft.profession}
              bio={draft.bio}
              shortNameError={shortNameError}
              onChangeGender={(value) => setField("gender", value)}
              onChangeName={(value) => setField("name", value)}
              onChangeProfession={(value) => setField("profession", value)}
              onChangeBio={(value) => setField("bio", value)}
            />

            <EditProfileContactSection
              phone={draft.phone}
              whatsapp={draft.whatsapp}
              email={draft.email}
              shortPhoneError={shortPhoneError}
              shortWhatsappError={shortWhatsappError}
              shortEmailError={shortEmailError}
              onChangePhone={(text) => {
                const digits = text.replace(/\D/g, "").slice(0, 10);
                setField("phone", digits);
              }}
              onChangeWhatsapp={(text) => {
                const digits = text.replace(/\D/g, "").slice(0, 10);
                setField("whatsapp", digits);
              }}
              onChangeEmail={(value) => setField("email", value)}
            />

            <EditProfileLinksSection
              links={[
                {
                  titleValue: draft.userLinkTitleFirst,
                  urlValue: draft.userLinkFirst,
                  onChangeTitle: (text) => setField("userLinkTitleFirst", text),
                  onChangeUrl: (text) => setField("userLinkFirst", text),
                  urlPlaceholder: "e.g. https://instagram.com/username",
                },
                {
                  titleValue: draft.userLinkTitleSecond,
                  urlValue: draft.userLinkSecond,
                  onChangeTitle: (text) =>
                    setField("userLinkTitleSecond", text),
                  onChangeUrl: (text) => setField("userLinkSecond", text),
                  urlPlaceholder: "e.g. https://github.com/username",
                },
                {
                  titleValue: draft.userLinkTitleThird,
                  urlValue: draft.userLinkThird,
                  onChangeTitle: (text) => setField("userLinkTitleThird", text),
                  onChangeUrl: (text) => setField("userLinkThird", text),
                  urlPlaceholder: "e.g. https://linkedin.com/in/username",
                },
                {
                  titleValue: draft.userLinkTitleFourth,
                  urlValue: draft.userLinkFourth,
                  onChangeTitle: (text) =>
                    setField("userLinkTitleFourth", text),
                  onChangeUrl: (text) => setField("userLinkFourth", text),
                  urlPlaceholder: "e.g. https://x.com/username",
                },
                {
                  titleValue: draft.userLinkTitleFifth,
                  urlValue: draft.userLinkFifth,
                  onChangeTitle: (text) => setField("userLinkTitleFifth", text),
                  onChangeUrl: (text) => setField("userLinkFifth", text),
                  urlPlaceholder: "e.g. https://your-website.com",
                },
              ]}
            />

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
