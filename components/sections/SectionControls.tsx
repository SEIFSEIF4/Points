import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

// expo
import { Link } from "expo-router";

// hooks
import { usePlayer } from "@/hooks/player-context";

// icons
import { AntDesign } from "@expo/vector-icons";
import AddPlayer from "../AddPlayer";

const SectionControls = ({ open, close }: any) => {
  const { players } = usePlayer();
  const gameStarted = false;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <View className="flex-row items-center justify-around w-full mx-4">
        <View className="flex-col gap-5">
          {players.length <= 1 ? (
            <Button
              disabled
              className="items-center justify-center px-5 bg-red-500 border-2 border-red-500 rounded-full opacity-50 w-30 h-50 "
            >
              <Text className="text-white ">Start</Text>
            </Button>
          ) : (
            <Link href="/two" asChild>
              <Pressable className="items-center justify-center px-5 bg-red-500 border-2 border-red-500 rounded-full opacity-50 w-30 h-50 ">
                <Text className="text-white">Start</Text>
              </Pressable>
            </Link>
          )}
          <Button
            disabled={!gameStarted} // if gameStarted is false, the button will be disabled
            className="items-center justify-center px-5 bg-red-500 border-2 border-red-500 rounded-full opacity-50 w-30 h-50 "
          >
            <Text className="text-white ">End Game</Text>
          </Button>
        </View>
        <View className="flex-col gap-5">
          <Pressable onPress={handleOpenDialog}>
            <AntDesign name="adduser" size={50} color="white" />
          </Pressable>
          <Pressable onPress={open}>
            <AntDesign name="setting" size={50} color="white" />
          </Pressable>
        </View>
      </View>
      <AddPlayer openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

const styles = StyleSheet.create({
  startButton: {},
  endButton: {},
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default SectionControls;
