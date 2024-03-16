import React, { useState, useEffect } from "react";
import { Button, Dialog, List } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from "react-native";
import { useSettings } from "@/hooks/Settings-context";
import { usePlayer } from "@/hooks/player-context";
import {
  handleNextRound,
  handleBackRound,
  calculateTotalPointsForPlayer,
  determineLoser,
  determineWinner,
} from "../utility/playerUtils";
import SetPointsDialog from "./SetPointsDialog";
import { useTimer } from "@/hooks/Timer-context";
import { Link } from "expo-router";
import EndGameDialog from "./EndGameDialog";

const AccordionListComponent = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [showPoints, setShowPoints] = React.useState(false);
  const {
    playerName,
    points,
    setPoints,
    players,
    playerRoundPoints,
    setPlayerRoundPoints,
  } = usePlayer();

  const {
    rounds,
    setRounds,
    currentRound,
    setCurrentRound,
    savedInputs,
    setSavedInputs,
    setGameStarted,
    maxPoints,
    isMaxPointsOn,
  } = useSettings();

  const { stopTimer } = useTimer();

  const handlePress = (accordionTitle: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded === accordionTitle ? null : accordionTitle
    );
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const NextRound = () => {
    handleNextRound(currentRound, rounds, setCurrentRound);
  };
  const BackRound = () => {
    handleBackRound(currentRound, setCurrentRound);
  };

  const TotalPoints = (index: number) => {
    const totalPoints = calculateTotalPointsForPlayer(
      index,
      rounds,
      savedInputs
    );
    // if (!isMaxPointsOn) return;
    if (totalPoints >= maxPoints) {
      console.log(`${players[index]} has reached ${maxPoints} points.`);
    }
    return totalPoints;
  };

  // const TotalAverage = () => {
  //   const averagePoints = calculateAveragePointsForAllPlayers(
  //     rounds,
  //     savedInputs,
  //     players
  //   );
  //   return Object.entries(averagePoints);
  // };
  // const TotalAverage = () => {
  //   const averagePoints = calculateAveragePointsForAllPlayers(
  //     rounds,
  //     savedInputs,
  //     players
  //   );
  //   return Object.entries(averagePoints).map(([average]) => (
  //     <View key={average} className="">
  //       <Text className="text-xl text-center text-white ">{`Avg:${average} .....`}</Text>
  //     </View>
  //   ));
  // };

  // const Average = () => {
  //   return calculateAveragePointsForAllPlayers(rounds, savedInputs, players);
  // };

  // const averagePointsForRound = calculateAveragePointsForRound(
  //   rounds,
  //   savedInputs
  // );

  const Loser = determineLoser(savedInputs, rounds, players);
  const Winner = determineWinner(savedInputs, rounds, players);

  // const newRoundsArray = Array.from({ length: rounds }, () => 0);
  const newRoundsArray =
    currentRound === 1
      ? [1]
      : Array.from({ length: currentRound }, (_, i) => i + 1);

  const playerPointsPerRound = players.map((player, playerIndex) => {
    return newRoundsArray.map((round) => {
      const roundPoints = savedInputs[round];
      return roundPoints ? roundPoints[playerIndex] : "?";
    });
  });

  const handleEndGame = () => {
    if (currentRound > 1) {
      handleVisible();
    }
    setGameStarted(false);
    stopTimer();
    setCurrentRound(1);
  };

  // useEffect(() => {
  //   console.log("isMaxPointsOn:", isMaxPointsOn); // Check the value of isMaxPointsOn
  //   players.forEach((player, index) => {
  //     const totalPoints = calculateTotalPointsForPlayer(
  //       index,
  //       rounds,
  //       savedInputs
  //     );
  //     if (!isMaxPointsOn) return; // Check if isMaxPointsOn is false, if so, return early
  //     if (totalPoints >= maxPoints) {
  //       console.log(`${player} has reached ${maxPoints} points.`);
  //     }
  //   });
  // }, [savedInputs, maxPoints, isMaxPointsOn]);

  console.log(isMaxPointsOn);
  return (
    <>
      <View className="flex flex-col justify-between">
        <View>
          <Text className="text-2xl text-center text-white ">
            {currentRound === rounds ? "Final Round " : "Round "}
            {`( ${currentRound} )`}
          </Text>
        </View>
        <List.Section id="section" style={[styles.section]}>
          {players.map((playerName, index) => (
            <List.Accordion
              style={[styles.accordion]}
              right={() => (
                <View>
                  <Text className="text-white ">{`Total: ${TotalPoints(
                    index
                  )}`}</Text>
                </View>
              )}
              key={index}
              onLongPress={() => handlePress(playerName)}
              expanded={expanded === playerName}
              onPress={() => handlePress(playerName)}
              title={playerName}
              id="accordion"
            >
              {newRoundsArray.map((round, roundIndex) => (
                <View key={roundIndex} style={styles.accordionContainer}>
                  <List.Item title={`Round ${round}`} />
                  <List.Subheader>{`Result: ${
                    //if the player has not played the round or enter later prev round count as 25 * round
                    playerPointsPerRound[index][roundIndex] === undefined
                      ? (playerPointsPerRound[index][roundIndex] = "25")
                      : playerPointsPerRound[index][roundIndex]
                  }`}</List.Subheader>
                </View>
              ))}
            </List.Accordion>
          ))}
        </List.Section>
        <View className="flex-row gap-3 m-auto">
          <Pressable onPress={() => setShowPoints(true)}>
            <Text className="p-2 px-4 text-white bg-gray-400 rounded-md ">
              Set Points
            </Text>
          </Pressable>
          <Link href="/(tabs)/" asChild>
            <Pressable onPress={handleEndGame}>
              <Text className="p-2 px-4 text-white bg-gray-400 rounded-md ">
                End game
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <SetPointsDialog showPoints={showPoints} setShowPoints={setShowPoints} />
      <EndGameDialog
        visible={visible}
        setVisible={setVisible}
        Loser={Loser}
        Winner={Winner}
      />
    </>
  );
};

export default AccordionListComponent;

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    gap: 15,
  },
  accordion: {
    height: 60,
    backgroundColor: "rgba(44, 44, 44, 0.632)",
  },
  accordionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    marginVertical: 10,
    borderRadius: 10,
  },
});
