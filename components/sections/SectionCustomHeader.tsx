import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import { Image } from "expo-image";
import { Link } from "expo-router";

import TimerScreen from "../Timer";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useSettings } from "@/hooks/Settings-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const SectionCustomHeader = () => {
  const { gameStarted, muted, setMuted } = useSettings();

  const showAlertDialog = () => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Coming Soon!",
      textBody: "We are working on it!",
    });
  };

  return (
    <View className="absolute flex flex-row items-center justify-between w-full px-8 top-10">
      <View className="flex flex-row gap-5">
        <Link push href="/(tabs)/" asChild>
          <TouchableOpacity>
            <AntDesign name="home" size={28} color="white" />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity>
          <TouchableOpacity>
            {muted ? (
              <FontAwesome5
                name="volume-mute"
                size={28}
                color="white"
                onPress={() => {
                  setMuted(false);
                }}
              />
            ) : (
              <Feather
                name="volume-2"
                size={28}
                color="white"
                onPress={() => {
                  setMuted(true);
                }}
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <Pressable onPress={showAlertDialog}>
        {/* {!gameStarted ? ( */}
        {false ? (
          <View className="flex flex-row gap-3">
            <Text className="text-white ">العربية</Text>
            <Image
              source={require("../../assets/images/Arabic.png")}
              alt="language"
              style={{ width: 30, height: 20 }}
            />
          </View>
        ) : (
          <TimerScreen />
        )}
      </Pressable>
    </View>
  );
};

export default SectionCustomHeader;
