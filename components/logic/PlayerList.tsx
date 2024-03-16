import React, { useEffect, useRef } from "react";
import { View, Text } from "@/components/Themed";

// expo
import { FlatList, Pressable, StyleSheet, Platform } from "react-native";

// icons
import { AntDesign } from "@expo/vector-icons";

type PlayerListProps = {
  players: string[];
  deletePlayer: (index: number) => void;
};

const PlayerList = ({ players, deletePlayer }: PlayerListProps) => {
  return (
    <View style={PlayerListStyles.playerContainer}>
      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <View style={[PlayerListStyles.playerHolder]}>
            <Pressable
              style={PlayerListStyles.startButton}
              onPress={() => deletePlayer(index)}
            >
              <AntDesign
                name="minuscircleo"
                size={55}
                color="white"
                style={{ opacity: 0.8 }}
              />
            </Pressable>

            <View
              style={[
                PlayerListStyles.playerNameHolder,
                PlayerListStyles.boxShadow,
              ]}
            >
              <Pressable>
                <Text style={PlayerListStyles.playerNameText}> {item}</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        extraData={players}
      />
    </View>
  );
};

const PlayerListStyles = StyleSheet.create({
  playerContainer: {
    flex: 0.5,
    flexGrow: 0.7,
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
    // transform: [{ translateX: 1200 }],
  },
  playerNameHolder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 55,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    alignSelf: "flex-end",
    gap: 20,
    backgroundColor: "rgba(255, 255, 255, 0.074)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",

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
    color: "white",
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
