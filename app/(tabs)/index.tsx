import React, { useCallback, useRef } from "react";
import { Text, View } from "@/components/Themed";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

// expo
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

//  components
import SectionCustomHeader from "@/components/sections/SectionCustomHeader";
import SectionPlayerList from "@/components/sections/SectionPlayerList";
import SectionControls from "@/components/sections/SectionControls";
import BottomSettings from "@/components/BottomSettings";
import { usePlayer } from "@/hooks/player-context";

const index = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { players } = usePlayer();

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
          <View>
            <Text className="mt-8 text-xl font-bold text-center text-white ">
              {players.length >= 2
                ? `You can Start a Game Now`
                : "Add players to start Playing"}
            </Text>
            <Text className="mt-1 text-center text-white text-md">
              {players.length >= 6
                ? `Play with Two Deck of Card to for More Fun`
                : ""}
            </Text>
          </View>
          <SectionPlayerList />
          <SectionControls open={handleExpandPress} close={handleClosePress} />
        </View>

        <BottomSettings ref={bottomSheetRef} />
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default index;
