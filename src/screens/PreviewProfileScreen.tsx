import { View, Text, Pressable, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addContact, deleteContact } from "../lib/storage/contacts.storage";
import { resolvePreviewProfileSource } from "../lib/utils/contact.source";
import Header from "../components/Header";
import NutralIcon from "../assets/icons/user.svg";
import MaleIcon from "../assets/avatar/male-avatar.svg";
import FemaleIcon from "../assets/avatar/female-avatar.svg";
import PrimaryCard from "../components/PrimaryCard";
import SecondaryCard from "../components/SecondaryCard";

export default function PreviewProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { contact, isScannedFlow, isExistingContactFlow } =
    resolvePreviewProfileSource(route.params);

  const gender = contact?.gender;

  const iconMap = {
    male: MaleIcon,
    female: FemaleIcon,
    neutral: NutralIcon,
  };

  const SelectedIcon = iconMap[gender as keyof typeof iconMap];

  if (!contact) {
    return (
      <View>
        <Text>Contact not found.</Text>
      </View>
    );
  }

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
        <Text className="text-[#B3B3B3] text-lg font-semibold">
          {contact?.profession}
        </Text>
        <Text className="text-white">{contact?.bio}</Text>
        <View className="w-full justify-between items-center flex-row">
          <SecondaryCard
            text={"Call"}
            disabled={!contact.phone}
            onPress={() =>
              contact.phone && Linking.openURL(`tel:${contact.phone}`)
            }
          />
          <SecondaryCard
            text={"WhatsApp"}
            disabled={!contact.phone}
            onPress={() =>
              contact.phone &&
              Linking.openURL(
                `https://wa.me/${contact.phone.replace(/\D/g, "")}`,
              )
            }
          />
          <SecondaryCard
            text={"Email"}
            disabled={!contact.email}
            onPress={() => Linking.openURL(`mailto:${contact.email}`)}
          />
        </View>
      </View>

      <View>
        {isScannedFlow && (
          <Pressable
            onPress={() => {
              addContact(contact);
              navigation.replace("SavedProfilesScreen");
            }}
          >
            <Text>Save Contact</Text>
          </Pressable>
        )}

        {isExistingContactFlow && (
          <Pressable
            onPress={() => {
              deleteContact(contact);
              navigation.goBack();
            }}
          >
            <Text>Delete Contact</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
