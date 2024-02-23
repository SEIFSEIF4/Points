import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { Pressable, StyleSheet } from "react-native";

// expo
import { Link } from "expo-router";

// hooks
import { usePlayer } from "@/hooks/player-context";

// logic components
import AddPlayerModal from "@/components/logic/AddPlayerModal";

// icons
import { AntDesign } from "@expo/vector-icons";
import { ProgressBar, MD3Colors } from "react-native-paper";

const SectionControls = () => {
  const { players } = usePlayer();

  const [playerName, setPlayerName] = useState<string>("");
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  return (
    <>
      <AddPlayerModal
        isVisible={isOverlayVisible}
        playerName={playerName}
        setPlayerName={setPlayerName}
        // addPlayer={addPlayer}
        closeModal={() => setIsOverlayVisible(false)}
      />
      <View className="flex-row items-center justify-around w-full h-10 mx-4 my-5">
        {players.length <= 1 ? (
          <View className="items-center justify-center rounded-full opacity-50 w-30 h-50">
            <Text className="text-white ">التالى</Text>
          </View>
        ) : (
          <Link href="/two" asChild>
            <Pressable className="items-center justify-center bg-black rounded-full w-30 h-50">
              <Text className="text-white"> التالى</Text>
            </Pressable>
          </Link>
        )}

        <Pressable onPress={() => setIsOverlayVisible(!isOverlayVisible)}>
          <AntDesign name="adduser" size={55} color="white" />
        </Pressable>
        {/* <ProgressBar progress={0.5} color={MD3Colors.error50} /> */}
      </View>
    </>
  );
};

export default SectionControls;
