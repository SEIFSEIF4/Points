import React from "react";
import { View, Text, Pressable } from "react-native";

import { Image } from "expo-image";
import { Link } from "expo-router";

import TimerScreen from "../Timer";
import { AntDesign } from "@expo/vector-icons";

const SectionCustomHeader = () => {
  return (
    <View className="absolute flex flex-row items-center justify-between w-full px-8 top-10">
      <Pressable>
        {/* TODO: replace true with  isGameStarted state // 
        case if game stated it will show waring it will stop the game*/}
        <Link href={"/"}>
          <AntDesign name="home" size={28} color="white" />
        </Link>
      </Pressable>
      <Pressable onPress={() => alert("switch to arabic")}>
        {/* TODO: replace true with  isGameStarted state  */}
        {true ? (
          <Link href={"/(tabs)/two"}>
            <View className="flex flex-row gap-5">
              <Text className="text-white ">العربية</Text>
              <Image
                source={require("../../assets/images/Arabic.png")}
                alt="language"
                style={{ width: 30, height: 20 }}
              />
            </View>
          </Link>
        ) : (
          <TimerScreen />
        )}
      </Pressable>
    </View>
  );
};

export default SectionCustomHeader;
