import React from "react";
import { Text, View } from "@/components/Themed";
import { Pressable, useWindowDimensions } from "react-native";

// expo
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// logic components
import SectionPlayerList from "@/components/sections/SectionPlayerList";
import SectionControls from "@/components/sections/SectionControls";

import SectionCustomHeader from "@/components/sections/SectionCustomHeader";

const index = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <View
        style={[{ paddingTop: insets.top + 15 }, { width }]}
        className="relative flex items-center justify-around flex-1 w-full min-h-screen bg-gray-800"
      >
        <SectionCustomHeader />
        <SectionPlayerList />
        <SectionControls />
      </View>
    </SafeAreaProvider>
  );
};

export default index;
