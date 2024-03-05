import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Dialog, Portal, Text, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { usePlayer } from "@/hooks/player-context";
import { View } from "./Themed";
import { addPlayer } from "./logic/playerFunctions";

type AddPlayerProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

const AddPlayer = ({ openDialog, setOpenDialog }: AddPlayerProps) => {
  const hideDialog = () => setOpenDialog(false);

  const { playerName, setPlayerName, setPlayers, players, points, setPoints } =
    usePlayer();

  const handleAddPlayer = () => {
    if (playerName.trim() !== "") {
      addPlayer(
        playerName,
        setPlayerName,
        players,
        setPlayers,
        points,
        setPoints
      );
    }
  };

  return (
    <Portal>
      <Dialog visible={openDialog} onDismiss={hideDialog}>
        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Add name of players</Text>
          <View className="flex flex-row items-center justify-between w-full">
            <TextInput
              style={styles.input}
              placeholder="Enter player name"
              value={playerName}
              onChangeText={(text) => setPlayerName(text)}
            />
            <Pressable onPress={handleAddPlayer}>
              <AntDesign name="plus" size={60} color="white" />
            </Pressable>
          </View>

          <Pressable onPress={hideDialog}>
            <Text style={styles.title}>Back</Text>
          </Pressable>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    color: "white",
    paddingLeft: 8,
  },
});

export default AddPlayer;
