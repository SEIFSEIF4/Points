import { Image } from "expo-image";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Dialog, List, Portal } from "react-native-paper";
import { ExternalLink } from "./ExternalLink";
import { AntDesign } from "@expo/vector-icons";
import { useSettings } from "@/hooks/Settings-context";

type EndGameDialogProp = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  Loser: string[] | null;
  Winner: string[] | null;
};

const EndGameDialog = ({
  visible,
  setVisible,
  Loser,
  Winner,
}: EndGameDialogProp) => {
  const hideDialog = () => setVisible(false);

  // TODO: HANDLE DRAW

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>End Game </Dialog.Title>
        <Dialog.Content>
          <View className="flex flex-col w-full gap-5 ">
            <Text className="py-3 text-white">{Winner} is the Winner</Text>
            <Text className="py-3 text-white">{Loser} is the loser</Text>
          </View>
          <Text className="text-white">Loser Should do the Punishment</Text>
        </Dialog.Content>
        <Dialog.Actions className="flex justify-between">
          <Text className="text-white">Share on</Text>
          {/* <Button onPress={hideDialog}>Done</Button> */}
          <View className="flex flex-row gap-5">
            <ExternalLink href="https://www.facebook.com/fbcameraeffects/tryit/2390874041112014/">
              <AntDesign name="facebook-square" size={28} color="white" />
            </ExternalLink>
            <ExternalLink href="https://www.facebook.com/fbcameraeffects/tryit/2390874041112014/">
              <AntDesign name="instagram" size={28} color="white" />
            </ExternalLink>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default EndGameDialog;
