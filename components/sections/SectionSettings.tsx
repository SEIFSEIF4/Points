import React from "react";
import { View, Text } from "@/components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { TextInput, Switch } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import useSetting from "@/hooks/SettingsReduce";

const SectionSettings = () => {
  // const { state, reset, save, setState } = useSetting(initialState);

  return (
    <View className="flex flex-1 px-8 py-4 bg-slate-500">
      <Text className="text-2xl font-bold text-white">Settings</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  input: {
    width: "30%",
    overflow: "hidden",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
});

export default SectionSettings;
