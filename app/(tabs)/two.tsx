import React from "react";
import { Pressable, ScrollView, useWindowDimensions } from "react-native";

import { Text, View } from "@/components/Themed";
import SectionCustomHeader from "@/components/sections/SectionCustomHeader";

// expo
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AccordionListComponent from "@/components/Accordion";
import { ImageBackground } from "expo-image";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <View
        style={[{ paddingTop: insets.top + 10 }, { width }]}
        className="relative flex items-center justify-around flex-1 w-full min-h-screen bg-gray-800"
      >
        <ImageBackground
          source={require("../../assets/images/patern.png")}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            transform: [{ scale: 1.5 }, { rotate: "170deg" }],
            opacity: 0.1,
          }}
        />
        <SectionCustomHeader />
        <ScrollView
          style={{ width: width, marginTop: 50 }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: width - 25 }}>
            <AccordionListComponent />
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}
