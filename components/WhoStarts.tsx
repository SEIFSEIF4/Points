import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
} from "react-native-paper";
import RandomPicker from "./RandomPicker";
import { usePlayer } from "@/hooks/player-context";

const WhoStarts = ({ visible, setVisible }: any) => {
  const hideDialog = () => setVisible(false);

  const { players } = usePlayer();

  const names = players;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Who Starts</Dialog.Title>
        <Dialog.Content>
          <View className="flex items-center justify-center ">
            <RandomPicker items={names} initialChoice="katana" />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default WhoStarts;
