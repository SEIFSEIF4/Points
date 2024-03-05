import * as React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  Button,
  Dialog,
  Divider,
  HelperText,
  Portal,
  Text,
} from "react-native-paper";
import { View } from "./Themed";
import { usePlayer } from "@/hooks/player-context";
import { useSettings } from "@/hooks/Settings-context";
import { isEmpty, hasErrors } from "../utility/helpers";

const DialogCustom = ({ visible, setVisible }: any) => {
  const hideDialog = () => setVisible(false);
  const { players, setPlayers } = usePlayer();
  const { rounds, setRounds, currentRound, setCurrentRound, roundsArray } =
    useSettings();
  const [savedInputs, setSavedInputs] = React.useState<string[][]>([]);
  const [playerRoundPoints, setPlayerRoundPoints] = React.useState<string[]>(
    []
  );

  const handlePointsChange = (playerIndex: number, value: string) => {
    // Remove leading zeros
    const trimmedValue = value.replace(/^0+/, "");

    // Limit the value to a maximum of 3 characters
    const limitedValue = trimmedValue.slice(0, 3);

    // Convert the value to an integer
    const intValue = parseInt(limitedValue) || "";

    // Update the state
    setPlayerRoundPoints((prevPoints) => {
      const updatedPoints: string[] = [...prevPoints];
      updatedPoints[playerIndex] = intValue.toString();
      return updatedPoints;
    });
  };

  const handleSave = () => {
    // Find the indices of empty playerRoundPoints values
    const emptyIndices = playerRoundPoints.reduce(
      (indices: number[], value: string, index: number) =>
        value === "" ? [...indices, index] : indices,
      []
    );

    // Check if there are any empty inputs
    if (emptyIndices.length > 0) {
      // Handle the case where at least one input is empty
      // show an error message or take appropriate action
      alert(
        `Please fill in all the points for player(s) Number : ${emptyIndices
          .map((index) => players[index])
          .join(", ")}`
      );
      return;
    }

    // Save the inputs for the current round
    setSavedInputs((prevInputs) => ({
      ...prevInputs,
      [currentRound]: [...playerRoundPoints],
    }));

    // Clear the inputs for the next round
    if (currentRound === rounds) return;
    setPlayerRoundPoints(Array.from({ length: players.length }, () => ""));

    // Increment the current round
    handleNextRound();
  };

  const calculateTotalPointsForPlayer = (playerIndex: number) => {
    let totalPoints = 0;

    for (let round = 1; round <= rounds; round++) {
      const roundPoints = savedInputs[round]?.[playerIndex];
      totalPoints += parseInt(roundPoints) || 0;
    }

    return totalPoints;
  };

  const determineLoser = () => {
    // Check if there are enough saved inputs to determine a Loser
    if (savedInputs.length < rounds) return null;

    const totalPoints = players.map((_, index) =>
      calculateTotalPointsForPlayer(index)
    );
    const maxPoints = Math.max(...totalPoints);

    // Find all players with the maximum points
    const loserIndices = totalPoints.reduce(
      (loser: number[], points: number, index: number) =>
        points === maxPoints ? [...loser, index] : loser,
      []
    );

    // Return an array of loser or null if no loser
    return loserIndices.length > 0
      ? loserIndices.map((index) => players[index])
      : null;
  };

  const handleBackRound = () => {
    if (currentRound === 1) return;
    setCurrentRound((prevRound) => prevRound - 1);
  };
  const handleNextRound = () => {
    if (currentRound === rounds) return;
    setCurrentRound((prevRound) => prevRound + 1);
  };

  const handleClear = () => {
    setSavedInputs([]);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content className="flex flex-row justify-between">
          <View>
            <Text className="text-2xl font-bold ">
              Round Points for Ev Player
            </Text>
          </View>
          <View>
            <Text className="text-2xl font-bold ">{`Round ${currentRound} of ${rounds}`}</Text>
          </View>
        </Dialog.Content>
        <ScrollView horizontal>
          <View style={styles.contentContainerStyle}>
            {/* {players.map((player, index) => renderRoundInputs(player, index))} */}
            <View style={styles.PlayerContainer}>
              {players.map((player, index) => (
                <View className="items-center p-3 align-middle border-2 border-white ">
                  <View key={index}>
                    <Text className="text-xl font-bold text-white ">
                      {player}
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      key={index}
                      keyboardType="numeric"
                      placeholder="Enter Points"
                      style={styles.input}
                      value={playerRoundPoints[index]}
                      onChangeText={(text) => handlePointsChange(index, text)}
                    />
                    <View className={currentRound === rounds ? "hidden" : ""}>
                      <HelperText
                        className={!isEmpty(playerRoundPoints) ? "hidden" : ""}
                        type="error"
                        visible={isEmpty(playerRoundPoints)}
                      >
                        Points are required
                      </HelperText>
                      <HelperText
                        type="error"
                        visible={hasErrors(
                          playerRoundPoints[index],
                          playerRoundPoints
                        )}
                      >
                        Invalid points value
                      </HelperText>
                    </View>
                  </View>
                  <View className="flex flex-col">
                    {roundsArray.map((round: any, roundIndex: number) => (
                      <View
                        key={roundIndex}
                        className="flex flex-row justify-between p-3 gap-x-24"
                      >
                        <View className="text-white">
                          <Text>{`Round ${round + 1} :`}</Text>
                        </View>
                        <View className="text-white">
                          {savedInputs[round + 1]?.[index] !== undefined ? (
                            <Text>{savedInputs[round + 1]?.[index]}</Text>
                          ) : roundIndex + 1 === currentRound ? (
                            <Text>{playerRoundPoints[index]}</Text>
                          ) : roundIndex + 1 > currentRound ? (
                            <Text>?</Text>
                          ) : null}
                        </View>
                      </View>
                    ))}
                  </View>
                  <Text className="p-3">
                    Total Points: {calculateTotalPointsForPlayer(index)}
                  </Text>
                  <Text className="p-3">
                    Loser is: {determineLoser()?.join(" And ")}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <Dialog.Actions className="m-auto ">
          <Button onPress={hideDialog}>
            <Text>cancel</Text>
          </Button>
          <Button
            onPress={handleSave}
            disabled={currentRound > rounds}
            className={
              currentRound === rounds
                ? "pointer-events-none bg-red-400 cursor-not-allowed "
                : ""
            }
          >
            <Text>save</Text>
          </Button>
          <Button onPress={handleClear}>
            <Text>clear</Text>
          </Button>
          <Button onPress={handleBackRound}>
            <Text>back</Text>
          </Button>
          <Button onPress={handleNextRound}>
            <Text>next</Text>
          </Button>
          <Text>{currentRound}</Text>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 10,
    minHeight: 300,
  },
  PlayerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
  PlayerName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  PlayerInputPoints: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DialogCustom;
