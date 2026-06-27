import { View, Text, ScrollView, Linking } from "react-native";
import React from "react";
import Header from "../../components/layout/Header";

export default function UserManualScreen() {
  const headingTextStyle = "text-white font-bold text-2xl";
  const paragraphTextStyle = "text-[#B3B3B3] text-lg leading-7";
  const sectionStyle = "gap-4 mb-12";

  return (
    <View className="flex-1 p-5">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pb-10">
          <Header currentScreenName={"User Manual"} />
        </View>
        <View className="mb-10 gap-3">
          <Text className={headingTextStyle}>
            Linkly – Getting Started Guide
          </Text>
          <Text className={paragraphTextStyle}>Version 1.0.0</Text>
          <Text className={paragraphTextStyle}>Welcome to Linkly.</Text>
          <Text className={paragraphTextStyle}>
            If you’re reading this, it means you’ve successfully installed the
            app and already created your profile. Nice. We’re past the boring
            part.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>What Linkly Does</Text>
          <Text className={paragraphTextStyle}>
            Linkly lets you share your professional profile instantly using a QR
            code.
          </Text>
          <Text className={paragraphTextStyle}>
            No typing emails. No searching usernames. No “I’ll send it later.”
            Just scan → preview → save.
          </Text>
          <Text className={paragraphTextStyle}>
            Everything works offline by default. Internet is only required when
            you manually check for updates. Your data stays on your device.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Show Your QR Code</Text>
          <Text className={paragraphTextStyle}>
            On the Home screen, tap the “My QR” button.
          </Text>
          <Text className={paragraphTextStyle}>
            Your personal QR code will appear. Let someone scan it, and they’ll
            instantly see the details you chose to share.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Scan Someone’s QR Code</Text>
          <Text className={paragraphTextStyle}>
            Tap the “Scan” button on the Home screen and point your camera at
            their QR code.
          </Text>
          <Text className={paragraphTextStyle}>
            You’ll see a preview of their profile. From there, you can save the
            contact or close it. If you don’t save it, it’s not stored.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>View & Manage Saved Contacts</Text>
          <Text className={paragraphTextStyle}>
            Open your Saved Contacts section from the Home screen to view saved
            profiles or delete any contact anytime.
          </Text>
          <Text className={paragraphTextStyle}>
            Deleted means deleted. No archive. No recycle bin.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Updates</Text>
          <Text className={paragraphTextStyle}>
            Linkly is not distributed through the Play Store. Updates are
            handled manually.
          </Text>
          <Text className={paragraphTextStyle}>
            Open the Update screen and tap “Check for Updates.” If a newer
            version is available, you’ll be redirected to download it.
          </Text>
          <Text className={paragraphTextStyle}>
            When installing a new version over the existing one, your saved data
            will remain on your device. However, uninstalling the app before
            updating will permanently remove all local data.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Platform Availability</Text>
          <Text className={paragraphTextStyle}>
            Currently, Linkly is available only for Android.
          </Text>
          <Text className={paragraphTextStyle}>
            An iOS version may come in the future — once I get access to the
            right tools (yes, that includes a Mac). Until then, it’s all about
            Android.
          </Text>
          <Text className={paragraphTextStyle}>
            Because Linkly is distributed as a direct APK, it allows independent
            releases and full control over updates without store approval
            delays.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Connect</Text>
          <Text className={paragraphTextStyle}>
            For feedback or collaboration:
          </Text>
          <Text
            className="text-[#4f8cff] text-lg"
            onPress={() =>
              Linking.openURL("mailto:sahiltiwari.contactme@gmail.com")
            }
          >
            Send an Email
          </Text>
          <Text className={paragraphTextStyle}>
            More technical details and project breakdown:
          </Text>
          <Text
            className="text-[#4f8cff] text-lg"
            onPress={() => Linking.openURL("https://portfolio-six-chi-kmc4bfrxcz.vercel.app/")}
          >
            Visit Linkly Website
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


