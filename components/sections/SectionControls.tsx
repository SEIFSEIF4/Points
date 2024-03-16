import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

// expo
import { Link } from "expo-router";

// hooks
import { usePlayer } from "@/hooks/player-context";

// icons
import { AntDesign } from "@expo/vector-icons";
import AddPlayer from "../AddPlayer";
import { useSettings } from "@/hooks/Settings-context";
import { useTimer } from "@/hooks/Timer-context";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import WhoStarts from "../WhoStarts";

const SectionControls = ({ open, close }: any) => {
  const { players } = usePlayer();
  const {
    gameStarted,
    setSavedInputs,
    setCurrentRound,
    setGameStarted,
    isWhoStartOn,
    isTimerOn,
    setITimerOn,
  } = useSettings();
  const [openDialog, setOpenDialog] = useState(false);
  const [visible, setVisible] = useState(false);
  const { time, restartTimer, setTimeValue, startTimer, stopTimer } =
    useTimer();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleStartGame = () => {
    setSavedInputs([]);
    setGameStarted(true);
    if (isTimerOn) {
      startTimer();
    }
    if (isWhoStartOn) {
      setVisible(true);
    }
  };

  const handleEndGame = () => {
    setGameStarted(false);
    restartTimer();
    setSavedInputs([]);
    setCurrentRound(1);
  };

  const IconComponent = () => (
    <AntDesign name="adduser" size={30} color="white" />
  );

  const showAlertDialog = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Add Players",
      textBody: (
        <>
          <Text>Add at least 2 players using this Icon </Text>
          <IconComponent />
        </>
      ),
      button: "Ok",
    });
  };

  return (
    <>
      <View className="flex-row items-center justify-around w-full mx-4">
        <View className="flex-col gap-5">
          {players.length <= 1 || gameStarted ? (
            <Link href="/(tabs)/two">
              <Pressable
                onPress={showAlertDialog}
                disabled={gameStarted}
                style={styles.startButton}
                className={`${gameStarted ? "opacity-40" : ""}`}
              >
                <Text className="text-center text-white ">
                  {gameStarted ? "Continue" : "Start"}
                </Text>
              </Pressable>
            </Link>
          ) : (
            <Link
              push
              href="/(tabs)/two"
              asChild
              className="text-center"
              style={styles.startButton}
              onPress={handleStartGame}
            >
              <Text className="text-center text-white ">Start</Text>
            </Link>
          )}
          <Pressable
            onPress={handleEndGame}
            disabled={!gameStarted}
            style={styles.endButton}
            className={`${gameStarted ? "opacity-100" : "opacity-40"}`}
          >
            <Text className="text-center text-white ">End Game</Text>
          </Pressable>
        </View>
        <View className="flex-col gap-5">
          <Pressable onPress={handleOpenDialog}>
            <AntDesign name="adduser" size={50} color="white" />
          </Pressable>

          <Pressable
            onPress={open}
            disabled={gameStarted}
            className={`${gameStarted ? "opacity-40" : "opacity-100"}`}
            // onLongPress={alert("game started cannot change settings")}
          >
            <AntDesign name="setting" size={50} color="white" />
          </Pressable>
        </View>
      </View>
      <AddPlayer openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <WhoStarts visible={visible} setVisible={setVisible} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.835)",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 150,
    textAlign: "center",
    borderRadius: 20,
  },
  endButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.835)",
    borderWidth: 1,
    paddingVertical: 15,
    width: 150,
    paddingHorizontal: 25,
    textAlign: "center",
    borderRadius: 20,
  },
});

export default SectionControls;
