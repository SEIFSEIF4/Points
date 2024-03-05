import React, { useEffect, useRef } from "react";
import { View, Text } from "@/components/Themed";

// expo
import {
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
} from "react-native";

// icons
import { AntDesign } from "@expo/vector-icons";

type PlayerListProps = {
  players: string[];
  deletePlayer: (index: number) => void;
};

const PlayerList = ({ players, deletePlayer }: PlayerListProps) => {
  const animatedValues = useRef(
    players.map(() => new Animated.Value(1200))
  ).current;

  //animation

  useEffect(() => {
    Animated.stagger(
      100,
      animatedValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [players]);

  const reverseAnimation = (index: number) => {
    const animatedValue = animatedValues[index];

    if (animatedValue) {
      Animated.timing(animatedValue, {
        toValue: 1200,
        duration: 500,
        delay: 0,
        useNativeDriver: true,
      }).start(() => {
        deletePlayer(index);
      });
    }
  };

  return (
    <View style={PlayerListStyles.playerContainer}>
      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <Animated.View
            style={[
              PlayerListStyles.playerHolder,
              { transform: [{ translateX: animatedValues[index] }] },
            ]}
          >
            <Pressable
              style={PlayerListStyles.startButton}
              onPress={() => reverseAnimation(index)}
            >
              <AntDesign name="minuscircleo" size={55} color="white" />
            </Pressable>

            <View
              style={[
                PlayerListStyles.playerNameHolder,
                PlayerListStyles.boxShadow,
              ]}
            >
              <Pressable onLongPress={() => alert("edit name")}>
                <Text style={PlayerListStyles.playerNameText}> {item}</Text>
              </Pressable>
            </View>
          </Animated.View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const PlayerListStyles = StyleSheet.create({
  playerContainer: {
    flex: 0.5,
    width: "100%",
    height: "100%",
    gap: 20,
    justifyContent: "flex-start",
  },
  playerHolder: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 10,
    transform: [{ translateX: 1200 }],
  },
  playerNameHolder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 55,
    backgroundColor: "white",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    alignSelf: "flex-end",
    gap: 20,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  playerNameText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    width: "100%",
    maxWidth: 200,
  },
  startButton: {
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15%",
    color: "white",
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default PlayerList;
