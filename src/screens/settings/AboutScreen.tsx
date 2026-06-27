import { View, Text, ScrollView, Linking } from "react-native";
import React from "react";
import Header from "../../components/layout/Header";

export default function AboutScreen() {
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
          <Header currentScreenName={"About Linkly"} />
        </View>
        <View className="mb-10 gap-3">
          <Text className={headingTextStyle}>About Linkly</Text>
          <Text className={paragraphTextStyle}>Version 1.0.0</Text>
          <Text className={paragraphTextStyle}>
            Welcome. If you're exploring this page, you're probably curious
            about what this app really is beyond the QR screen.
          </Text>
          <Text className={paragraphTextStyle}>
            This project was built intentionally — not as “just another app,”
            but as a focused solution to a small, real-world friction point.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>What This App Does</Text>
          <Text className={paragraphTextStyle}>
            Linkly is an offline-first profile sharing app that lets you share
            exactly what you choose using a simple QR code and a camera.
          </Text>
          <Text className={paragraphTextStyle}>
            Instead of typing usernames, spelling email addresses twice, or
            saying “I’ll send it later,” someone can scan once and instantly
            preview the links you’ve selected — whether that’s WhatsApp, email,
            portfolio, or social profiles.
          </Text>
          <Text className={paragraphTextStyle}>
            It’s designed for real-world moments like networking events,
            interviews, meetings, or business interactions — where speed and
            clarity matter more than extra features.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Why This Exists</Text>
          <Text className={paragraphTextStyle}>
            The idea was inspired by how seamless UPI payments have become —
            scan, confirm, done. If money can move that effortlessly, sharing
            professional identity should be just as simple.
          </Text>
          <Text className={paragraphTextStyle}>
            This project was also built as a serious portfolio piece — not just
            to demonstrate technical skills, but to show product thinking,
            architectural clarity, and long-term maintainability.
          </Text>
          <Text className={paragraphTextStyle}>
            And yes — typing Instagram handles in 2026 feels slightly outdated.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>The Vision Behind It</Text>
          <Text className={paragraphTextStyle}>
            This app doesn’t try to replace LinkedIn, WhatsApp, Instagram, or
            any existing social platform.
          </Text>
          <Text className={paragraphTextStyle}>
            Instead, it acts as a controlled bridge — allowing you to share only
            what’s relevant in a specific context.
          </Text>
          <Text className={paragraphTextStyle}>
            Meeting an HR manager? Share just your email and portfolio.
          </Text>
          <Text className={paragraphTextStyle}>
            Running a business? Share Instagram and WhatsApp only.
          </Text>
          <Text className={paragraphTextStyle}>
            No oversharing. No noise. No awkward “wait, which one should I
            send?”
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Privacy & Security</Text>
          <Text className={paragraphTextStyle}>
            There is no tracking, no background analytics, and no hidden data
            collection.
          </Text>
          <Text className={paragraphTextStyle}>
            The app does not store personal information on external servers.
            What you share stays on your device unless explicitly chosen
            otherwise.
          </Text>
          <Text className={paragraphTextStyle}>
            The principle is simple: profile sharing should not require
            surveillance.
          </Text>
        </View>
        <View className={sectionStyle}>
          <Text className={headingTextStyle}>Connect</Text>
          <Text className={paragraphTextStyle}>
            I designed and developed this project end-to-end — from architecture
            to UI — with clarity, structure, and long-term maintainability in
            mind.
          </Text>
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


