import { View, Text, Pressable, Linking } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { addContact, deleteContact } from "../../lib/storage/contacts.storage";
import { resolvePreviewProfileSource } from "../../lib/utils/contact.source";
import Header from "../../components/layout/Header";
import CalllIcon from "../../assets/icons/call.svg";
import WhatsappIcon from "../../assets/icons/whatsapp.svg";
import EmailIcon from "../../assets/icons/mail.svg";
import NutralIcon from "../../assets/icons/user.svg";
import ScanIcon from "../../assets/icons/qr-scan.svg";
import MaleIcon from "../../assets/avatar/male-avatar.svg";
import FemaleIcon from "../../assets/avatar/female-avatar.svg";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryCard from "../../components/cards/SecondaryCard";
import LinkItem from "../../components/layout/LinkItem";
import {
  PreviewProfileResult,
  PreviewProfileRouteParams,
} from "../../types/preview.types";
import { UserLinkPair } from "../../types/link.types";

export default function PreviewProfileScreen() {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<{ PreviewProfileScreen: PreviewProfileRouteParams }, "PreviewProfileScreen">>();
  const [isResolvingSource, setIsResolvingSource] = useState(true);
  const [source, setSource] = useState<PreviewProfileResult | null>(null);

  useEffect(() => {
    let active = true;

    const resolveSource = async () => {
      setIsResolvingSource(true);
      const nextSource = await resolvePreviewProfileSource(route?.params);
      if (!active) return;
      setSource(nextSource);
      setIsResolvingSource(false);
    };

    resolveSource();

    return () => {
      active = false;
    };
  }, [route?.params]);

  if (isResolvingSource) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-[#B3B3B3] text-lg">Verifying contact...</Text>
      </View>
    );
  }

  if (!source || !source.contact) {
    return (
      <View className="flex-1 justify-between items-center p-5">
        <View></View>
        <View className="gap-3">
          <Text className="text-white text-2xl font-bold text-center">
            Not a valid contact
          </Text>

          <Text className="text-[#B3B3B3] text-lg text-center">
            Please scan a valid Linkly QR code.
          </Text>
        </View>

        <PrimaryButton
          icon={ScanIcon}
          text="Scan Again"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  const { contact, isScannedFlow, isExistingContactFlow } = source;

  const gender = contact.gender;

  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const SelectedIcon = iconMap[gender as keyof typeof iconMap];

  const phoneDigits = contact.phone?.replace(/\D/g, "") ?? "";
  const whatsappDigits = contact.whatsapp?.replace(/\D/g, "") ?? "";
  const profileLinks: UserLinkPair[] = [
    { title: contact.userLinkTitleFirst, url: contact.userLinkFirst },
    { title: contact.userLinkTitleSecond, url: contact.userLinkSecond },
    { title: contact.userLinkTitleThird, url: contact.userLinkThird },
    { title: contact.userLinkTitleFourth, url: contact.userLinkFourth },
    { title: contact.userLinkTitleFifth, url: contact.userLinkFifth },
  ].filter((link) => link.title.trim() && link.url.trim());

  return (
    <View className="p-5 h-full justify-between">
      <View className="items-center">
        <View className="pb-10 w-full">
          <Header currentScreenName={"Profile Preview"} />
        </View>

        <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
          {SelectedIcon && (
            <SelectedIcon width={70} height={70} fill="#4f8cff" />
          )}
        </View>

        <Text className="text-white text-2xl font-bold">{contact.name}</Text>

        {contact.profession && (
          <Text className="text-[#B3B3B3] text-lg font-semibold">
            {contact.profession}
          </Text>
        )}

        {contact.bio && (
          <Text className="text-white text-center mt-2">{contact.bio}</Text>
        )}

        <View className="gap-3 w-full items-center mt-6">
          <View className="w-full justify-between items-center flex-row">
            <SecondaryCard
              icon={CalllIcon}
              text="Call"
              disabled={!phoneDigits}
              onPress={() =>
                phoneDigits && Linking.openURL(`tel:${phoneDigits}`)
              }
            />

            <SecondaryCard
              icon={WhatsappIcon}
              text="WhatsApp"
              disabled={!whatsappDigits}
              onPress={() =>
                whatsappDigits &&
                Linking.openURL(`https://wa.me/${whatsappDigits}`)
              }
            />

            <SecondaryCard
              icon={EmailIcon}
              text="Email"
              disabled={!contact.email}
              onPress={() =>
                contact.email && Linking.openURL(`mailto:${contact.email}`)
              }
            />
          </View>

          <View className="w-full rounded-2xl h-1 bg-[#1A1A1A]" />
          {profileLinks.map((link) => (
            <LinkItem key={`${link.title}-${link.url}`} title={link.title} url={link.url} />
          ))}
        </View>
      </View>

      <View>
        {isScannedFlow && (
          <Pressable
            onPress={() => {
              addContact(contact);
              navigation.replace("SavedProfilesScreen");
            }}
            className="bg-[#4f8cff] py-4 rounded-2xl items-center"
          >
            <Text className="text-white font-semibold">Save Contact</Text>
          </Pressable>
        )}

        {isExistingContactFlow && "id" in contact && (
          <Pressable
            onPress={() => {
              deleteContact(contact);
              navigation.goBack();
            }}
            className="bg-red-500 py-4 rounded-2xl items-center"
          >
            <Text className="text-white font-semibold">Delete Contact</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
