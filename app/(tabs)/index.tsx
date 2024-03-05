import React, { useCallback, useRef } from "react";
import { Text, View } from "@/components/Themed";
import { Pressable, useWindowDimensions } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

// expo
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// logic components
import SectionCustomHeader from "@/components/sections/SectionCustomHeader";
import SectionPlayerList from "@/components/sections/SectionPlayerList";
import SectionControls from "@/components/sections/SectionControls";
import BottomSettings from "@/components/BottomSettings";

const index = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <View
          style={[{ paddingTop: insets.top + 10 }, { width }]}
          className="relative flex items-center justify-around flex-1 w-full min-h-screen bg-gray-800"
        >
          <SectionCustomHeader />
          <Text className="mt-8 text-xl font-bold text-white">
            Add players to start playing
          </Text>
          {/* TODO: include this inside a scrollView */}
          <SectionPlayerList />
          <SectionControls open={handleExpandPress} close={handleClosePress} />
        </View>
        <BottomSettings ref={bottomSheetRef} />
      </SafeAreaProvider>
    </>
  );
};

export default index;
