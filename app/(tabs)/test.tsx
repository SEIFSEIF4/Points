import { View, Text, useWindowDimensions, Pressable } from "react-native";
import React, { useCallback, useRef } from "react";
import BottomSettings from "@/components/BottomSettings";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const test = () => {
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
    <SafeAreaProvider>
      <View
        style={[{ paddingTop: insets.top + 10 }, { width }]}
        className="relative flex items-center justify-around flex-1 w-full min-h-screen bg-gray-800"
      >
        <Pressable onPress={handleClosePress}>
          <Text className="my-8 text-xl font-bold text-white">Press me</Text>
        </Pressable>
        <Text className="my-8 text-xl font-bold text-white">
          Add players to start playing
        </Text>
        <Pressable onPress={handleExpandPress}>
          <Text className="my-8 text-xl font-bold text-white">Press me</Text>
        </Pressable>
      </View>
      <BottomSettings ref={bottomSheetRef} />
    </SafeAreaProvider>
  );
};

export default test;
