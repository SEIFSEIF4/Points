import * as React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { View } from "./Themed";
import { usePlayer } from "@/hooks/player-context";
import { useSettings } from "@/hooks/Settings-context";

const DialogCustom = ({ visible, setVisible }: any) => {
  const hideDialog = () => setVisible(false);
  const { players, setPlayers } = usePlayer();
  const { rounds, setRounds } = useSettings();

  // const handlePointsChange = (
  //   playerIndex: number,
  //   roundIndex: number,
  //   value: string
  // ) => {
  //   setPlayers((prevPlayers) => {
  //     const updatedPlayers: any[] = [...prevPlayers];
  //     updatedPlayers[playerIndex].points[roundIndex] = parseInt(value) || 0;
  //     return updatedPlayers;
  //   });
  // };

  // const handleAddRound = () => {
  //   setRounds((prevRounds) => prevRounds + 1);
  // };

  // const renderRoundInputs = (player: any, playerIndex: number) => (
  //   <View key={playerIndex} style={styles.PlayerContainer}>
  //     <Text>{player.playerName}</Text>
  //     {Array.from({ length: rounds }, (_, roundIndex) => (
  //       <TextInput
  //         key={roundIndex}
  //         style={styles.input}
  //         placeholder={`Round ${roundIndex + 1}`}
  //         value={player.points[roundIndex].toString()}
  //         onChangeText={(text) =>
  //           handlePointsChange(playerIndex, roundIndex, text)
  //         }
  //       />
  //     ))}
  //   </View>
  // );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title className="text-xl font-bold ">
          Enter Round Points for Ev Player
        </Dialog.Title>
        <Dialog.ScrollArea>
          <View style={styles.contentContainerStyle}>
            <View style={styles.contentContainerStyle}>
              <Pressable onPress={hideDialog}>
                <Text className="text-red-500">Close</Text>
              </Pressable>
              <Pressable>
                <Text className="text-blue-500">Add Round</Text>
              </Pressable>
            </View>
          </View>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
  PlayerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    minHeight: 100,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
});

export default DialogCustom;
