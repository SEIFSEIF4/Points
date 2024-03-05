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

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <View
        style={[{ paddingTop: insets.top + 15 }, { width }]}
        className="relative flex items-center justify-around flex-1 w-full min-h-screen bg-gray-800"
      >
        <ScrollView
          style={{ width: width, paddingTop: 50 }}
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
