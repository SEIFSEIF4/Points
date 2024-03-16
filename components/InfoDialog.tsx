import { Image } from "expo-image";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Dialog, List, Portal } from "react-native-paper";

type InfoDialogProp = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const InfoDialog = ({ visible, setVisible }: InfoDialogProp) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Rules</Dialog.Title>
        <Dialog.Content>
          <View className="flex flex-row ">
            {/* <Image
              source={require("../assets/images/setting-Img/rounds.png")}
              contentFit="contain"
              style={{ width: 24, height: 24 }}
            /> */}
            <Text className="py-3 text-white">
              Round: Number of rounds players want to play.
            </Text>
          </View>
          <Text className="py-3 text-white">
            {/* <Image
              source={require("../assets/images/setting-Img/changePlaces.png")}
              contentFit="contain"
              style={{ width: 24, height: 24 }}
            /> */}
            Change Places: Reminder to switch positions between players.
          </Text>
          <Text className="py-3 text-white">
            {/* <Image
              source={require("../assets/images/setting-Img/changePlaces.png")}
              contentFit="contain"
              style={{ width: 24, height: 24 }}
            /> */}
            Max Points: The maximum limit of points a player can reach before
            losing.
          </Text>
          <Text className="py-3 text-white">
            {/* <Image
              source={require("../assets/images/setting-Img/changePlaces.png")}
              contentFit="contain"
              style={{ width: 24, height: 24 }}
            /> */}
            Who Starts: Player selection to begin the game.
          </Text>
          <Text className="py-3 text-white">
            {/* <Image
              source={require("../assets/images/setting-Img/changePlaces.png")}
              contentFit="contain"
              style={{ width: 24, height: 24 }}
            /> */}
            Time per Round: Duration of each
          </Text>
        </Dialog.Content>
        <Dialog.Actions className="flex justify-center">
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default InfoDialog;
