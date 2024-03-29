import React from "react";
import { View, ViewStyle, Pressable } from "react-native";
import { Text } from "./Themed";
import { useSettings } from "@/hooks/Settings-context";

interface ProgressBarWithCirclesProps {
  progress?: number;
  checkpoint?: number;
  color?: string;
}

const ProgressBarWithCircles: React.FC<ProgressBarWithCirclesProps> = ({
  progress = 0,
  checkpoint = 5,
  color = "#000",
}) => {
  const { rounds, currentRound } = useSettings();

  checkpoint = rounds;
  progress = 90;

  const numberOfCircles = Math.ceil(checkpoint);
  const circleInterval = 100 / numberOfCircles;

  const renderCircles = () => {
    const circles = [];
    for (let i = 0; i <= numberOfCircles; i++) {
      const circleStyle: ViewStyle = {
        position: "absolute",
        left: `${i * circleInterval}%`,
        transform: [{ translateY: -7 }],
        backgroundColor: color,
        width: 20,
        height: 20,
        borderRadius: 10,
        zIndex: 2,
      };

      circles.push(
        <Pressable key={i} style={circleStyle}>
          <Text
            style={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {i}
          </Text>
        </Pressable>
      );
    }
    return circles;
  };

  return (
    <View style={{ width: "80%", position: "relative" }}>
      {renderCircles()}
      <View
        style={{
          width: "100%",
          height: 4,
          backgroundColor: "gray",
          position: "relative",
        }}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "grey",
            width: "100%",
            zIndex: 0,
            position: "absolute",
          }}
        ></View>
        <View
          style={{
            height: "100%",
            backgroundColor: "green",
            width: `${progress}%`,
            zIndex: 1,
            position: "absolute",
          }}
        ></View>
      </View>
    </View>
  );
};

export default ProgressBarWithCircles;
