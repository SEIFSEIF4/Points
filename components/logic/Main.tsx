import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import { AntDesign } from "@expo/vector-icons";

import PlayerList from "@/components/logic/PlayerList";
import AddPlayerModal from "@/components/logic/AddPlayerModal";
import { usePlayer } from "@/hooks/player-context";

const Main = () => {
  useKeepAwake();

  const { players, setPlayers } = usePlayer();

  const insets = useSafeAreaInsets();
  const [playerName, setPlayerName] = useState<string>("");
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        const savedPlayers = await AsyncStorage.getItem("players");
        if (savedPlayers) {
          setPlayers(JSON.parse(savedPlayers));
        }
      } catch (error) {
        console.error("Error loading player data:", error);
      }
    };

    loadPlayerData();
  }, []);

  useEffect(() => {
    const savePlayerData = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(players));
      } catch (error) {
        console.error("Error saving player data:", error);
      }
    };

    savePlayerData();
  }, [players]);

  const addPlayer = () => {
    if (playerName.trim() !== "") {
      setPlayers([...players, playerName]);
      setPlayerName("");
    }
  };

  const deletePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top + 15 }]}>
        <AddPlayerModal
          isVisible={isOverlayVisible}
          playerName={playerName}
          setPlayerName={setPlayerName}
          addPlayer={addPlayer}
          closeModal={() => setIsOverlayVisible(false)}
        />

        {!isOverlayVisible && (
          <View style={{ maxHeight: 30 }}>
            <Text style={styles.title}>تقدر تضيف لاعبين أكثر او تبدأ</Text>
            <Text style={styles.title}>اللعب بالضغط على التالي </Text>
          </View>
        )}

        <PlayerList players={players} deletePlayer={deletePlayer} />

        {!isOverlayVisible && (
          <View style={styles.nextButtonContainer}>
            {players.length <= 1 ? (
              <View style={styles.disabledNextButton}>
                <Text style={[styles.title, { backgroundColor: "gray" }]}>
                  التالى
                </Text>
              </View>
            ) : (
              <Link href="/two" asChild>
                <Pressable style={styles.nextButton}>
                  <Text style={[styles.title, { backgroundColor: "black" }]}>
                    التالى
                  </Text>
                </Pressable>
              </Link>
            )}

            <Pressable onPress={() => setIsOverlayVisible(!isOverlayVisible)}>
              <AntDesign name="adduser" size={55} color="white" />
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const MainColor = "#2f4925";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: MainColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "100",
    backgroundColor: MainColor,
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
  nextButtonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MainColor,
    gap: 50,
  },
  nextButton: {
    fontSize: 25,
    height: 50,
    width: "30%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  disabledNextButton: {
    fontSize: 25,
    height: 50,
    width: "30%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    opacity: 0.5,
  },
});

export default Main;
