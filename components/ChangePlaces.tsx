import { FontAwesome6 } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const ChangePlaces = ({ visible, setVisible }: any) => {
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content className="flex items-center justify-center ">
          <Text className="text-xl text-white">Change Place</Text>
          <Text className="text-white text-md">
            This is a reminder to change each other places
          </Text>
          <View className="my-5 ">
            <FontAwesome6 name="repeat" size={70} color="white" />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ChangePlaces;
