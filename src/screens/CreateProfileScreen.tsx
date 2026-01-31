import { View, Text, TextInput, Pressable } from "react-native";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  userEmailValidator,
  userNameValidator,
} from "../lib/profile/user.validators";
import { createUser } from "../lib/storage/user.storage";
import { useNavigation } from "@react-navigation/native";
import userContext from "../context/user/userContext";

type Gender = "male" | "female" | "neutral";

export default function CreateProfileScreen() {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender>("neutral");
  const [profession, setProfession] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const { setHasAccount } = useContext(userContext)!;

  const canProceed = !nameError && !emailError && name.length > 0;
  const navigation = useNavigation<any>();

  const saveUserData = () => {
    try {
      setHasAccount(true);
      createUser({ name, gender, profession, email, bio });
      navigation.replace("HomeScreen");
    } catch {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>CreateProfileScreen</Text>
        <View>
          <Text>Full Name*</Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError(userNameValidator(text));
            }}
            placeholder="e.g. Tony Stark"
          />
          {nameError && <Text>{nameError}</Text>}
        </View>
        <View>
          <Text>Gender (Optional)</Text>

          <Pressable onPress={() => setGender("male")}>
            <Text style={{ color: gender === "male" ? "#4F8EF7" : "#999" }}>
              Male
            </Text>
          </Pressable>

          <Pressable onPress={() => setGender("female")}>
            <Text style={{ color: gender === "female" ? "#4F8EF7" : "#999" }}>
              Female
            </Text>
          </Pressable>
        </View>

        <View>
          <Text>Profession</Text>
          <TextInput
            value={profession}
            onChangeText={setProfession}
            placeholder="e.g. Software Engineer"
          />
        </View>
        <View>
          <Text>Email ID</Text>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(userEmailValidator(text));
            }}
            placeholder="e.g. name@example.com"
          />

          {emailError && <Text>{emailError}</Text>}
        </View>
        <View>
          <Text>Short Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Briefly describe yourself"
          />
        </View>
        <Pressable disabled={!canProceed} onPress={saveUserData}>
          <Text style={{ opacity: canProceed ? 1 : 0.5 }}>Save Profile</Text>
        </Pressable>

        <Text>Your data is stored locally on this device</Text>
      </View>
    </SafeAreaView>
  );
}
