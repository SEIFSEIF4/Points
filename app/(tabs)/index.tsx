import React from "react";
import { View } from "@/components/Themed";
import { useWindowDimensions } from "react-native";

// expo
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// logic components
import SectionPlayerList from "@/components/sections/SectionPlayerList";
import SectionControls from "@/components/sections/SectionControls";
import ProgressBarWithCircles from "@/components/ProgressBarWithCircles";

const index = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const progress = 0.3;
  const checkpoint = 5;

  return (
    <SafeAreaProvider>
      <View
        style={[{ paddingTop: insets.top + 15 }, { width }]}
        className="flex items-center justify-around flex-1 w-full min-h-screen bg-gray-800"
      >
        {/* <SectionPlayerList /> */}
        {/* <SectionControls /> */}
      </View>
    </SafeAreaProvider>
  );
};

export default index;
