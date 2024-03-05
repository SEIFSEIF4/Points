import React, { useState, useEffect } from "react";
import { Button, Dialog, List } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from "react-native";
import gameData, { Props } from "../data/gameData";
import { useSettings } from "@/hooks/Settings-context";
import { usePlayer } from "@/hooks/player-context";
import DialogCustom from "./DialogCustom";

const AccordionListComponent = (props: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const { playerName, points, setPoints, players } = usePlayer();
  const { rounds, setRounds } = useSettings();

  const handlePress = (accordionTitle: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded === accordionTitle ? null : accordionTitle
    );
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const calculateTotalPoints = (playerName: string) => {
    // Replace this with your logic to calculate total points for each player
    // Example: Use points state to calculate total points for each player
    return points.reduce(
      (acc, round) => acc + round[players.indexOf(playerName)],
      0
    );
  };

  const calculateRoundResult = (playerName: string, roundIndex: number) => {
    // Replace this with your logic to calculate round result for each player
    // Example: Use points state to calculate round result for each player
    return points[roundIndex][players.indexOf(playerName)];
  };

  const handleNextRound = () => {};

  return (
    <>
      <List.Section title="Nickname" style={styles.section}>
        {players.map((playerName, index) => (
          <List.Accordion
            right={() => (
              <View style={styles.totalContainer}>
                <Text className="text-white ">
                  Total: {calculateTotalPoints(playerName)}
                </Text>
              </View>
            )}
            key={index}
            onLongPress={() => handlePress(playerName)}
            expanded={expanded === playerName}
            onPress={() => handlePress(playerName)}
            title={playerName}
            style={styles.accordion}
          >
            {points.map((round, roundIndex) => (
              <View key={roundIndex} style={styles.accordionContainer}>
                <List.Item title={`Round ${roundIndex + 1}`} />
                {/* You may want to calculate and display round result here based on your logic */}
                <List.Subheader>
                  {`Result: ${calculateRoundResult(playerName, roundIndex)}`}
                </List.Subheader>
              </View>
            ))}
          </List.Accordion>
        ))}
        <Pressable
          onPress={handleVisible}
          className="p-3 m-auto mt-10 rounded-md bg-slate-500"
        >
          <Text style={{ color: "white" }}>type points for each player</Text>
        </Pressable>
      </List.Section>
      <DialogCustom visible={visible} setVisible={setVisible} />
    </>
  );
};

export default AccordionListComponent;

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  accordion: {
    backgroundColor: "#333333",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden", // Ensure smooth transition by hiding overflow content
  },
  accordionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    marginVertical: 10,
    borderRadius: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
});
