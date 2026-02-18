// Keeping this file for just in case



// import { View, Text, TextInput, Pressable } from "react-native";
// import { useContext, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   userEmailValidator,
//   userNameValidator,
// } from "../lib/validation/user.validators";
// import { createUser } from "../lib/storage/user.storage";
// import userContext from "../context/user/user.context";
// import PrimaryInput from "../components/PrimaryInput";
// import PrimaryButton from "../components/PrimaryButton";
// import SaveIcon from "../assets/icons/save.svg";

// type Gender = "male" | "female" | "neutral";

// export default function CreateProfileScreen() {
//   const [name, setName] = useState<string>("");
//   const [gender, setGender] = useState<Gender>("neutral");
//   const [profession, setProfession] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [bio, setBio] = useState<string>("");

//   const [nameError, setNameError] = useState<string | null>(null);
//   const [emailError, setEmailError] = useState<string | null>(null);

//   const { setHasAccount } = useContext(userContext)!;

//   const canProceed = !nameError && !emailError && name.length > 0;

//   const saveUserData = () => {
//     try {
//       createUser({ name, gender, profession, email, bio });
//       setHasAccount(true);
//     } catch {
//       alert("Something went wrong! Please try again.");
//     }
//   };

//   return (
//     <SafeAreaView>
//       <View className="px-5 h-full w-full justify-between">
//         <View className="gap-2 items-center">
//           <View className="h-28 w-28 bg-[#1A1A1A] rounded-full"></View>
//           <View className="w-full">
//             <PrimaryInput
//               label={"Full Name *"}
//               value={name}
//               onChangeText={(text) => {
//                 setName(text);
//                 setNameError(userNameValidator(text));
//               }}
//               placeholder={"e.g. Tony Stark"}
//             />
//             {nameError && <Text className="text-red-600">{nameError}</Text>}
//           </View>
//           <View className="gap-2">
//             <Text className="text-white text-lg">Gender (Optional)</Text>
//             <View className="flex-row w-full h-12 justify-between">
//               <Pressable
//                 className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
//                 onPress={() => setGender("male")}
//               >
//                 <Text
//                   style={{ color: gender === "male" ? "#4F8CFF" : "#ffffff" }}
//                 >
//                   Male
//                 </Text>
//               </Pressable>
//               <Pressable
//                 className="bg-[#222222] w-[49%] h-fit items-center justify-center rounded-md"
//                 onPress={() => setGender("female")}
//               >
//                 <Text
//                   style={{ color: gender === "female" ? "#4F8CFF" : "#ffffff" }}
//                 >
//                   Female
//                 </Text>
//               </Pressable>
//             </View>
//           </View>

//           <PrimaryInput
//             label={"Profession"}
//             value={profession}
//             onChangeText={setProfession}
//             placeholder={"e.g. Software Engineer"}
//           />

//           <View className="w-full">
//             <PrimaryInput
//               label={"Email ID"}
//               value={email}
//               onChangeText={(text) => {
//                 setEmail(text);
//                 setEmailError(userEmailValidator(text));
//               }}
//               placeholder={"e.g. name@example.com"}
//             />

//             {emailError && <Text className="text-red-600">{emailError}</Text>}
//           </View>

//           <View className="w-full">
//             <Text className="text-white text-lg">Short Bio</Text>
//             <TextInput
//               value={bio}
//               onChangeText={setBio}
//               placeholder="Briefly describe yourself"
//               className="bg-[#222222] h-32 align-top w-full text-white rounded-md will-change-variable"
//               multiline
//               textAlignVertical="top"
//               placeholderTextColor="#B3B3B3"
//             />
//           </View>
//         </View>
//         <View className="items-center gap-1">
//           <PrimaryButton
//             icon={SaveIcon}
//             text="Save Profile"
//             disabled={!canProceed}
//             onPress={saveUserData}
//           />
//           <Text className="text-[#B3B3B3]">
//             Your data is stored locally on this device
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }
