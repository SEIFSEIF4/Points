import React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { View, Text } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { usePlayerData } from "./playerFunctions";

type AddPlayerModalProps = {
  isVisible: boolean;
  playerName: string;
  setPlayerName: (name: string) => void;
  addPlayer?: (playerName: string) => void;
  closeModal: () => void;
};

const AddPlayerModal = ({
  isVisible,
  playerName,
  setPlayerName,
  closeModal,
}: AddPlayerModalProps) => {
  const addPlayer = usePlayerData();

  return (
    <Modal isVisible={isVisible} onBackButtonPress={closeModal}>
      <Text style={[AddPlayerModalStyles.title, { fontSize: 25 }]}>
        {playerName}
      </Text>
      <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
        <TextInput
          style={AddPlayerModalStyles.input}
          placeholder="Enter player name"
          value={playerName}
          onChangeText={(text) => setPlayerName(text)}
        />
        <Pressable>
          <AntDesign name="plus" size={55} color="white" />
        </Pressable>
      </View>
      <Pressable onPress={closeModal}>
        <Text style={AddPlayerModalStyles.title}>الرجوع</Text>
      </Pressable>
    </Modal>
  );
};

const MainColor = "#2f4925";
const AddPlayerModalStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "100",
    backgroundColor: MainColor,
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

export default AddPlayerModal;
