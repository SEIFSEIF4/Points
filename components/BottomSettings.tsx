import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { Switch, TextInput } from "react-native-paper";
import { useSettings } from "@/hooks/Settings-context";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export type Ref = BottomSheetModal;

const BottomSettings = forwardRef<Ref>((prop, ref: any) => {
  const snapPoints = useMemo(() => ["55%", "75%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  const handleClose = () => {
    ref.current?.close();
  };

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
    reset,
  } = useSettings();

  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: "black" }}
      >
        <BottomSheetView className="flex flex-1 p-4">
          <View id="MaxPoints" style={styles.singleSettingContainer}>
            <View style={styles.container}>
              <AntDesign name="star" size={24} color="black" />
              <Text className="text-black">Max Points</Text>
            </View>
            <Picker
              selectedValue={maxPoints}
              style={{ height: 50, width: 100, color: "white" }}
              onValueChange={(itemValue) => setMaxPoints(itemValue)}
            >
              <Picker.Item label="50" value={50} />
              <Picker.Item
                label="150  - MaxPoints to Lose the Game"
                value={150}
              />
              <Picker.Item
                label="250  - MaxPoints to Lose the Game"
                value={250}
              />
            </Picker>
          </View>
          <View id="Rounds" style={styles.singleSettingContainer}>
            <Text className="text-black">Rounds</Text>

            <Picker
              selectedValue={rounds}
              style={{ height: 50, width: 100, color: "white" }}
              onValueChange={(itemValue) => setRounds(itemValue)}
            >
              <Picker.Item label="3 - Rounds For Game to Finish" value={3} />
              <Picker.Item label="5 - Rounds For Game to Finish" value={5} />
              <Picker.Item label="8 - Rounds For Game to Finish" value={8} />
            </Picker>
          </View>
          <View id="TIME PER ROUND" style={styles.singleSettingContainer}>
            <Text className="text-black">Time Per Round</Text>

            <Picker
              selectedValue={time}
              style={{ height: 50, width: 100, color: "white" }}
              onValueChange={(itemValue) => setTime(itemValue)}
            >
              <Picker.Item label="3 - Minutes Per Round" value={3} />
              <Picker.Item label="5 - Minutes Per Round" value={5} />
              <Picker.Item label="8 - Minutes Per Round" value={8} />
            </Picker>
          </View>
          <View id="who starts" style={styles.singleSettingContainer}>
            <Text className="text-black">Who Starts</Text>
            <Switch
              value={isWhoSTartOn}
              onValueChange={() => setIsWhoSTartOn(!isWhoSTartOn)}
            />
          </View>
          <View id="Losers " style={styles.singleSettingContainer}>
            <Text className="text-black">Loser Every Round</Text>
            <Switch
              value={isLoserOn}
              onValueChange={() => setIsLoserOn(!isLoserOn)}
            />
          </View>
          <View id="change place" style={styles.singleSettingContainer}>
            <Text className="text-black">Change Places</Text>
            <Switch
              value={isChangePlacesOn}
              onValueChange={() => setIsChangePlacesOn(!isChangePlacesOn)}
            />
          </View>
          <View className="flex flex-row items-center justify-around my-5">
            {/* <Pressable style={styles.button} onPress={save}>  */}
            <Pressable onPress={handleClose}>
              <Text>save</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={reset}>
              <Text>Reset</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
});

export default BottomSettings;

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
  singleSettingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#333",
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
