import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Dialog, Portal, Text, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { usePlayer } from "@/hooks/player-context";
import { View } from "./Themed";
import { addPlayer } from "./logic/playerFunctions";
import {
  ALERT_TYPE,
  Dialog as alertDialog,
  Toast,
} from "react-native-alert-notification";
import { useSettings } from "@/hooks/Settings-context";
import { Audio } from "expo-av";

type AddPlayerProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

const AddPlayer = ({ openDialog, setOpenDialog }: AddPlayerProps) => {
  const hideDialog = () => setOpenDialog(false);
  const [sound, setSound] = React.useState<Audio.Sound | undefined>(undefined);
  const { muted, setMuted } = useSettings();
  const {
    playerName,
    setPlayerName,
    setPlayers,
    players,
    points,
    playerRoundPoints,
    setPlayerRoundPoints,
  } = usePlayer();

  const { currentRound } = useSettings();

  const showAlertDialog = () => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Name already exists!",
      textBody: "Please enter a different name",
    });
  };
  const showMaxCharacter = () => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Max Character 12 !",
      textBody: "Please enter a shorter name",
    });
  };

  const handleAddPlayer = () => {
    const trimmedPlayerName = playerName.trim();

    if (trimmedPlayerName !== "") {
      const isDuplicate = players.some(
        (player) => player === trimmedPlayerName
      );

      if (isDuplicate) {
        showAlertDialog();
      } else {
        addPlayer(
          players,
          trimmedPlayerName,
          setPlayerName,
          setPlayers,
          playerRoundPoints,
          setPlayerRoundPoints,
          currentRound
        );
      }

      if (!muted) {
        playSound();
      }
    }
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/Pop.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  };

  React.useEffect(() => {
    return sound
      ? () => {
          (sound as Audio.Sound).unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Portal>
      <Dialog
        visible={openDialog}
        onDismiss={hideDialog}
        style={styles.container}
      >
        <Dialog.Title style={styles.title}>
          Add Players ( {players.length} )
        </Dialog.Title>
        <Dialog.Content>
          <View className="flex flex-row items-center justify-between w-full gap-3 ">
            <TextInput
              style={styles.input}
              placeholder="Player Name"
              value={playerName}
              onChangeText={(text) => {
                if (text.length <= 12) {
                  setPlayerName(text);
                } else {
                  showMaxCharacter();
                }
              }}
              maxLength={13}
            />
            <Pressable onPress={handleAddPlayer}>
              <AntDesign name="plus" size={60} color="white" />
            </Pressable>
          </View>

          <View className="flex items-center justify-center mt-5 ">
            <Pressable onPress={hideDialog}>
              <Text style={styles.button}>Back</Text>
            </Pressable>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderColor: "rgba(255, 255, 255, 0.835)",
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 25,
    textAlign: "center",
    borderRadius: 10,
    width: "100%",
    margin: "auto",
    color: "white",
  },
});

export default AddPlayer;
