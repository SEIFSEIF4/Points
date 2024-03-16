import * as React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { View } from "./Themed";
import { useSettings } from "@/hooks/Settings-context";
import { usePlayer } from "@/hooks/player-context";
import { isEmpty, hasErrors } from "../utility/helpers";
import { handleNextRound } from "@/utility/playerUtils";
import ChangePlaces from "./ChangePlaces";
import { FontAwesome6 } from "@expo/vector-icons";

const SetPointsDialog = ({ showPoints, setShowPoints }: any) => {
  const hideDialog = () => setShowPoints(false);
  const [inputWidth, setInputWidth] = React.useState(30);
  const [visible, setVisible] = React.useState(false);

  const {
    currentRound,
    rounds,
    setCurrentRound,
    setSavedInputs,
    savedInputs,
    isChangePlacesOn,
    modeDouble,
    setModeDouble,
  } = useSettings();
  const { players, playerRoundPoints, setPlayerRoundPoints, setPlayers } =
    usePlayer();
  const [showDouble, setShowDouble] = React.useState(
    Array(players.length).fill(true)
  );

  const handleFocus = () => {
    setInputWidth(60);
  };

  const handleBlur = () => {
    setInputWidth(30);
  };

  const NextRound = () => {
    handleNextRound(currentRound, rounds, setCurrentRound);
  };

  const areInputsEmpty = (playerRoundPoints: any) => {
    return playerRoundPoints.some((points: any) => points.trim() === "");
  };

  const handlePointsChange = (playerIndex: number, value: string) => {
    // Remove leading zeros and non-digit characters
    const trimmedValue = value.replace(/^0+(?=[1-9])/, "").replace(/\D/g, "");

    // Limit the value to a maximum of 3 characters
    const limitedValue = trimmedValue.slice(0, 3);

    // Convert the value to an integer
    const intValue = parseInt(limitedValue) || "";

    // Update the state
    setPlayerRoundPoints((prevPoints) => {
      const updatedPoints: string[] = [...prevPoints];
      updatedPoints[playerIndex] = intValue?.toString();
      return updatedPoints;
    });
  };

  const createHandleSave = (
    currentRound: number,
    playerRoundPoints: string[],
    setSavedInputs: any,
    setPlayerRoundPoints: any,
    NextRound: () => void,
    players: string[]
  ): (() => void) => {
    return (): void => {
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
      setSavedInputs((prevInputs: any) => ({
        ...prevInputs,
        [currentRound]: [...playerRoundPoints],
      }));

      // Clear the inputs for the next round
      setPlayerRoundPoints(Array.from({ length: players.length }, () => ""));

      // Increment the current round
      NextRound();
      hideDialog();

      let middleRound = Math.floor(rounds / 2);

      if (isChangePlacesOn && currentRound === middleRound + 1) {
        setVisible(true);
      }
    };
  };

  // Usage
  const handleSave = createHandleSave(
    currentRound,
    playerRoundPoints,
    setSavedInputs,
    setPlayerRoundPoints,
    NextRound,
    players
  );

  // React.useEffect(() => {

  //   setPlayers((prevPlayers) => {
  //     const newPlayer = Array.from(
  //       { length: players.length },
  //       (_, index) => prevPlayers[index] || ""
  //     );
  //     return newPlayer;
  //   });
  // }, [players]);

  const consoleLogPlayer = (setPlayerRoundPoints: any) => {
    const updatedPlayerRoundPoints = [...playerRoundPoints];
    console.log(updatedPlayerRoundPoints, "updatedPlayerRoundPoints");
    return updatedPlayerRoundPoints;
  };

  return (
    <>
      <Portal>
        <Dialog visible={showPoints} onDismiss={hideDialog}>
          <Dialog.Title className="text-center">
            {`Round  ${currentRound} / ${rounds}`}
          </Dialog.Title>
          <Dialog.Content>
            <View className="flex flex-row justify-between ">
              <Text className="text-xl font-bold">Players</Text>
              <Text className="text-xl font-bold">Points</Text>
            </View>
          </Dialog.Content>
          <Dialog.ScrollArea style={{ maxHeight: "50%" }}>
            <ScrollView>
              {players.map((playerName, index) => (
                <View
                  key={index}
                  className="flex flex-row items-center justify-between py-3"
                >
                  <Text>{`${index + 1} - ${playerName}`}</Text>
                  <View className="flex flex-row-reverse">
                    <TextInput
                      keyboardType="numeric"
                      mode="outlined"
                      value={playerRoundPoints[index]}
                      onChangeText={(text) => handlePointsChange(index, text)}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{
                        height: 30,
                        width: inputWidth,
                      }}
                    />

                    <TouchableOpacity
                      key={index}
                      style={{ display: showDouble[index] ? "flex" : "none" }}
                      className="flex justify-center mx-3 align-middle"
                      onPress={() => {
                        if (!playerRoundPoints[index]) {
                          return alert("Please enter the points first");
                        }
                        const updatedPoints = [...playerRoundPoints];
                        updatedPoints[index] = (
                          parseInt(updatedPoints[index]) * 2
                        ).toString();
                        setPlayerRoundPoints(updatedPoints);

                        // if (modeDouble) {
                        setShowDouble(Array(players.length).fill(false));
                        // }
                        setShowDouble((prevState) => {
                          const newState = [...prevState];
                          newState[index] = true; // Show only the pressed button
                          return newState;
                        });
                      }}
                      onLongPress={() =>
                        setShowDouble(Array(players.length).fill(true))
                      }
                    >
                      <Text>
                        <FontAwesome6
                          name="draft2digital"
                          size={24}
                          color="blue"
                        />
                      </Text>
                    </TouchableOpacity>

                    <View>
                      <HelperText
                        className={!isEmpty(playerRoundPoints) ? "hidden" : ""}
                        type="error"
                        visible={isEmpty(playerRoundPoints)}
                      >
                        Points are required
                      </HelperText>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <Button
              className="w-full px-2 m-auto text-white bg-gray-400 rounded-md"
              onPress={handleSave}
            >
              <Text>Next</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ChangePlaces visible={visible} setVisible={setVisible} />
    </>
  );
};

export default SetPointsDialog;
