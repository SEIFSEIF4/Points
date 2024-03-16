import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { Button, Switch } from "react-native-paper";
import { useSettings } from "@/hooks/Settings-context";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import InfoDialog from "./InfoDialog";

export type Ref = BottomSheetModal;

const BottomSettings = forwardRef<Ref>((prop, ref: any) => {
  const snapPoints = useMemo(() => ["50%", "51%"], []);
  const [visible, setVisible] = useState(false);

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
    isMaxPointsOn,
    setIsMaxPointsOn,
    rounds,
    setRounds,
    time,
    setTime,
    isTimerOn,
    setITimerOn,
    isLoserOn,
    setIsLoserOn,
    isWhoStartOn,
    setIsWhoStartOn,
    isChangePlacesOn,
    setIsChangePlacesOn,
    reset,
  } = useSettings();

  const handleLearnMore = () => {
    handleClose();
    setVisible(true);
  };

  return (
    <>
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={false}
        animateOnMount={true}
        backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <BottomSheetView className="flex flex-1 p-4" style={styles.sheet}>
          <View id="Rounds" style={styles.singleSettingContainer}>
            <View style={styles.container}>
              <Image
                source={require("../assets/images/setting-Img/rounds.png")}
                contentFit="cover"
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-white">Rounds</Text>
            </View>
            <Picker
              style={{
                height: 50,
                width: 150,
                color: "white",
              }}
              selectedValue={rounds}
              onValueChange={(itemValue) => setRounds(itemValue)}
            >
              <Picker.Item label="3 Rounds" value={3} />
              <Picker.Item label="5 Rounds" value={5} />
              <Picker.Item label="8 Rounds" value={8} />
            </Picker>
          </View>
          <View id="who starts" style={styles.singleSettingContainer}>
            <View style={styles.container}>
              <Image
                source={require("../assets/images/setting-Img/whoStarts.png")}
                contentFit="cover"
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-white">Who Starts</Text>
            </View>
            <Switch
              value={isWhoStartOn}
              onValueChange={() => setIsWhoStartOn(!isWhoStartOn)}
            />
          </View>
          {/* <View id="Losers" style={styles.singleSettingContainer}>
            <View style={styles.container}>
              <Image
                source={require("../assets/images/setting-Img/Loser.png")}
                contentFit="cover"
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-white">Loser Every Round</Text>
              
            </View>
            <Switch
              value={isLoserOn}
              onValueChange={() => setIsLoserOn(!isLoserOn)}
            />
          </View> */}
          <View id="change place" style={styles.singleSettingContainer}>
            <View style={styles.container}>
              <Image
                source={require("../assets/images/setting-Img/changePlaces.png")}
                contentFit="contain"
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-white">Change Places</Text>
            </View>
            <Switch
              value={isChangePlacesOn}
              onValueChange={() => setIsChangePlacesOn(!isChangePlacesOn)}
            />
          </View>
          <View id="MaxPoints" style={styles.singleSettingContainer}>
            <View style={styles.container}>
              <Image
                source={require("../assets/images/setting-Img/Loser.png")}
                contentFit="cover"
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-white">Max Points</Text>
            </View>
            <View className="flex flex-row">
              {isMaxPointsOn && (
                <Picker
                  selectedValue={maxPoints}
                  style={{ height: 50, width: 120, color: "white" }}
                  onValueChange={(itemValue) => setMaxPoints(itemValue)}
                >
                  <Picker.Item label="50" value={50} />
                  <Picker.Item label="150" value={150} />
                  <Picker.Item label="250" value={250} />
                </Picker>
              )}
              <Switch
                value={isMaxPointsOn}
                onValueChange={() => setIsMaxPointsOn(!isMaxPointsOn)}
              />
            </View>
          </View>
          <View id="TIME PER ROUND" style={styles.singleSettingContainer}>
            <View style={styles.container}>
              <Image
                source={require("../assets/images/setting-Img/TimePerRound.png")}
                contentFit="cover"
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-white">Time Per Round</Text>
            </View>
            <View className="flex flex-row">
              {isTimerOn && (
                <Picker
                  style={{ height: 50, width: 100, color: "white" }}
                  selectedValue={time.toString()}
                  onValueChange={(itemValue) => setTime(parseInt(itemValue))}
                >
                  <Picker.Item label="5" value="300" />
                  <Picker.Item label="10" value="600" />
                  <Picker.Item label="15" value="900" />
                </Picker>
              )}
              <Switch
                value={isTimerOn}
                onValueChange={() => setITimerOn(!isTimerOn)}
              />
            </View>
          </View>
          <View className="flex flex-row items-center justify-around my-5">
            <TouchableOpacity
              style={styles.button}
              onPress={handleLearnMore}
              className="w-[75%]"
            >
              <Text className="text-center text-white">Learn More</Text>
            </TouchableOpacity>
            <Button mode="contained" onPress={reset} className="bg-grey-500 ">
              <MaterialIcons name="delete-outline" size={24} color="black" />
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <InfoDialog visible={visible} setVisible={setVisible} />
    </>
  );
});

export default BottomSettings;

const styles = StyleSheet.create({
  sheet: {
    // backgroundColor: "#19282F",
    minHeight: "100%",
  },
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
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingLeft: 10,
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
