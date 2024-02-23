import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";

import Arabic from "../../assets/images/Arabic.png";

const SectionCustomHeader = () => {
  return (
    <View className="absolute flex flex-row items-center justify-between w-full px-8 top-10">
      <Pressable>
        <AntDesign name="home" size={24} color="white" />
      </Pressable>
      <Pressable>
        <View className="flex flex-row gap-5">
          <Image
            source={Arabic}
            alt="language"
            style={{ width: 30, height: 20 }}
          />
          <Text className="text-white">العربية</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SectionCustomHeader;
