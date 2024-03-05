import { useEffect } from "react";

// expo
import AsyncStorage from "@react-native-async-storage/async-storage";

// hooks
import { usePlayer } from "@/hooks/player-context";
import { useSettings } from "@/hooks/Settings-context";

export const usePlayerData = () => {
  const { players, setPlayers } = usePlayer();
  const { rounds } = useSettings();

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
};

export const addPlayer = (
  playerName: string,
  setPlayerName: React.Dispatch<React.SetStateAction<string>>,
  players: string[],
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  points: number[][],
  setPoints: React.Dispatch<React.SetStateAction<number[][]>>
): void => {
  if (playerName.trim() !== "") {
    setPlayers((prevPlayers) => [...prevPlayers, playerName]);

    // const roundsLength = 5;
    // const initialPoints: number[][] = Array.from<number>({
    //   length: roundsLength,
    // }).fill(0);

    // setPoints((prevPoints) => [...prevPoints, initialPoints]);

    setPlayerName("");
  }
};

export const deletePlayer = (
  index: number,
  players: string[],
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const updatedPlayers = [...players];
  updatedPlayers.splice(index, 1);
  setPlayers(updatedPlayers);
};
