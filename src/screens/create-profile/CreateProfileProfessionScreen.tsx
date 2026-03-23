import { Text, View } from "react-native";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { useAccountStore } from "../../store/accountStore";
import { useNavigation } from "@react-navigation/native";
import NextIcon from "../../assets/icons/next.svg";
import JobIcon from "../../assets/icons/job.svg";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function CreateProfileProfessionScreen() {
  const navigation = useNavigation<any>();

  const profession = useAccountStore((state:any) => state.profession);
  const setProfession = useAccountStore((state:any) => state.setProfession);

  return (
    <View className="h-full w-full p-5 justify-between">
      <View className="w-full gap-5 items-center">
        <View className="bg-[#4f8cff]/15 w-40 h-40 rounded-full items-center justify-center">
          <JobIcon width={70} height={70} fill={"#4f8cff"} />
        </View>
        <Text className="text-white text-2xl font-bold">
          What do you do for a living?
        </Text>
        <PrimaryInput
          value={profession}
          onChangeText={setProfession}
          placeholder={"e.g. Software Engineer"}
        />
      </View>
      <PrimaryButton
        icon={NextIcon}
        text="Next"
        onPress={() => {
          navigation.navigate("ContactInfoScreen");
        }}
      />
    </View>
  );
}