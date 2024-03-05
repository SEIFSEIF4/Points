import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Switch, TextInput } from "react-native-paper";
import { useSettings } from "@/hooks/Settings-context";
import { AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";

const BottomSheetControls = () => {
  const {
    maxPoints,
    setMaxPoints,
    rounds,
    setRounds,
    time,
    setTime,
    isLoserOn,
    setIsLoserOn,
    isWhoSTartOn,
    setIsWhoSTartOn,
    isChangePlacesOn,
    setIsChangePlacesOn,
  } = useSettings();

  return (
    <>
      <View
        id="MaxPoints"
        className="flex flex-row items-center justify-between p-10 bg-gray-800"
      >
        <View style={styles.container}>
          <AntDesign name="star" size={24} color="white" />
          <Text className="text-white">Max Points</Text>
        </View>
        <TextInput
          mode="outlined"
          label="Max Points"
          placeholder="150"
          style={styles.input}
          value={maxPoints.toString()}
          onChange={(e) => setMaxPoints(parseInt(e.nativeEvent.text))}
        />
      </View>
      <View
        id="Rounds"
        className="flex flex-row items-center justify-between p-10 bg-gray-800"
      >
        <Text className="text-white">Rounds</Text>
        <TextInput
          mode="outlined"
          label="Rounds"
          placeholder="5"
          style={styles.input}
          value={rounds.toString()}
          onChange={(e) => setRounds(parseInt(e.nativeEvent.text))}
        />
      </View>
      <View
        id="TIME PER ROUND"
        className="flex flex-row items-center justify-between p-10 bg-gray-800"
      >
        <Text className="text-white">Time Per Round</Text>
        <TextInput
          mode="outlined"
          label="TPR"
          placeholder="5 min"
          style={styles.input}
          value={time.toString()}
          onChange={(e) => setTime(parseInt(e.nativeEvent.text))}
        />
      </View>
      <View
        id="Losers "
        className="flex flex-row items-center justify-between p-10 bg-gray-800"
      >
        <Text className="text-white">Loser Every Round</Text>
        <Switch
          value={isLoserOn}
          onValueChange={() => setIsLoserOn(!isLoserOn)}
        />
      </View>
      <View
        id="who starts"
        className="flex flex-row items-center justify-between p-10 bg-gray-800"
      >
        <Text className="text-white">Who Starts</Text>
        <Switch
          value={isWhoSTartOn}
          onValueChange={() => setIsWhoSTartOn(!isWhoSTartOn)}
        />
      </View>
      <View
        id="change place"
        className="flex flex-row items-center justify-between p-10 bg-gray-800"
      >
        <Text className="text-white">Change Places</Text>
        <Switch
          value={isChangePlacesOn}
          onValueChange={() => setIsChangePlacesOn(!isChangePlacesOn)}
        />
      </View>
      <View className="flex flex-row items-center justify-around my-5">
        {/* <Pressable style={styles.button} onPress={save}> */}
        <Pressable style={styles.button}>
          <Text>Save</Text>
        </Pressable>
        {/* <Pressable style={styles.button} onPress={reset}> */}
        <Pressable style={styles.button}>
          <Text>Reset</Text>
        </Pressable>
      </View>
    </>
  );
};

export default BottomSheetControls;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 30,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
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
