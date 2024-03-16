import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { Image } from "expo-image";
import { useSettings } from "@/hooks/Settings-context";
import { useTimer } from "@/hooks/Timer-context";
import EndGameDialog from "./EndGameDialog";
import { determineLoser, determineWinner } from "@/utility/playerUtils";
import { usePlayer } from "@/hooks/player-context";

type TimerDialogProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const TimerDialog = ({ visible, setVisible }: TimerDialogProps) => {
  const [show, setShow] = useState(false);
  const [visibleEndGameDialog, setVisibleEndGameDialog] = useState(false);

  const hideDialog = () => setVisible(false);
  const handleVisible = () => setVisibleEndGameDialog(true);

  const {
    currentRound,
    rounds,
    gameStarted,
    setGameStarted,
    setCurrentRound,
    savedInputs,
  } = useSettings();
  const {
    time,
    timeValue,
    formatTime,
    startTimer,
    stopTimer,
    timerRunning,
    restartTimer,
    addExtraTime,
  } = useTimer();
  const { players } = usePlayer();

  const handleEndGame = () => {
    if (currentRound > 1) {
      setVisibleEndGameDialog(true);
    }
    // restartTimer();
    setCurrentRound(1);
    setGameStarted(false);
  };

  const Loser = determineLoser(savedInputs, rounds, players);
  const Winner = determineWinner(savedInputs, rounds, players);

  useEffect(() => {
    console.log("visibleEndGameDialogEffect:", visibleEndGameDialog);
  }, [visibleEndGameDialog]);
  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <View className="flex flex-row justify-between">
            <Dialog.Content className="text-center">
              <Text className="text-white text-">
                {timeValue <= 0 ? "Time is up" : "Time remaining"}
              </Text>
            </Dialog.Content>
            <Dialog.Content className="text-center">
              <Text
                className={
                  currentRound === rounds
                    ? "text-red-500 text-md"
                    : "text-white text-md"
                }
              >
                {timerRunning && `Round  ( ${currentRound} )`}
              </Text>
            </Dialog.Content>
          </View>
          <Dialog.Content>
            <View className="py-5">
              {timeValue <= 0 ? (
                <View className="flex flex-col justify-center">
                  <Image
                    source={require("@/assets/images/alarm.gif")}
                    style={{ width: "100%", height: 200 }}
                    contentFit="contain"
                  />

                  <View className="flex flex-row justify-around w-full mt-5">
                    <Button
                      // disabled={gameStarted === false}
                      onPress={handleEndGame}
                    >
                      End Game
                    </Button>
                    <Button onPress={() => setShow(!show)}>
                      {show ? "Hide" : "Add Time"}
                    </Button>
                  </View>
                </View>
              ) : (
                <View className="my-3">
                  <Text
                    className={
                      "w-full text-center min-h-20 text-8xl " +
                      (timeValue > 30 ? "text-white" : "text-red-500")
                    }
                  >
                    {formatTime(timeValue)}
                  </Text>
                </View>
              )}
            </View>
          </Dialog.Content>
          <Dialog.Actions className="flex justify-center">
            <View
              className={`flex flex-row justify-around w-full mt-5 ${
                show ? "" : "hidden"
              }`}
            >
              <Button onPress={() => addExtraTime(1)}>1 min</Button>
              <Button onPress={() => addExtraTime(3)}>3 min</Button>
              <Button onPress={() => addExtraTime(5)}>5 min</Button>
            </View>
          </Dialog.Actions>
          <Dialog.Actions className="flex justify-center">
            <Button onPress={startTimer}>Start</Button>
            <Button onPress={stopTimer}>Pause</Button>
            <Button onPress={restartTimer}>Restart</Button>
            <Button onPress={() => setShow(!show)}>
              {show ? "Hide" : "Add Time"}
            </Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <EndGameDialog
        visible={visibleEndGameDialog}
        setVisible={setVisibleEndGameDialog}
        Loser={Loser}
        Winner={Winner}
      />
    </>
  );
};

export default TimerDialog;
